import React, { useEffect } from 'react';
import './ShippingReturnPage.css';

interface ShippingReturnPageProps {
  onNavigateHome?: () => void;
}

// Background image matching Jelwo's breadcrumb hero banner
const SHIPPING_BREADCRUMB_BG = 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-breadcrumb.jpg?v=1742473987&width=1920';

export const ShippingReturnPage: React.FC<ShippingReturnPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Shipping & return - Jelwo Fine Jewelry';
    return () => {
      document.title = "Jelwo - World's Best Fine Jewelry";
    };
  }, []);

  return (
    <div className="shipping-page-root">
      {/* 1. Breadcrumb Hero Banner Section (Matches Screenshot 1 Header) */}
      <section className="shipping-breadcrumb-area" aria-label="Shipping & Return Banner">
        <img
          src={SHIPPING_BREADCRUMB_BG}
          alt="Shipping & Return Breadcrumb Background"
          className="shipping-breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="shipping-breadcrumb-tint" />
        <div className="shipping-breadcrumb-index">
          <ul className="shipping-breadcrumb-list">
            <li className="shipping-breadcrumb-item">
              <button
                type="button"
                className="shipping-breadcrumb-btn"
                onClick={onNavigateHome}
              >
                HOME
              </button>
            </li>
            <li className="shipping-breadcrumb-separator" aria-hidden="true">-</li>
            <li className="shipping-breadcrumb-item">
              <span className="shipping-breadcrumb-current">SHIPPING & RETURN</span>
            </li>
          </ul>

          <div className="shipping-breadcrumb-title">
            <h1>Shipping &amp; return</h1>
          </div>
        </div>
      </section>

      {/* 2. Main Two-Column Content Layout (Matches Screenshots 1 & 2) */}
      <main className="shipping-main-section" aria-label="Shipping and Return Policy Content">
        <div className="shipping-container">
          <div className="shipping-two-columns-grid">

            {/* ===== LEFT COLUMN ===== */}
            <div className="shipping-column">
              {/* RETURNS */}
              <section className="shipping-block">
                <h2 className="shipping-heading">RETURNS</h2>
                <p className="shipping-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <p className="shipping-paragraph">
                  To this end, we have developed Inditex's The List program.
                </p>
                <ul className="shipping-simple-bullets">
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>To this end, we have developed Inditex's The List program.</li>
                </ul>
              </section>

              {/* EXCHANGES */}
              <section className="shipping-block">
                <h2 className="shipping-heading">EXCHANGES</h2>
                <p className="shipping-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <p className="shipping-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                </p>
                <ul className="shipping-bullet-group">
                  <li className="shipping-bullet-item">
                    <span className="shipping-bullet-label">• We only replace items if they are defective or damaged:</span>
                    <p className="shipping-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                  <li className="shipping-bullet-item">
                    <span className="shipping-bullet-label">• If the item wasn't marked as a gift when purchased:</span>
                    <p className="shipping-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                </ul>
              </section>
            </div>

            {/* ===== RIGHT COLUMN ===== */}
            <div className="shipping-column">
              {/* REFUNDS */}
              <section className="shipping-block">
                <h2 className="shipping-heading">REFUNDS</h2>
                <p className="shipping-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <p className="shipping-paragraph">
                  To this end, we have developed Inditex's The List program.
                </p>
                <ul className="shipping-simple-bullets">
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>To this end, we have developed Inditex's The List program.</li>
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>To this end, we have developed Inditex's The List program.</li>
                </ul>
              </section>

              {/* SHIPPING */}
              <section className="shipping-block">
                <h2 className="shipping-heading">SHIPPING</h2>
                <p className="shipping-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <p className="shipping-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                </p>
                <ul className="shipping-bullet-group">
                  <li className="shipping-bullet-item">
                    <span className="shipping-bullet-label">• To return your product:</span>
                    <p className="shipping-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                  <li className="shipping-bullet-item">
                    <span className="shipping-bullet-label">• Depending on where you live:</span>
                    <p className="shipping-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                </ul>
              </section>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
};
