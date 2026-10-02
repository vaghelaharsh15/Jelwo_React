import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './JewelryReelsSlider.css';

export interface ReelProduct {
  id: string;
  title: string;
  price: string;
  comparePrice?: string;
  productUrl: string;
  thumbImg: string;
  thumbAlt: string;
  videoUrl: string;
  posterUrl: string;
}

const REEL_PRODUCTS: ReelProduct[] = [
  {
    id: '7954701058185-1',
    title: 'FLOWER PENDANT',
    price: 'Rs. 22.00',
    productUrl: '/products/flower-pendant',
    thumbImg: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-11.jpg?v=1741605562&width=720',
    thumbAlt: 'Flower pendant',
    videoUrl: 'https://jelwo.myshopify.com/cdn/shop/videos/c/vp/accac3e666ff4e5c9314443e6438ea3a/accac3e666ff4e5c9314443e6438ea3a.HD-1080p-4.8Mbps-44581059.mp4?v=0',
    posterUrl: 'https://jelwo.myshopify.com/cdn/shop/files/preview_images/accac3e666ff4e5c9314443e6438ea3a.thumbnail.0000000000_small.jpg?v=1742561557'
  },
  {
    id: '7954700763273',
    title: 'DROP EARRINGS',
    price: 'Rs. 15.00',
    comparePrice: 'Rs. 44.00',
    productUrl: '/products/drop-earrings',
    thumbImg: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-46.jpg?v=1741668328&width=720',
    thumbAlt: 'Drop earrings',
    videoUrl: 'https://jelwo.myshopify.com/cdn/shop/videos/c/vp/7826750f43d941b28a3d57b2fd330864/7826750f43d941b28a3d57b2fd330864.HD-1080p-2.5Mbps-44713680.mp4?v=0',
    posterUrl: 'https://jelwo.myshopify.com/cdn/shop/files/preview_images/7826750f43d941b28a3d57b2fd330864.thumbnail.0000000000_small.jpg?v=1742810004'
  },
  {
    id: '7954700992649',
    title: 'FLOWER NOSE PIN',
    price: 'Rs. 12.00',
    productUrl: '/products/flower-nose-pin',
    thumbImg: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-21.jpg?v=1741607520&width=720',
    thumbAlt: 'Flower nose pin',
    videoUrl: 'https://jelwo.myshopify.com/cdn/shop/videos/c/vp/916ce2bac08d4c5c94bf6e154631eb8b/916ce2bac08d4c5c94bf6e154631eb8b.HD-1080p-7.2Mbps-44713017.mp4?v=0',
    posterUrl: 'https://jelwo.myshopify.com/cdn/shop/files/preview_images/916ce2bac08d4c5c94bf6e154631eb8b.thumbnail.0000000000_small.jpg?v=1742809221'
  },
  {
    id: '7954701058185-2',
    title: 'FLOWER PENDANT',
    price: 'Rs. 22.00',
    productUrl: '/products/flower-pendant',
    thumbImg: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-11.jpg?v=1741605562&width=720',
    thumbAlt: 'Flower pendant',
    videoUrl: 'https://jelwo.myshopify.com/cdn/shop/videos/c/vp/ba3a4b4a570f4749a2bf30fd1aa1b96d/ba3a4b4a570f4749a2bf30fd1aa1b96d.HD-1080p-4.8Mbps-44622575.mp4?v=0',
    posterUrl: 'https://jelwo.myshopify.com/cdn/shop/files/preview_images/ba3a4b4a570f4749a2bf30fd1aa1b96d.thumbnail.0000000000_small.jpg?v=1742618635'
  },
  {
    id: '8045130416265',
    title: 'GLITTER DIAMOND RING',
    price: 'Rs. 10.00',
    productUrl: '/products/glitter-diamond-ring',
    thumbImg: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-26.jpg?v=1742444221&width=720',
    thumbAlt: 'Glitter diamond ring',
    videoUrl: 'https://jelwo.myshopify.com/cdn/shop/videos/c/vp/72e5b0f02511443c8a62a81b9024ddb9/72e5b0f02511443c8a62a81b9024ddb9.HD-1080p-3.3Mbps-44622574.mp4?v=0',
    posterUrl: 'https://jelwo.myshopify.com/cdn/shop/files/preview_images/72e5b0f02511443c8a62a81b9024ddb9.thumbnail.0000000000_small.jpg?v=1742618635'
  },
  {
    id: '7954701025417',
    title: 'TWISTER BANGLE',
    price: 'Rs. 28.00',
    comparePrice: 'Rs. 35.00',
    productUrl: '/products/twister-bangle',
    thumbImg: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-16.jpg?v=1741606634&width=720',
    thumbAlt: 'Twister bangle',
    videoUrl: 'https://jelwo.myshopify.com/cdn/shop/videos/c/vp/7826750f43d941b28a3d57b2fd330864/7826750f43d941b28a3d57b2fd330864.HD-1080p-2.5Mbps-44713680.mp4?v=0',
    posterUrl: 'https://jelwo.myshopify.com/cdn/shop/files/preview_images/7826750f43d941b28a3d57b2fd330864.thumbnail.0000000000_small.jpg?v=1742810004'
  },
  {
    id: '8045136674953',
    title: 'GEMSTONE JHUMKAS',
    price: 'Rs. 18.00',
    comparePrice: 'Rs. 50.00',
    productUrl: '/products/gemstone-jhumkas',
    thumbImg: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-51.jpg?v=1742445540&width=720',
    thumbAlt: 'Gemstone jhumkas',
    videoUrl: 'https://jelwo.myshopify.com/cdn/shop/videos/c/vp/accac3e666ff4e5c9314443e6438ea3a/accac3e666ff4e5c9314443e6438ea3a.HD-1080p-4.8Mbps-44581059.mp4?v=0',
    posterUrl: 'https://jelwo.myshopify.com/cdn/shop/files/preview_images/accac3e666ff4e5c9314443e6438ea3a.thumbnail.0000000000_small.jpg?v=1742561557'
  }
];

function getInitialVisibleCount(): number {
  if (typeof window === 'undefined') return 5;
  const width = window.innerWidth;
  if (width >= 1200) return 5;
  if (width >= 960) return 4;
  if (width >= 680) return 3;
  if (width >= 480) return 2;
  return 1.2;
}

export interface JewelryReelsSliderProps {
  onSelectProduct?: (handle: string) => void;
}

export function JewelryReelsSlider({ onSelectProduct }: JewelryReelsSliderProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState<number>(getInitialVisibleCount);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Update visible items count responsively on window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getInitialVisibleCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, Math.ceil(REEL_PRODUCTS.length - visibleCount));
  const activeIndex = Math.min(currentIndex, maxIndex);

  // Ensure videos autoplay and play seamlessly
  useEffect(() => {
    const playAllVideos = () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.muted = true;
          video.playsInline = true;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Browser autoplay policy might hold until user interaction
            });
          }
        }
      });
    };

    playAllVideos();

    // In case browser requires interaction to kick in
    const handleFirstGesture = () => {
      playAllVideos();
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="reels-slider-section" aria-label="Hot picks Reels">
      <div className="reels-container">
        {/* Section Title Header */}
        <div className="section-capture">
          <div className="section-title text-center">
            <span className="sub-title">Best product</span>
            <h2 className="mr-0">Hot picks</h2>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="reels-carousel-wrapper">
          <div
            className="reels-track"
            style={{
              transform: `translateX(calc(-${activeIndex} * ((100% + var(--reels-gap, 24px)) / ${visibleCount})))`
            }}
          >
            {REEL_PRODUCTS.map((item, idx) => (
              <div
                key={item.id}
                className="reel-slide"
                style={{
                  flex: `0 0 calc((100% - (${visibleCount} - 1) * var(--reels-gap, 24px)) / ${visibleCount})`,
                  width: `calc((100% - (${visibleCount} - 1) * var(--reels-gap, 24px)) / ${visibleCount})`
                }}
              >
                <div className="reel-card">
                  {/* Working Background Video */}
                  <div className="reel-video-wrapper">
                    <video
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      className="reel-bg-video"
                      playsInline
                      autoPlay
                      loop
                      muted
                      preload="metadata"
                      poster={item.posterUrl}
                    >
                      <source src={item.videoUrl} type="video/mp4" />
                      <img src={item.posterUrl} alt={item.thumbAlt} />
                    </video>
                  </div>

                  {/* High Legibility Bottom Gradient Overlay */}
                  <div className="reel-dark-overlay" />

                  {/* Bottom Single Product Badge (Matching Screenshot 1) */}
                  <div className="reel-product-badge">
                    <div className="reel-product-thumb">
                      <a 
                        href={item.productUrl} 
                        title={item.thumbAlt} 
                        tabIndex={-1}
                        onClick={(e) => {
                          e.preventDefault();
                          const handle = item.productUrl.replace('/products/', '');
                          onSelectProduct?.(handle);
                        }}
                      >
                        <img
                          src={item.thumbImg}
                          alt={item.thumbAlt}
                          loading="lazy"
                          width={60}
                          height={60}
                        />
                      </a>
                    </div>
                    <div className="reel-product-meta">
                      <h6 className="reel-product-name">
                        <a 
                          href={item.productUrl} 
                          title={item.thumbAlt}
                          onClick={(e) => {
                            e.preventDefault();
                            const handle = item.productUrl.replace('/products/', '');
                            onSelectProduct?.(handle);
                          }}
                        >
                          {item.title}
                        </a>
                      </h6>
                      <div className="reel-product-pricing">
                        <span className="new-price">{item.price}</span>
                        {item.comparePrice && (
                          <span className="old-price">{item.comparePrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Buttons Below (Matching Screenshot 2) */}
        <div className="reels-nav-controls">
          <button
            type="button"
            className={`reels-arrow-btn reels-prev-btn ${activeIndex === 0 ? 'is-disabled' : 'is-active'}`}
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous slide"
          >
            <ArrowLeft size={20} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className={`reels-arrow-btn reels-next-btn ${activeIndex >= maxIndex ? 'is-disabled' : 'is-active'}`}
            onClick={handleNext}
            disabled={activeIndex >= maxIndex}
            aria-label="Next slide"
          >
            <ArrowRight size={20} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </section>
  );
}
