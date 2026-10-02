import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './BrandLogosCarousel.css';

interface BrandItem {
  id: number;
  name: string;
  src: string;
  fallbackSrc: string;
}

// 5 Main Brand Logos 
// 1. Tanishq, 2. Tarinika, 3. Chanel, 4. Carat Lane, 5. Candere
const BRANDS: BrandItem[] = [
  {
    id: 1,
    name: 'Tanishq',
    src: '/images/home/brand-perfect-1.png',
    fallbackSrc: '//jelwo.myshopify.com/cdn/shop/files/jewelry-3-brand-logo-1.png?v=1742467850&width=500'
  },
  {
    id: 2,
    name: 'Tarinika',
    src: '/images/home/brand-perfect-2.png',
    fallbackSrc: '//jelwo.myshopify.com/cdn/shop/files/jewelry-3-brand-logo-2.png?v=1742467850&width=500'
  },
  {
    id: 3,
    name: 'Chanel',
    src: '/images/home/brand-perfect-3.png',
    fallbackSrc: '//jelwo.myshopify.com/cdn/shop/files/jewelry-3-brand-logo-3.png?v=1742467850&width=500'
  },
  {
    id: 4,
    name: 'Carat Lane',
    src: '/images/home/brand-perfect-4.png',
    fallbackSrc: '//jelwo.myshopify.com/cdn/shop/files/jewelry-3-brand-logo-4.png?v=1742468015&width=500'
  },
  {
    id: 5,
    name: 'Candere Lifestyle Jewellery',
    src: '/images/home/brand-perfect-5.png',
    fallbackSrc: '//jelwo.myshopify.com/cdn/shop/files/jewelry-3-brand-logo-5.png?v=1742467850&width=500'
  },
  {
    id: 6,
    name: 'Dior',
    src: '/images/home/brand-perfect-6.png',
    fallbackSrc: '//jelwo.myshopify.com/cdn/shop/files/jewelry-3-brand-logo-1.png?v=1742467850&width=500'
  },
  {
    id: 7,
    name: 'Vogue',
    src: '/images/home/brand-perfect-7.png',
    fallbackSrc: '//jelwo.myshopify.com/cdn/shop/files/jewelry-3-brand-logo-2.png?v=1742467850&width=500'
  },
  {
    id: 8,
    name: 'Cartier',
    src: '/images/home/brand-perfect-8.png',
    fallbackSrc: '//jelwo.myshopify.com/cdn/shop/files/jewelry-3-brand-logo-6.png?v=1742467850&width=500'
  },
  {
    id: 9,
    name: 'Tiffany & Co.',
    src: '/images/home/brand-perfect-9.png',
    fallbackSrc: '//jelwo.myshopify.com/cdn/shop/files/jewelry-3-brand-logo-7.png?v=1742468015&width=500'
  }
];

export const BrandLogosCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Auto-advance by 1 item every 4s when not hovered
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % BRANDS.length);
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : BRANDS.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % BRANDS.length);
  };

  // Repeated array for continuous, smooth wrapping
  const extendedBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="logo-list" aria-label="Brand Partners">
      <div className="wide-content-container">
        <div
          className="brand-logo-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Navigation Arrows for interactive browsing */}
          <button
            type="button"
            className="brand-nav-arrow brand-prev-btn"
            onClick={handlePrev}
            aria-label="Previous brand logo"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="brand-logo swiper swiper-initialized swiper-horizontal swiper-backface-hidden"
            id="brand-logo-template--17769951690889__logo_list_Bkq3NN"
            data-slides-per-view="5"
          >
            {/* Swiper Track with 5 items visible at 20% width each */}
            <div
              className="swiper-wrapper"
              id="swiper-wrapper-acef8ea54cdc2054"
              aria-live="off"
              style={{
                transform: `translate3d(-${currentIndex * 20}%, 0px, 0px)`,
                transitionDuration: '650ms',
                transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {extendedBrands.map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  className="swiper-slide brand-logo-slide"
                  role="group"
                  aria-label={`${brand.name} partner logo`}
                >
                  <a
                    href={`#brand-${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="brand-logo-link"
                    aria-label={brand.name}
                  >
                    <img
                      src={brand.src}
                      alt={brand.name}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== brand.fallbackSrc) {
                          target.src = brand.fallbackSrc;
                        }
                      }}
                      className="brand-logo-img"
                      loading="lazy"
                    />
                  </a>
                </div>
              ))}
            </div>

            <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
          </div>

          <button
            type="button"
            className="brand-nav-arrow brand-next-btn"
            onClick={handleNext}
            aria-label="Next brand logo"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
