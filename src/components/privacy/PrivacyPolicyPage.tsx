import React, { useEffect } from 'react';
import './PrivacyPolicyPage.css';

interface PrivacyPolicyPageProps {
  onNavigateHome?: () => void;
}

// Background image matching other Jelwo pages
const PRIVACY_BREADCRUMB_BG = 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-breadcrumb.jpg?v=1742473987&width=1920';

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Privacy policy - Jelwo Fine Jewelry';
    return () => {
      document.title = "Jelwo - World's Best Fine Jewelry";
    };
  }, []);

  return (
    <div className="privacy-page-root">
      {/* 1. Breadcrumb Hero Banner Section (Matches Reference Screenshots) */}
      <section className="privacy-breadcrumb-area" aria-label="Privacy Policy Banner">
        <img
          src={PRIVACY_BREADCRUMB_BG}
          alt="Privacy Policy Breadcrumb Background"
          className="privacy-breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="privacy-breadcrumb-tint" />
        <div className="privacy-breadcrumb-index">
          <ul className="privacy-breadcrumb-list">
            <li className="privacy-breadcrumb-item">
              <button
                type="button"
                className="privacy-breadcrumb-btn"
                onClick={onNavigateHome}
              >
                HOME
              </button>
            </li>
            <li className="privacy-breadcrumb-separator" aria-hidden="true">-</li>
            <li className="privacy-breadcrumb-item">
              <span className="privacy-breadcrumb-current">PRIVACY POLICY</span>
            </li>
          </ul>

          <div className="privacy-breadcrumb-title">
            <h1>Privacy policy</h1>
          </div>
        </div>
      </section>

      {/* 2. Main Two-Column Privacy Content Layout */}
      <main className="privacy-main-section" aria-label="Privacy Policy Details">
        <div className="privacy-container">
          <div className="privacy-two-columns-grid">

            {/* ===== LEFT COLUMN ===== */}
            <div className="privacy-column">
              {/* 1. Collecting Personal Information */}
              <section className="privacy-block">
                <h2 className="privacy-heading">COLLECTING PERSONAL INFORMATION</h2>
                <p className="privacy-paragraph">
                  When you visit the Site, we collect certain information aboutyour device, your interaction with the Site, and informationnecessary to process your purchases. We may also collectadditional information if you for customer support.
                </p>
              </section>

              {/* 2. Device Information */}
              <section className="privacy-block">
                <h2 className="privacy-heading">DEVICE INFORMATION</h2>
                <ul className="privacy-bullet-group">
                  <li className="privacy-bullet-item">
                    <span className="privacy-bullet-label">• Examples of personal information collected:</span>
                    <p className="privacy-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                  <li className="privacy-bullet-item">
                    <span className="privacy-bullet-label">• Purpose of collection:</span>
                    <p className="privacy-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                  <li className="privacy-bullet-item">
                    <span className="privacy-bullet-label">• Source of collection:</span>
                    <p className="privacy-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                </ul>
              </section>

              {/* 3. Customer Support Information */}
              <section className="privacy-block">
                <h2 className="privacy-heading">CUSTOMER SUPPORT INFORMATION</h2>
                <ul className="privacy-bullet-group">
                  <li className="privacy-bullet-item">
                    <span className="privacy-bullet-label">• Examples of personal information collected:</span>
                    <p className="privacy-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                  <li className="privacy-bullet-item">
                    <span className="privacy-bullet-label">• Purpose of collection:</span>
                    <p className="privacy-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                  <li className="privacy-bullet-item">
                    <span className="privacy-bullet-label">• Source of collection:</span>
                    <p className="privacy-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                </ul>
              </section>

              {/* 4. Your Rights */}
              <section className="privacy-block">
                <h2 className="privacy-heading">YOUR RIGHTS</h2>
                <ul className="privacy-bullet-group">
                  <li className="privacy-bullet-item">
                    <span className="privacy-bullet-label">• GDPR</span>
                    <p className="privacy-bullet-desc">
                      The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                    </p>
                  </li>
                </ul>
                <p className="privacy-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
              </section>

              {/* 5. CCPA */}
              <section className="privacy-block">
                <h2 className="privacy-heading">CCPA</h2>
                <p className="privacy-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <p className="privacy-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
              </section>

              {/* 6. Changes */}
              <section className="privacy-block">
                <h2 className="privacy-heading">CHANGES</h2>
                <p className="privacy-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <p className="privacy-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <p className="privacy-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
              </section>
            </div>

            {/* ===== RIGHT COLUMN ===== */}
            <div className="privacy-column">
              {/* 1. Sharing Personal Information */}
              <section className="privacy-block">
                <h2 className="privacy-heading">SHARING PERSONAL INFORMATION</h2>
                <p className="privacy-paragraph">
                  By using the Service, You agree to the collection and use ofinformation in accordance with this Privacy Policy. This PrivacyPolicy has been created with the help of the TermsFeed PrivacyPolicy Generator.
                </p>
              </section>

              {/* 2. Behavioural Advertising */}
              <section className="privacy-block">
                <h2 className="privacy-heading">BEHAVIOURAL ADVERTISING</h2>
                <p className="privacy-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <p className="privacy-paragraph">
                  By using the Service, You agree to the collection and use ofinformation in accordance with this Privacy Policy. This PrivacyPolicy has been created with the help of the TermsFeed PrivacyPolicy Generator.
                </p>
                <p className="privacy-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
              </section>

              {/* 3. Selling Personal Information */}
              <section className="privacy-block">
                <h2 className="privacy-heading">SELLING PERSONAL INFORMATION</h2>
                <p className="privacy-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <ul className="privacy-simple-bullets">
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>To this end, we have developed Inditex's The List program.</li>
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>To this end, we have developed Inditex's The List program.</li>
                </ul>
                <p className="privacy-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                </p>
              </section>

              {/* 4. Cookies */}
              <section className="privacy-block">
                <h2 className="privacy-heading">COOKIES</h2>
                <p className="privacy-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.
                </p>
              </section>

              {/* 5. Cookies Necessary For The Functioning Of The Store */}
              <section className="privacy-block">
                <h2 className="privacy-heading">COOKIES NECESSARY FOR THE FUNCTIONING OF THE STORE</h2>
                <p className="privacy-paragraph">
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                
                <div className="privacy-table-wrapper">
                  <table className="privacy-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>_dgjc</td>
                        <td>The Green to Wear 2.0 standard aims</td>
                      </tr>
                      <tr>
                        <td>_secure</td>
                        <td>The Green to Wear 2.0 standard aims</td>
                      </tr>
                      <tr>
                        <td>cart_st</td>
                        <td>The Green to Wear 2.0 standard aims</td>
                      </tr>
                      <tr>
                        <td>secret</td>
                        <td>The Green to Wear 2.0 standard aims</td>
                      </tr>
                      <tr>
                        <td>secure_customer</td>
                        <td>The Green to Wear 2.0 standard aims</td>
                      </tr>
                      <tr>
                        <td>_shopify_u</td>
                        <td>The Green to Wear 2.0 standard aims</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 6. Reporting and Analytics */}
              <section className="privacy-block">
                <h2 className="privacy-heading">REPORTING AND ANALYTICS</h2>
                <p className="privacy-paragraph">
                  We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
                </p>

                <div className="privacy-table-wrapper">
                  <table className="privacy-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>_dgjc</td>
                        <td>The Green to Wear 2.0 standard aims</td>
                      </tr>
                      <tr>
                        <td>_secure</td>
                        <td>The Green to Wear 2.0 standard aims</td>
                      </tr>
                      <tr>
                        <td>cart_st</td>
                        <td>The Green to Wear 2.0 standard aims</td>
                      </tr>
                      <tr>
                        <td>secret</td>
                        <td>The Green to Wear 2.0 standard aims</td>
                      </tr>
                      <tr>
                        <td>secure_customer</td>
                        <td>The Green to Wear 2.0 standard aims</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
};
