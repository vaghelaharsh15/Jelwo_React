import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import './JewelryHeroBanner.css';

interface HeroSlide {
  id: string;
  titleLine1: string;
  titleLine2: string;
  buttonText: string;
  buttonLink: string;
  bgImage: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    titleLine1: "World's best",
    titleLine2: 'jewelrys',
    buttonText: 'SHOP NOW',
    buttonLink: '#shop',
    bgImage: '/images/home/hero-jewelry-bg.jpg'
  },
  {
    id: 'slide-2',
    titleLine1: 'Luxury in',
    titleLine2: 'every detail',
    buttonText: 'EXPLORE COLLECTION',
    buttonLink: '#products',
    bgImage: '/images/header/demo-classic.jpg'
  },
  {
    id: 'slide-3',
    titleLine1: 'Timeless Gold',
    titleLine2: 'handcrafted',
    buttonText: 'VIEW RINGS',
    buttonLink: '#bracelets',
    bgImage: '/images/header/demo-modern.jpg'
  }
];

export const JewelryHeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : SLIDES.length - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < SLIDES.length - 1 ? prev + 1 : 0));
  };

  const slide = SLIDES[currentSlide];

  return (
    <section className="jewelry-hero-section" aria-label="Hero Jewelry Showcase">
      {/* Background Image with smooth transition */}
      <div 
        className="hero-bg-media"
        style={{ backgroundImage: `url(${slide.bgImage})` }}
      >
        <div className="hero-dark-overlay" />
      </div>

      {/* Decorative Mandala Lace Line Art on Left & Right */}
      <div className="hero-mandala-decor mandala-left">
        <svg viewBox="0 0 400 400" className="mandala-svg">
          <circle cx="200" cy="200" r="180" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
          <circle cx="200" cy="200" r="140" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
          <circle cx="200" cy="200" r="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="200"
              y1="20"
              x2="200"
              y2="380"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.8"
              transform={`rotate(${i * 11.25} 200 200)`}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <polygon
              key={`p-${i}`}
              points="200,40 240,200 200,360 160,200"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.8"
              fill="none"
              transform={`rotate(${i * 22.5} 200 200)`}
            />
          ))}
        </svg>
      </div>

      <div className="hero-mandala-decor mandala-right">
        <svg viewBox="0 0 400 400" className="mandala-svg">
          <circle cx="200" cy="200" r="180" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
          <circle cx="200" cy="200" r="140" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
          <circle cx="200" cy="200" r="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="200"
              y1="20"
              x2="200"
              y2="380"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.8"
              transform={`rotate(${i * 11.25} 200 200)`}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <polygon
              key={`p-${i}`}
              points="200,40 240,200 200,360 160,200"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.8"
              fill="none"
              transform={`rotate(${i * 22.5} 200 200)`}
            />
          ))}
        </svg>
      </div>

      {/* Slider Left Arrow */}
      <button 
        type="button" 
        className="hero-arrow-btn arrow-prev" 
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Slider Right Arrow */}
      <button 
        type="button" 
        className="hero-arrow-btn arrow-next" 
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Center Terracotta Card */}
      <div className="hero-center-box">
        {/* Overlapping Play Button */}
        <button 
          type="button" 
          className="hero-play-button" 
          onClick={() => setVideoModalOpen(true)}
          aria-label="Watch Brand Video"
        >
          <div className="play-button-outer-ring">
            <div className="play-button-inner-circle">
              <Play size={15} className="play-icon" fill="currentColor" />
            </div>
          </div>
        </button>

        <div className="hero-terracotta-card">
          {/* Subtle floral swirl filigree watermark inside card */}
          <div className="card-pattern-overlay" />

          <div className="card-content">
            <h1 className="hero-card-headline">
              <span>{slide.titleLine1}</span>
              <span>{slide.titleLine2}</span>
            </h1>

            <a href={slide.buttonLink} className="hero-card-shop-btn">
              {slide.buttonText}
            </a>
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      {videoModalOpen && (
        <div className="video-modal-backdrop" onClick={() => setVideoModalOpen(false)}>
          <div className="video-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="video-modal-close" 
              onClick={() => setVideoModalOpen(false)}
              aria-label="Close video"
            >
              <X size={24} />
            </button>
            <div className="video-modal-body">
              <div className="video-placeholder">
                <div className="video-inner-play">
                  <Play size={36} fill="#c86542" color="#c86542" />
                </div>
                <h3 className="video-dialog-title">Jelwo Fine Jewelry Craftsmanship</h3>
                <p className="video-dialog-subtitle">
                  Handcrafted with sustainable 18k solid gold & certified diamonds.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
