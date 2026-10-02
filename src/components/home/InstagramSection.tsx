import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, Check } from 'lucide-react';
import './InstagramSection.css';

export interface InstagramPost {
  id: number;
  imageUrl: string;
  alt: string;
  link: string;
}

// All 8 Instagram photos from the provided Shopify code snippet
const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 1,
    imageUrl: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-insta-1.jpg?v=1742469305&width=1024',
    alt: 'Diamond floral cluster rose gold ring',
    link: 'https://www.instagram.com/'
  },
  {
    id: 2,
    imageUrl: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-insta-2.jpg?v=1742469305&width=1024',
    alt: 'Modern rose gold hoop earrings with pave diamonds',
    link: 'https://www.instagram.com/'
  },
  {
    id: 3,
    imageUrl: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-insta-3.jpg?v=1742469305&width=1024',
    alt: 'Traditional gold and pearl chandelier earrings',
    link: 'https://www.instagram.com/'
  },
  {
    id: 4,
    imageUrl: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-insta-4.jpg?v=1742469305&width=1024',
    alt: 'Woman wearing luxury ruby beads and diamond necklace',
    link: 'https://www.instagram.com/'
  },
  {
    id: 5,
    imageUrl: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-insta-5.jpg?v=1742469305&width=1024',
    alt: 'Diamond cross ring in pink velvet box',
    link: 'https://www.instagram.com/'
  },
  {
    id: 6,
    imageUrl: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-insta-6.jpg?v=1742469305&width=1024',
    alt: 'Luxury bridal jewelry set showcase',
    link: 'https://www.instagram.com/'
  },
  {
    id: 7,
    imageUrl: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-insta-7.jpg?v=1742469305&width=1024',
    alt: 'Handcrafted solitaire engagement ring',
    link: 'https://www.instagram.com/'
  },
  {
    id: 8,
    imageUrl: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-insta-8.jpg?v=1742469305&width=1024',
    alt: 'Layered gold chains and gemstone pendants',
    link: 'https://www.instagram.com/'
  }
];

// Triplicated for seamless infinite looping
const EXTENDED_POSTS = [...INSTAGRAM_POSTS, ...INSTAGRAM_POSTS, ...INSTAGRAM_POSTS];

// Official Instagram Logo SVG
const InstagramLogo = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="insta-hover-icon"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const InstagramSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Start at index 8 (middle set),
  const [currentIndex, setCurrentIndex] = useState(8);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Touch & drag gestures
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  // Measure container width dynamically
  useEffect(() => {
    const measureWidth = () => {
      if (sliderRef.current) {
        setContainerWidth(sliderRef.current.clientWidth);
      }
    };
    measureWidth();
    window.addEventListener('resize', measureWidth);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && sliderRef.current) {
      ro = new ResizeObserver(measureWidth);
      ro.observe(sliderRef.current);
    }

    return () => {
      window.removeEventListener('resize', measureWidth);
      if (ro) ro.disconnect();
    };
  }, []);

  // Exactly 5 cards on desktop (width >= 1024px)
  const gap = containerWidth > 0 && containerWidth < 768 ? 14 : 22;
  const cardsPerView = containerWidth > 0 && containerWidth < 600
    ? 2
    : containerWidth > 0 && containerWidth < 1024
    ? 3
    : 5;

  const slideWidth = containerWidth > 0
    ? (containerWidth - (cardsPerView - 1) * gap) / cardsPerView
    : 300;
  const stepDistance = slideWidth + gap;

  // Move to next slide
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Move to prev slide
  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Auto-advance time by time with smooth transition
  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3200); // Advances smoothly every 3.2 seconds
    return () => clearInterval(interval);
  }, [isPaused, isDragging, nextSlide]);

  // Seamless infinite loop wrap on transition completion
  const handleTransitionEnd = () => {
    if (currentIndex >= 16) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - 8);
    } else if (currentIndex < 8) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + 8);
    }
  };

  // Drag & Swipe Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset < -40) {
      nextSlide();
    } else if (dragOffset > 40) {
      prevSlide();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -35) {
      nextSlide();
    } else if (dragOffset > 35) {
      prevSlide();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <section
      className="instagram-section"
      aria-label="Social Media Follow Instagram"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) {
          setIsDragging(false);
          setDragOffset(0);
        }
      }}
    >
      <div className="instagram-container">
        {/* Section Header: Subtitle & Title */}
        <div className="section-capture">
          <div className="section-title">
            <span data-fade-in="" className="sub-title fade-in">Social media</span>
            <h2 className="mr-0 fade-in" data-fade-in="">Follow instagram</h2>
          </div>
        </div>

        {/* Carousel Viewport: Exactly 5 items visible on desktop */}
        <div className="insta-slider-outer">
          <div
            className="insta-slider swiper swiper-initialized swiper-horizontal swiper-backface-hidden"
            id="insta-slider-template--17769951690889__instagram_XHFURD"
            data-slides-per-view="5"
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="swiper-wrapper"
              id="swiper-wrapper-7f21b38251806bd9"
              aria-live="off"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translate3d(calc(-${currentIndex * stepDistance}px + ${dragOffset}px), 0px, 0px)`,
                transitionDuration: isDragging ? '0ms' : isTransitioning ? '750ms' : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {EXTENDED_POSTS.map((post, index) => (
                <div
                  key={`${post.id}-${index}`}
                  className="swiper-slide insta-slide"
                  style={{ width: `${slideWidth}px`, marginRight: `${gap}px` }}
                  role="group"
                  aria-label={`${(index % INSTAGRAM_POSTS.length) + 1} / ${INSTAGRAM_POSTS.length}`}
                >
                  <a
                    className="banner-hover insta-link"
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Follow us on Instagram @jelwo"
                  >
                    {/* Post Image */}
                    <img
                      src={post.imageUrl}
                      alt={post.alt}
                      width={512}
                      height={512}
                      loading="lazy"
                      className="lazyloaded insta-img"
                      draggable={false}
                    />

                    {/* Dark Overlay with Instagram Icon on Hover */}
                    <div className="insta-hover-overlay" aria-hidden="true">
                      <div className="insta-icon-badge">
                        <InstagramLogo size={34} />
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
          </div>
        </div>

        {/* Newsletter Section (Just Below Instagram Cards  */}
        <div className="insta-newsletter-section">
          <div className="section-capture">
            <div className="section-title">
              <span className="sub-title">Join newsletter</span>
              <h2 className="mr-0 insta-newsletter-heading">
                Enjoy 10% off<br />your first order
              </h2>
            </div>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="insta-newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="insta-newsletter-input"
              required
            />
            <button
              type="submit"
              className="insta-newsletter-submit-btn"
              aria-label="Subscribe to newsletter"
            >
              {isSubscribed ? <Check size={18} /> : <Mail size={18} />}
            </button>
          </form>

          {isSubscribed && (
            <p className="insta-newsletter-success">
              Thank you for subscribing! Your 10% discount code is <strong>JELWO10</strong>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
