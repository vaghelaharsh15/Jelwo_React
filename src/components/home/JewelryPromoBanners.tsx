import React from 'react';
import './JewelryPromoBanners.css';

export const JewelryPromoBanners: React.FC = () => {
  return (
    <section className="jewelry-promo-section" aria-label="Featured Jewelry Promotions">
      <div className="wide-content-container">
        <div className="promo-banners-fluid-grid">
          {/* 1. Left Card: "Luxury to your look" */}
          <div className="promo-banner-card card-luxury-look">
            <div className="promo-text-wrap">
              <h3 className="promo-card-heading">
                Luxury to <br />
                your look
              </h3>
              <a href="#shop" className="promo-shop-btn">
                SHOP NOW
              </a>
            </div>

            <div className="promo-bottom-img-box">
              <img
                src="/images/home/promo-luxury-look.jpg"
                alt="Luxury diamond earrings and gold pendant"
                className="promo-product-image"
                loading="lazy"
              />
            </div>

            {/* Subtle botanical frond background watermark */}
            <div className="botanical-watermark left-watermark" />
          </div>

          {/* 2. Center Card: "Happiness of women" */}
          <div className="promo-banner-card card-happiness-women">
            {/* Model Image on Left */}
            <div className="center-model-img-box">
              <img
                src="/images/home/promo-happiness-women.jpg"
                alt="Model wearing elegant diamond jewelry collection"
                className="center-model-img"
                loading="lazy"
              />
            </div>

            {/* Content on Right */}
            <div className="center-card-content">
              <span className="center-card-subtitle">JEWELRY COLLECTIONS</span>
              <h3 className="center-card-heading">
                Happiness <br />
                of women
              </h3>
              <a href="#shop" className="promo-shop-btn center-btn">
                SHOP NOW
              </a>
            </div>

            {/* Palm shadow watermark */}
            <div className="botanical-watermark center-watermark" />
          </div>

          {/* 3. Right Card: "Everyday's luxuries" */}
          <div className="promo-banner-card card-everyday-luxuries">
            <div className="promo-text-wrap">
              <h3 className="promo-card-heading">
                Everyday's <br />
                luxuries
              </h3>
              <a href="#shop" className="promo-shop-btn">
                SHOP NOW
              </a>
            </div>

            <div className="promo-bottom-img-box">
              <img
                src="/images/home/promo-everyday-luxuries.jpg"
                alt="Gold ring on natural white pebble"
                className="promo-product-image pebble-ring-img"
                loading="lazy"
              />
            </div>

            {/* Subtle botanical frond background watermark */}
            <div className="botanical-watermark right-watermark" />
          </div>
        </div>
      </div>

    </section>
  );
};
