import React, { useState, useEffect, useRef, useCallback } from 'react';
import './NewsAndEventsSection.css';

export interface BlogArticle {
  id: string;
  slideNumber: number;
  dateDay: string;
  dateMonth: string;
  dateYear: string;
  author: string;
  shortTitle: string;
  fullTitle: string;
  desc: string;
  url: string;
  imageSrc: string;
  imageAlt: string;
}

// All 8 articles from the provided Shopify code snippet with exact CDN images
const ARTICLES: BlogArticle[] = [
  {
    id: 'jewels-as-unique-as-your-journey',
    slideNumber: 1,
    dateDay: '10',
    dateMonth: 'Mar',
    dateYear: '2025',
    author: 'Andrew johns',
    shortTitle: 'Jewels as unique as...',
    fullTitle: 'Jewels as unique as your journey.',
    desc: 'As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze ...',
    url: '/blogs/news/jewels-as-unique-as-your-journey',
    imageSrc: 'https://jelwo.myshopify.com/cdn/shop/articles/jewelry-blog-8_1c3cdfa3-a7b1-4343-be06-30d5638e370b.jpg?v=1750223543&width=1080',
    imageAlt: 'Jewels as unique as your journey.'
  },
  {
    id: 'crafted-for-the-moments-that-matter',
    slideNumber: 2,
    dateDay: '02',
    dateMonth: 'Mar',
    dateYear: '2025',
    author: 'Andrew johns',
    shortTitle: 'Crafted for the moments...',
    fullTitle: 'Crafted for the moments that matter.',
    desc: 'As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze ...',
    url: '/blogs/news/crafted-for-the-moments-that-matter',
    imageSrc: 'https://jelwo.myshopify.com/cdn/shop/articles/jewelry-blog-1_66fd95ae-8368-4800-8123-8c69f48dff27.jpg?v=1750223539&width=1080',
    imageAlt: 'Crafted for the moments that matter.'
  },
  {
    id: 'timeless-treasures-unforgettable-moments',
    slideNumber: 3,
    dateDay: '02',
    dateMonth: 'Mar',
    dateYear: '2025',
    author: 'Andrew johns',
    shortTitle: 'Timeless treasures moments.',
    fullTitle: 'Timeless treasures moments.',
    desc: 'As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze ...',
    url: '/blogs/news/timeless-treasures-unforgettable-moments',
    imageSrc: 'https://jelwo.myshopify.com/cdn/shop/articles/jewelry-blog-2_f99fac11-0d22-4081-94bc-cd2ec791c782.jpg?v=1750223483&width=1080',
    imageAlt: 'Timeless treasures moments.'
  },
  {
    id: 'jewels-that-shine-as-bright-as-your-spirit',
    slideNumber: 4,
    dateDay: '02',
    dateMonth: 'Mar',
    dateYear: '2025',
    author: 'Andrew johns',
    shortTitle: 'Jewels that shine as...',
    fullTitle: 'Jewels that shine as bright as your spirit.',
    desc: 'As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze ...',
    url: '/blogs/news/jewels-that-shine-as-bright-as-your-spirit',
    imageSrc: 'https://jelwo.myshopify.com/cdn/shop/articles/jewelry-blog-3_5c484272-7a2f-456b-9197-f56b9189f283.jpg?v=1750223534&width=1080',
    imageAlt: 'Jewels that shine as bright as your spirit.'
  },
  {
    id: 'because-every-day-deserves-a-little-luxury',
    slideNumber: 5,
    dateDay: '02',
    dateMonth: 'Mar',
    dateYear: '2025',
    author: 'Andrew johns',
    shortTitle: 'Because every day deserves...',
    fullTitle: 'Because every day deserves a little luxury.',
    desc: 'As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze ...',
    url: '/blogs/news/because-every-day-deserves-a-little-luxury',
    imageSrc: 'https://jelwo.myshopify.com/cdn/shop/articles/jewelry-blog-4_353fee00-faa9-421d-99bb-f4fe9cb5c1a2.jpg?v=1750223529&width=1080',
    imageAlt: 'Because every day deserves a little luxury.'
  },
  {
    id: 'adorn-your-moments-elevate-your-life',
    slideNumber: 6,
    dateDay: '02',
    dateMonth: 'Mar',
    dateYear: '2025',
    author: 'Andrew johns',
    shortTitle: 'Adorn your moments, elevate...',
    fullTitle: 'Adorn your moments, elevate your life.',
    desc: 'As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze ...',
    url: '/blogs/news/adorn-your-moments-elevate-your-life',
    imageSrc: 'https://jelwo.myshopify.com/cdn/shop/articles/jewelry-blog-5_3cf647c3-7ce1-4f2c-bcc8-8289878be83c.jpg?v=1750223524&width=1080',
    imageAlt: 'Adorn your moments, elevate your life.'
  },
  {
    id: 'wear-your-elegance-with-confidence',
    slideNumber: 7,
    dateDay: '02',
    dateMonth: 'Mar',
    dateYear: '2025',
    author: 'Andrew johns',
    shortTitle: 'Wear your elegance with...',
    fullTitle: 'Wear your elegance with confidence.',
    desc: 'As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze ...',
    url: '/blogs/news/wear-your-elegance-with-confidence',
    imageSrc: 'https://jelwo.myshopify.com/cdn/shop/articles/jewelry-blog-6_1e2f3da7-57c0-499e-94ee-6047231ac720.jpg?v=1750223520&width=1080',
    imageAlt: 'Wear your elegance with confidence.'
  },
  {
    id: 'transform-your-style-one-jewel-at-a-time',
    slideNumber: 8,
    dateDay: '02',
    dateMonth: 'Mar',
    dateYear: '2025',
    author: 'Andrew johns',
    shortTitle: 'Transform your style, one...',
    fullTitle: 'Transform your style, one jewel at a time.',
    desc: 'As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze ...',
    url: '/blogs/news/transform-your-style-one-jewel-at-a-time',
    imageSrc: 'https://jelwo.myshopify.com/cdn/shop/articles/jewelry-blog-7_923918ed-d386-45c3-85c2-ff31e2c4cdc5.jpg?v=1750223516&width=1080',
    imageAlt: 'Transform your style, one jewel at a time.'
  }
];

// Triplicated array for seamless infinite looping
const EXTENDED_ARTICLES = [...ARTICLES, ...ARTICLES, ...ARTICLES];

export const NewsAndEventsSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Start at middle set index 13, showing "Adorn your moments...", "Wear your elegance...", "Transform your style..." exactly as in screenshot
  const [currentIndex, setCurrentIndex] = useState(13);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Dragging / swiping state for smooth interaction
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Track container width to ensure exactly 3 cards show at a time on desktop
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

  // Compute responsive layout: exactly 3 cards at a time on desktop (>1024px)
  const gap = containerWidth > 0 && containerWidth < 768 ? 18 : 28;
  const cardsPerView = containerWidth > 0 && containerWidth < 640 ? 1 : containerWidth > 0 && containerWidth < 1024 ? 2 : 3;
  const slideWidth = containerWidth > 0
    ? (containerWidth - (cardsPerView - 1) * gap) / cardsPerView
    : 480;
  const stepDistance = slideWidth + gap;

  // Active dot index (0 to 7)
  const activeBulletIndex = ((currentIndex % ARTICLES.length) + ARTICLES.length) % ARTICLES.length;

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

  // Automatic timer: advances time by time with smooth transition
  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500); // Advances every 3.5 seconds
    return () => clearInterval(interval);
  }, [isPaused, isDragging, nextSlide]);

  // Seamless infinite loop wrap on transition completion
  const handleTransitionEnd = () => {
    // When we pass into the 3rd set (index >= 16), seamlessly reset back into middle set without visual jump
    if (currentIndex >= 16) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - 8);
    } else if (currentIndex < 8) {
      // If user drags backwards into 1st set, seamlessly reset back into middle set
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + 8);
    }
  };

  // Jump to specific bullet indicator
  const handleBulletClick = (targetIndex: number) => {
    setIsTransitioning(true);
    const currentBase = Math.floor(currentIndex / ARTICLES.length) * ARTICLES.length;
    setCurrentIndex(currentBase + targetIndex);
  };

  // Touch / Drag event handlers
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
    if (dragOffset < -50) {
      nextSlide();
    } else if (dragOffset > 50) {
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
    if (dragOffset < -40) {
      nextSlide();
    } else if (dragOffset > 40) {
      prevSlide();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <section 
      className="news-events-section" 
      aria-label="Jewelry News and Events"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) {
          setIsDragging(false);
          setDragOffset(0);
        }
      }}
    >
      <div className="news-container">
        {/* Section Title Header (Matches user's HTML and screenshot) */}
        <div className="section-capture">
          <div className="section-title">
            <span data-fade-in="" className="sub-title fade-in">Jewelry news</span>
            <h2 className="mr-0 fade-in" data-fade-in="">News and events</h2>
          </div>
        </div>

        {/* Swiper Blog Slider Container (No side arrows, continuous smooth loop) */}
        <div className="blog-slider-outer-wrapper">
          <div
            className="blog-slider swiper swiper-initialized swiper-horizontal swiper-backface-hidden"
            id="blog-slider-template--17769951690889__blog_section_c7dJhz"
            data-slides-per-view="3"
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
              id="swiper-wrapper-c41f36ca5104c53d"
              aria-live="off"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translate3d(calc(-${currentIndex * stepDistance}px + ${dragOffset}px), 0px, 0px)`,
                transitionDuration: isDragging ? '0ms' : isTransitioning ? '850ms' : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {EXTENDED_ARTICLES.map((article, index) => {
                const articleIndex = index % ARTICLES.length;
                let stateClass = '';
                if (articleIndex === activeBulletIndex) stateClass = 'swiper-slide-active';
                else if (articleIndex === (activeBulletIndex - 1 + ARTICLES.length) % ARTICLES.length) stateClass = 'swiper-slide-prev';
                else if (articleIndex === (activeBulletIndex + 1) % ARTICLES.length) stateClass = 'swiper-slide-next';

                return (
                  <div
                    key={`${article.id}-${index}`}
                    className={`swiper-slide ${stateClass}`}
                    style={{ width: `${slideWidth}px`, marginRight: `${gap}px` }}
                    role="group"
                    aria-label={`${articleIndex + 1} / ${ARTICLES.length}`}
                  >
                    <div className="blog-block">
                      {/* Date and Author Header: 02, MAR 2025 | BY ANDREW JOHNS */}
                      <span className="date-time">
                        <span className="date">{article.dateDay}</span>,
                        <span className="time"> {article.dateMonth} </span>
                        <span className="year">{article.dateYear} </span>
                        <span className="separator">|</span>
                        <span className="author">By {article.author}</span>
                      </span>

                      {/* Clean Inset Image Card (No buttons, exactly matching first screenshot) */}
                      <div className="blog-img ratio" style={{ '--ratio-percent': '71.875%' } as React.CSSProperties}>
                        <img
                          src={article.imageSrc}
                          alt={article.imageAlt}
                          width={1600}
                          height={1150}
                          loading="lazy"
                          className="lazyloaded"
                          draggable={false}
                        />
                      </div>

                      {/* Content Area Below Image: Uppercase Title and Description Only */}
                      <div className="blog-post-content">
                        <div className="title-block">
                          <h3 className="blog-title">
                            {article.shortTitle}
                          </h3>
                          <p className="mr-0 blog-desc">
                            {article.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
          </div>

          {/* Exact Pagination Bullet Indicators matching user's 2nd screenshot (8 bullets, active terracotta pill) */}
          <div className="blog-slider-pagination" role="tablist" aria-label="Article slides">
            {ARTICLES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeBulletIndex}
                className={`slider-bullet ${i === activeBulletIndex ? 'active' : ''}`}
                onClick={() => handleBulletClick(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
