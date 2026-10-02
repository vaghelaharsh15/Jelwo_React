import React, { useEffect } from 'react';
import './TermsConditionPage.css';

interface TermsConditionPageProps {
  onNavigateHome?: () => void;
}

// Background image matching Jelwo's breadcrumb hero banner (earrings and paper as shown in screenshot)
const TERMS_BREADCRUMB_BG = 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-breadcrumb.jpg?v=1742473987&width=1920';

export const TermsConditionPage: React.FC<TermsConditionPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Terms & condition - Jelwo Fine Jewelry';
    return () => {
      document.title = "Jelwo - World's Best Fine Jewelry";
    };
  }, []);

  return (
    <div className="terms-page-root">
      {/* 1. Breadcrumb Hero Banner Section (Matches Screenshot 1 Header) */}
      <section className="terms-breadcrumb-area" aria-label="Terms & Condition Banner">
        <img
          src={TERMS_BREADCRUMB_BG}
          alt="Terms & Condition Breadcrumb Background"
          className="terms-breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="terms-breadcrumb-tint" />
        <div className="terms-breadcrumb-index">
          <ul className="terms-breadcrumb-list">
            <li className="terms-breadcrumb-item">
              <button
                type="button"
                className="terms-breadcrumb-btn"
                onClick={onNavigateHome}
              >
                HOME
              </button>
            </li>
            <li className="terms-breadcrumb-separator" aria-hidden="true">-</li>
            <li className="terms-breadcrumb-item">
              <span className="terms-breadcrumb-current">TERMS &amp; CONDITION</span>
            </li>
          </ul>

          <div className="terms-breadcrumb-title">
            <h1>Terms &amp; condition</h1>
          </div>
        </div>
      </section>

      {/* 2. Main Two-Column Content Layout (Matches User Snippet & Screenshots 1 & 2) */}
      <section 
        className="terms-policy-section refund-policy" 
        style={{
          '--padding-top': '80px',
          '--padding-bottom': '80px',
          '--padding-top-ipad': '80px',
          '--padding-bottom-ipad': '80px',
          '--padding-top-xs': '60px',
          '--padding-bottom-xs': '60px'
        } as React.CSSProperties}
        aria-label="Terms & Condition Details"
      >
        <div className="container terms-container">
          <div className="grid-wrap terms-two-columns-grid">
            
            {/* ===== LEFT COLUMN (Grid Wrapper 1) ===== */}
            <div className="grid-wrapper terms-column">
              <ul className="rule-wrap list-unstyled terms-rules-list">
                
                {/* 1. Term & condition overview */}
                <li data-fade-in="" className="rule-wrapper fade-in terms-block">
                  <h6 className="terms-heading mr-0">TERM &amp; CONDITION OVERVIEW</h6>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                </li>

                {/* 2. ONLINE STORE TERMS */}
                <li data-fade-in="" className="rule-wrapper fade-in terms-block">
                  <h6 className="terms-heading mr-0">ONLINE STORE TERMS</h6>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    <a href="mailto:"></a>
                  </p>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                </li>

                {/* 3. COMPLETENESS AND TIMELINESS OF INFORMATION */}
                <li data-fade-in="" className="rule-wrapper fade-in terms-block">
                  <h6 className="terms-heading mr-0">COMPLETENESS AND TIMELINESS OF INFORMATION</h6>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                </li>

                {/* 4. PRODUCTS OR SERVICES (if applicable) - Part 1 */}
                <li data-fade-in="" className="rule-wrapper fade-in terms-block">
                  <h6 className="terms-heading mr-0">PRODUCTS OR SERVICES (if applicable)</h6>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    <a href="mailto:"></a>
                  </p>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                </li>

                {/* 5. PRODUCTS OR SERVICES (if applicable) - Part 2 */}
                <li data-fade-in="" className="rule-wrapper fade-in terms-block">
                  <h6 className="terms-heading mr-0">PRODUCTS OR SERVICES (if applicable)</h6>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                </li>

                {/* 6. OPTIONAL TOOLS */}
                <li data-fade-in="" className="rule-wrapper fade-in terms-block">
                  <h6 className="terms-heading mr-0">OPTIONAL TOOLS</h6>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                </li>

              </ul>
            </div>

            {/* ===== RIGHT COLUMN (Grid Wrapper 2) ===== */}
            <div className="grid-wrapper terms-column">
              <ul className="rule-wrap list-unstyled terms-rules-list">
                
                {/* 1. Last Updated: march 25, 2023 */}
                <li data-fade-in="" className="rule-wrapper fade-in terms-block">
                  <h6 className="terms-heading mr-0">LAST UPDATED: MARCH 25, 2023</h6>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                </li>

                {/* 2. GENERAL CONDITIONS */}
                <li data-fade-in="" className="rule-wrapper fade-in terms-block">
                  <h6 className="terms-heading mr-0">GENERAL CONDITIONS</h6>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                </li>

                {/* 3. MODIFICATIONS TO THE SERVICE AND PRICES */}
                <li data-fade-in="" className="rule-wrapper fade-in terms-block">
                  <h6 className="terms-heading mr-0">MODIFICATIONS TO THE SERVICE AND PRICES</h6>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                </li>

                {/* 4. ACCURACY OF BILLING AND ACCOUNT INFORMATION - Part 1 */}
                <li data-fade-in="" className="rule-wrapper fade-in terms-block">
                  <h6 className="terms-heading mr-0">ACCURACY OF BILLING AND ACCOUNT INFORMATION</h6>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                </li>

                {/* 5. ACCURACY OF BILLING AND ACCOUNT INFORMATION - Part 2 */}
                <li data-fade-in="" className="rule-wrapper fade-in terms-block">
                  <h6 className="terms-heading mr-0">ACCURACY OF BILLING AND ACCOUNT INFORMATION</h6>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                </li>

                {/* 6. THIRD-PARTY LINKS */}
                <li data-fade-in="" className="rule-wrapper fade-in terms-block">
                  <h6 className="terms-heading mr-0">THIRD-PARTY LINKS</h6>
                  <p className="terms-paragraph mr-0">
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                    <a href="mailto:"></a>
                  </p>
                  <p className="terms-paragraph mr-0">
                    We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
                    <a href="mailto:"></a>
                  </p>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
