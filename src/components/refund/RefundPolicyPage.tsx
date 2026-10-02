import React, { useEffect } from 'react';
import './RefundPolicyPage.css';

interface RefundPolicyPageProps {
  onNavigateHome?: () => void;
}

// Background image matching other Jelwo pages
const REFUND_BREADCRUMB_BG = 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-breadcrumb.jpg?v=1742473987&width=1920';

export const RefundPolicyPage: React.FC<RefundPolicyPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Refund policy - Jelwo Fine Jewelry';
    return () => {
      document.title = "Jelwo - World's Best Fine Jewelry";
    };
  }, []);

  return (
    <div className="refund-page-root">
      {/* 1. Breadcrumb Hero Banner Section */}
      <section className="refund-breadcrumb-area" aria-label="Refund Policy Banner">
        <img
          src={REFUND_BREADCRUMB_BG}
          alt="Refund Policy Breadcrumb Background"
          className="refund-breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="refund-breadcrumb-tint" />
        <div className="refund-breadcrumb-index">
          <ul className="refund-breadcrumb-list">
            <li className="refund-breadcrumb-item">
              <button
                type="button"
                className="refund-breadcrumb-btn"
                onClick={onNavigateHome}
              >
                HOME
              </button>
            </li>
            <li className="refund-breadcrumb-separator" aria-hidden="true">-</li>
            <li className="refund-breadcrumb-item">
              <span className="refund-breadcrumb-current">REFUND POLICY</span>
            </li>
          </ul>

          <div className="refund-breadcrumb-title">
            <h1>Refund policy</h1>
          </div>
        </div>
      </section>

      {/* 2. Main Two-Column Refund Policy Content Layout */}
      <main className="refund-main-section" aria-label="Refund Policy Details">
        <div className="refund-container">
          <div className="refund-two-columns-grid">

            {/* ===== LEFT COLUMN ===== */}
            <div className="refund-column">
              {/* Return Policy Intro */}
              <section className="refund-block">
                <p className="refund-paragraph">
                  We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
                </p>
                <p className="refund-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <ul className="refund-simple-bullets">
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                </ul>
              </section>

              {/* Damages and Issues */}
              <section className="refund-block">
                <h2 className="refund-heading">DAMAGES AND ISSUES</h2>
                <p className="refund-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                </p>
              </section>

              {/* Exchanges */}
              <section className="refund-block">
                <h2 className="refund-heading">EXCHANGES</h2>
                <ul className="refund-bullet-group">
                  <li className="refund-bullet-item">
                    <span className="refund-bullet-label">• Examples of Personal Information collected:</span>
                    <p className="refund-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                  <li className="refund-bullet-item">
                    <span className="refund-bullet-label">• Purpose of collection:</span>
                    <p className="refund-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                </ul>
                <p className="refund-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <p className="refund-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                </p>
              </section>
            </div>

            {/* ===== RIGHT COLUMN ===== */}
            <div className="refund-column">
              {/* Contact Information & General Standard */}
              <section className="refund-block">
                <p className="refund-paragraph">
                  You can always contact us for any return questionat{' '}
                  <a href="mailto:support@store.com" className="refund-contact-link">
                    support@store.com
                  </a>
                </p>
                <p className="refund-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <ul className="refund-simple-bullets">
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                </ul>
              </section>

              {/* Exceptions / Non-Returnable Items */}
              <section className="refund-block">
                <h2 className="refund-heading">EXCEPTIONS / NON-RETURNABLE ITEMS</h2>
                <p className="refund-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                </p>
              </section>

              {/* Refunds */}
              <section className="refund-block">
                <h2 className="refund-heading">REFUNDS</h2>
                <ul className="refund-bullet-group">
                  <li className="refund-bullet-item">
                    <span className="refund-bullet-label">• Examples of Personal Information collected:</span>
                    <p className="refund-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                  <li className="refund-bullet-item">
                    <span className="refund-bullet-label">• Purpose of collection:</span>
                    <p className="refund-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                </ul>
                <p className="refund-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <p className="refund-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
              </section>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
};
