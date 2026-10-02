import React from 'react';
import './LuxuryEditorialSection.css';

export const LuxuryEditorialSection: React.FC = () => {
  return (
    <section className="luxury-editorial-section" aria-label="Luxury Jewelry Editorial">
      <div className="wide-content-container">
        <div className="luxury-editorial-layout">
          {/* Left Column: Visual Showcase (2 Photos with Center Rotating Badge) */}
          <div className="editorial-visual-col">
            <div className="editorial-cards-composition">
              {/* Photo 1: Rings on Model's Hand */}
              <div className="editorial-card card-rings">
                <div className="editorial-img-box">
                  <img
                    src="/images/home/luxury-rings-model.jpg"
                    alt="Luxury diamond rings stack on hand"
                    className="editorial-img"
                    loading="lazy"
                  />
                  {/* Faded Watermark Typography */}
                  <span className="editorial-watermark-text watermark-rings">Rings</span>
                </div>
              </div>

              {/* Overlapping Center Rotating Luxury Badge (Matches 4th Screenshot) */}
              <div className="editorial-center-badge-wrap">
                <div className="editorial-rotating-disc">
                  <img
                    src="/images/home/luxury-badge-circle.png"
                    alt="Luxury New Jewelry Badge"
                    className="editorial-badge-img"
                  />
                </div>
              </div>

              {/* Photo 2: Model wearing Floral Diamond Drop Necklace */}
              <div className="editorial-card card-necklace">
                <div className="editorial-img-box">
                  <img
                    src="/images/home/luxury-necklace-model.jpg"
                    alt="Model wearing floral diamond drop necklace"
                    className="editorial-img"
                    loading="lazy"
                  />
                  {/* Faded Watermark Typography */}
                  <span className="editorial-watermark-text watermark-necklace">Necklace</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & CTA (Matches 4th Screenshot) */}
          <div className="editorial-content-col">
            <div className="editorial-content-inner">
              <h2 className="editorial-headline">
                Add a touch of luxury<br />to your look jewelry
              </h2>

              <p className="editorial-desc-p1">
                If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill.
              </p>

              <p className="editorial-desc-p2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="editorial-cta-wrap">
                <a href="#collection-template" className="editorial-shop-btn">
                  SHOP COLLECTION
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
