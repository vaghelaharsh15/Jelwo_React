import React, { useState, useEffect } from 'react';
import './LoginPage.css';

interface LoginPageProps {
  onNavigateHome?: () => void;
  onNavigateRegister?: () => void;
}

// Background image matching Jelwo's breadcrumb hero banner 
const ACCOUNT_BREADCRUMB_BG = 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-breadcrumb.jpg?v=1742473987&width=1920';

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigateHome, onNavigateRegister }) => {
  const [showRecover, setShowRecover] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  // Recover form state
  const [recoverEmail, setRecoverEmail] = useState('');
  const [recoverSuccess, setRecoverSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Account - Jelwo Fine Jewelry';
    return () => {
      document.title = "Jelwo - World's Best Fine Jewelry";
    };
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    setLoginMessage(`Welcome back! Successfully signed in as ${loginEmail}`);
    setTimeout(() => {
      setLoginMessage(null);
    }, 4000);
  };

  const handleRecoverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoverEmail) return;
    setRecoverSuccess(true);
    setTimeout(() => {
      setRecoverSuccess(false);
      setShowRecover(false);
    }, 3500);
  };

  return (
    <div className="login-page-root">
      {/* 1. Breadcrumb Hero Banner Section  */}
      <section className="account-breadcrumb-area" aria-label="Account Breadcrumb Banner">
        <img
          src={ACCOUNT_BREADCRUMB_BG}
          alt="Account Breadcrumb Background"
          className="account-breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="account-breadcrumb-tint" />
        <div className="account-breadcrumb-index">
          <ul className="account-breadcrumb-list">
            <li className="account-breadcrumb-item">
              <button
                type="button"
                className="account-breadcrumb-btn"
                onClick={onNavigateHome}
              >
                HOME
              </button>
            </li>
            <li className="account-breadcrumb-separator" aria-hidden="true">-</li>
            <li className="account-breadcrumb-item">
              <span className="account-breadcrumb-current">ACCOUNT</span>
            </li>
          </ul>

          <div className="account-breadcrumb-title">
            <h1>Account</h1>
          </div>
        </div>
      </section>

      {/* 2. Main Login / Recover Form Section */}
      <section className="customer-page section-ptb">
        <div className="container">
          <div className="acc-form">
            
            {/* === LOGIN FORM === */}
            {!showRecover && (
              <div className="log-acc-page" id="CustomerLoginForm1">
                <div className="section-capture">
                  <div className="section-title">
                    <h2 className="login-main-title mr-0">Login account</h2>
                  </div>

                  {/* Sign in with Shop Provider Button */}
                  <div aria-label="sign-in-with-shop-provider" className="shop-provider-section">
                    <button 
                      type="button" 
                      className="shop-login-btn"
                      onClick={() => alert('Shop Pay Sign In will open in a secure window.')}
                      aria-label="Sign in with Shop"
                    >
                      <span className="shop-login-text">
                        Sign in with{' '}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 60 25"
                          role="img"
                          className="shop-logo-svg"
                        >
                          <title>Shop</title>
                          <path
                            fill="currentColor"
                            d="M7.74 11.067c-2.35-.509-3.396-.708-3.396-1.612 0-.85.708-1.274 2.125-1.274 1.246 0 2.157.544 2.828 1.609.05.082.155.11.24.066l2.644-1.334a.186.186 0 0 0 .076-.259c-1.098-1.9-3.125-2.94-5.794-2.94-3.507 0-5.686 1.727-5.686 4.47 0 2.914 2.653 3.65 5.006 4.16 2.353.509 3.403.708 3.403 1.612 0 .904-.765 1.33-2.293 1.33-1.41 0-2.457-.644-3.09-1.896a.185.185 0 0 0-.25-.082L.916 16.222a.188.188 0 0 0-.082.253c1.046 2.102 3.194 3.284 6.062 3.284 3.653 0 5.86-1.697 5.86-4.526 0-2.83-2.666-3.65-5.015-4.16v-.006ZM21.909 5.324c-1.5 0-2.824.53-3.776 1.476a.093.093 0 0 1-.158-.067V.7a.185.185 0 0 0-.187-.186H14.48a.185.185 0 0 0-.187.186v18.728c0 .105.083.187.187.187h3.308a.185.185 0 0 0 .187-.187v-8.215c0-1.586 1.217-2.803 2.859-2.803 1.641 0 2.83 1.191 2.83 2.803v8.215c0 .105.082.187.187.187h3.308a.185.185 0 0 0 .186-.187v-8.215c0-3.451-2.264-5.888-5.436-5.888ZM34.056 4.786c-1.796 0-3.478.55-4.687 1.344a.187.187 0 0 0-.06.25l1.458 2.487c.054.089.168.12.256.066a5.812 5.812 0 0 1 3.04-.834c2.887 0 5.01 2.035 5.01 4.725 0 2.292-1.7 3.99-3.853 3.99-1.755 0-2.973-1.022-2.973-2.463 0-.825.351-1.501 1.265-1.979a.183.183 0 0 0 .073-.259L32.21 9.787a.186.186 0 0 0-.224-.08c-1.844.683-3.137 2.327-3.137 4.533 0 3.338 2.66 5.829 6.369 5.829 4.333 0 7.448-3 7.448-7.302 0-4.611-3.624-7.98-8.609-7.98ZM52.342 5.295c-1.673 0-3.169.62-4.26 1.707a.092.092 0 0 1-.158-.066V5.627a.185.185 0 0 0-.186-.186h-3.223a.185.185 0 0 0-.187.186v18.7c0 .104.082.186.187.186h3.308a.185.185 0 0 0 .187-.187v-6.131c0-.083.098-.124.158-.07 1.088 1.012 2.527 1.602 4.174 1.602 3.88 0 6.907-3.138 6.907-7.216 0-4.077-3.03-7.216-6.907-7.216Zm-.626 11.265c-2.207 0-3.88-1.754-3.88-4.074s1.67-4.074 3.88-4.074 3.877 1.726 3.877 4.074c0 2.349-1.644 4.074-3.88 4.074h.003Z"
                          />
                        </svg>
                      </span>
                    </button>
                    <p className="shop-or-divider mr-0">or</p>
                  </div>
                </div>

                <div className="acc-page">
                  <div className="login">
                    {loginMessage && (
                      <div className="login-alert-success" role="status">
                        {loginMessage}
                      </div>
                    )}

                    <form 
                      method="post" 
                      action="#login" 
                      id="customer_login"
                      onSubmit={handleLoginSubmit}
                    >
                      <div className="login-form-container">
                        <ul className="list-unstyled fill-form">
                          {/* Email Address */}
                          <li className="log-email">
                            <label htmlFor="CustomerEmail">Email address</label>
                            <input
                              type="email"
                              name="customer[email]"
                              id="CustomerEmail"
                              className="input-full"
                              placeholder="Email address"
                              autoCorrect="off"
                              autoCapitalize="off"
                              autoFocus
                              required
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                            />
                          </li>

                          {/* Password */}
                          <li className="log-pwd">
                            <label htmlFor="CustomerPassword">Password</label>
                            <input
                              type="password"
                              name="customer[password]"
                              id="CustomerPassword"
                              className="input-full"
                              placeholder="Password"
                              required
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                            />
                          </li>
                        </ul>

                        {/* Sign in button & Forgot password */}
                        <div className="form-action-button">
                          <button 
                            type="submit" 
                            className="btn btn-style login-submit-btn" 
                            aria-label="Sign in"
                          >
                            SIGN IN
                          </button>

                          <button
                            type="button"
                            id="RecoverPassword"
                            className="recover-pwd-trigger"
                            onClick={() => setShowRecover(true)}
                          >
                            Forgot your password?
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Create Account Action */}
                  <div className="acc-wrapper">
                    <div className="account-optional-action">
                      <button
                        type="button"
                        className="btn-style create-acc-btn"
                        onClick={() => {
                          if (onNavigateRegister) {
                            onNavigateRegister();
                          } else {
                            alert('Create Account registration will be available shortly.');
                          }
                        }}
                      >
                        CREATE ACCOUNT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* === RECOVER / RESET PASSWORD FORM === */}
            {showRecover && (
              <div className="log-acc-page" id="RecoverPasswordForm">
                <div className="section-capture">
                  <div className="section-title">
                    <h2 className="login-main-title mr-0">
                      <span className="title-main">Reset your password</span>
                    </h2>
                    <p className="desc recover-desc">We will send you an email to reset your password.</p>
                  </div>
                </div>

                <div className="acc-page">
                  {recoverSuccess && (
                    <div className="login-alert-success" role="status">
                      Password reset email sent! Please check your inbox.
                    </div>
                  )}

                  <form 
                    method="post" 
                    action="#recover"
                    onSubmit={handleRecoverSubmit}
                  >
                    <div className="login-form-container">
                      <ul className="list-unstyled fill-form">
                        <li className="log-email">
                          <label htmlFor="RecoverEmail">Email address</label>
                          <input
                            type="email"
                            name="email"
                            id="RecoverEmail"
                            className="input-full"
                            placeholder="Email address"
                            autoCorrect="off"
                            autoCapitalize="off"
                            required
                            value={recoverEmail}
                            onChange={(e) => setRecoverEmail(e.target.value)}
                          />
                        </li>

                        <li className="form-toggle-btn">
                          <div className="form-action-button recover-action-button">
                            <button 
                              className="btn btn-style login-submit-btn" 
                              type="submit" 
                              aria-label="Submit"
                            >
                              SUBMIT
                            </button>
                            <button
                              type="button"
                              id="HideRecoverPasswordLink"
                              className="recover-pwd-trigger"
                              onClick={() => setShowRecover(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

    </div>
  );
};
