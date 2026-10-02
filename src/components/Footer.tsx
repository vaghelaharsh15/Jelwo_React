import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Truck, 
  Headset,
  Plus,
  Minus,
  ArrowUp,
  Home,
  Search,
  LayoutGrid,
  Heart,
  User
} from 'lucide-react';
import { JELWO_LOGO_URL } from '../constants/branding';
import './Footer.css';

export interface FooterProps {
  showTrustStrip?: boolean;
  onNavigate?: (page: 'about' | 'home' | 'blogs' | 'collections' | 'products' | 'contact' | 'faq' | 'privacy' | 'refund' | 'shipping' | 'terms' | 'location' | 'account') => void;
}

export const Footer: React.FC<FooterProps> = ({ showTrustStrip = true, onNavigate }) => {
  // Mobile accordion state for the 4 navigation columns (Matches Screenshot 2)
  const [openMobileSections, setOpenMobileSections] = useState<Record<string, boolean>>({
    information: false,
    privacy: false,
    category: false,
    contact: false
  });

  // Floating Scroll to Top button visibility (only visible when scrolled down)
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileSection = (key: string) => {
    setOpenMobileSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="jewelry-footer">
      {/* Trust Badges Strip (Conditional - hidden on Collections page) */}
      {showTrustStrip && (
        <div className="footer-trust-strip">
          <div className="container footer-trust-container">
            {/* 1. Free shipping */}
            <div className="trust-item">
              <Truck size={34} strokeWidth={1.8} className="trust-icon" />
              <div>
                <h4 className="trust-title">Free shipping</h4>
                <p className="trust-sub">Free shipping all order</p>
              </div>
            </div>

            {/* 2. Quality support */}
            <div className="trust-item">
              <Headset size={34} strokeWidth={1.8} className="trust-icon" />
              <div>
                <h4 className="trust-title">Quality support</h4>
                <p className="trust-sub">Support 24/7 hours a day</p>
              </div>
            </div>

            {/* 3. Money return */}
            <div className="trust-item">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="trust-icon"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M21 21v-5h-5" />
                <path d="M12 7v10" />
                <path d="M14 9.5a2 2 0 0 0-2-1.5H11a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-1.5a2 2 0 0 1-2-1.5" />
              </svg>
              <div>
                <h4 className="trust-title">Money return</h4>
                <p className="trust-sub">30 days for free return</p>
              </div>
            </div>

            {/* 4. 100% Payment secure */}
            <div className="trust-item">
              <ShieldCheck size={34} strokeWidth={1.8} className="trust-icon" />
              <div>
                <h4 className="trust-title">100% Payment secure</h4>
                <p className="trust-sub">We ensure secure payment</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main 5-Column Footer Grid (Becomes collapsible accordion in mobile format) */}
      <div className="container footer-main-content">
        <div className="footer-columns-grid">
          {/* Col 1: Brand & Payments (Screenshot 2: Logo, text, payment cards) */}
          <div className="footer-brand-col">
            <a 
              href="/" 
              className="footer-brand-link" 
              aria-label="Jelwo Jewelry Homepage"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home');
                }
              }}
            >
              <img
                src={JELWO_LOGO_URL}
                alt="Jelwo Fine Jewelry"
                className="footer-brand-logo-img"
              />
            </a>
            <p className="footer-about-text">
              Lorem Ipsum is simply text of the printing industry.
            </p>

            {/* Payment Cards Row */}
            <div className="footer-payment-badges" aria-label="Accepted Payment Methods">
              {/* Visa */}
              <span className="pay-card pay-visa" title="Visa">
                <svg viewBox="0 0 36 24" width="36" height="24">
                  <rect width="36" height="24" rx="2" fill="#1434CB"/>
                  <path d="M14.5 16.5l2.2-10h2.4l-2.2 10h-2.4zm-4.7-9.8c-.5-.2-1.3-.4-2.3-.4-2.5 0-4.3 1.3-4.3 3.2 0 1.4 1.3 2.2 2.2 2.6.9.5 1.3.8 1.3 1.2 0 .7-.8 1-1.6 1-.9 0-1.5-.2-2.1-.5l-.3-.1-.3 1.9c.5.2 1.5.4 2.6.4 2.6 0 4.4-1.3 4.4-3.3 0-1.1-.7-2-2.2-2.7-.9-.5-1.4-.8-1.4-1.3 0-.4.5-.9 1.5-.9.8 0 1.4.2 1.9.4l.2.1.5-1.6zm13.7 4.2l1.3-3.6.7 3.6h-2zm3.2 5.6h2.1l-1.8-10h-2c-.5 0-.9.2-1.1.7l-3.8 9.3h2.5l.5-1.4h3.1l.5 1.4zm-7.6-6.6l-.3 1.5c-.7-.3-1.6-.5-2.2-.5-1.1 0-1.7.5-1.7 1.1 0 .6.5.9 1.4 1.2 1.5.5 2.1 1.2 2.1 2.3 0 1.6-1.3 2.5-3.4 2.5-1.2 0-2.1-.3-2.6-.5l.4-1.9c.5.3 1.3.5 2.2.5 1 0 1.5-.4 1.5-.9 0-.5-.4-.8-1.3-1.1-1.4-.5-2.1-1.1-2.1-2.2 0-1.6 1.3-2.5 3.3-2.5.9 0 1.9.2 2.7.5z" fill="#FFFFFF"/>
                </svg>
              </span>
              {/* Mastercard */}
              <span className="pay-card pay-mastercard" title="Mastercard">
                <svg viewBox="0 0 36 24" width="36" height="24">
                  <rect width="36" height="24" rx="2" fill="#222222"/>
                  <circle cx="14" cy="12" r="7" fill="#EB001B"/>
                  <circle cx="22" cy="12" r="7" fill="#F79E1B"/>
                  <path d="M18 6.9a7 7 0 0 0 0 10.2 7 7 0 0 0 0-10.2z" fill="#FF5F00"/>
                </svg>
              </span>
              {/* Amex */}
              <span className="pay-card pay-amex" title="American Express">
                <svg viewBox="0 0 36 24" width="36" height="24">
                  <rect width="36" height="24" rx="2" fill="#006FCF"/>
                  <path d="M7 16l3.5-8h2.8l3.5 8h-2.3l-.7-1.8H10.2L9.5 16H7zm3.8-3.6h2.2l-1.1-3-1.1 3zm8.2 3.6V8h2.3l2.2 4.4L25.7 8H28v8h-2.1v-5.2l-2.1 4.2h-1.1l-2.1-4.2V16H19z" fill="#FFFFFF"/>
                </svg>
              </span>
              {/* PayPal */}
              <span className="pay-card pay-paypal" title="PayPal">
                <svg viewBox="0 0 36 24" width="36" height="24">
                  <rect width="36" height="24" rx="2" fill="#FFFFFF" stroke="#D8CFE5" strokeWidth="1"/>
                  <path d="M14 17h2.2l1.3-7.5h-2.2L14 17zm3.2-5.4h1.5c1.8 0 2.8-.8 3-2.1.2-1.3-.6-2.2-2.3-2.2h-3.2l-1.6 9.5h2.2l.4-2.4v-.8h0zm.6-2.4h.9c.7 0 1.1.3 1 .9-.1.6-.6.9-1.2.9h-.5l-.2-1.8z" fill="#003087"/>
                  <path d="M18 15h2c1.7 0 2.6-.7 2.8-2 .2-1.2-.5-2.1-2.1-2.1h-3l-1.5 8.9h2.1l.4-2.4v-.8h0zm.6-2.3h.9c.6 0 1 .3.9.8-.1.6-.6.9-1.1.9h-.5l-.2-1.7z" fill="#0079C1"/>
                </svg>
              </span>
            </div>
          </div>

          {/* Col 2: Information (Screenshot 2: Accordion on mobile) */}
          <div className={`footer-nav-col ${openMobileSections.information ? 'is-open' : ''}`}>
            <button 
              type="button" 
              className="footer-col-header-btn" 
              onClick={() => toggleMobileSection('information')}
              aria-expanded={openMobileSections.information}
            >
              <h4 className="footer-col-title">Information</h4>
              <span className="footer-col-acc-icon">
                {openMobileSections.information ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <ul className="footer-links-list">
              <li>
                <a 
                  href="/pages/about-us" 
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('about');
                    }
                  }}
                >
                  About us
                </a>
              </li>
              <li>
                <a 
                  href="/pages/contact-1"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('contact');
                    }
                  }}
                >
                  Contact us
                </a>
              </li>
              <li>
                <a 
                  href="/pages/faq"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('faq');
                    }
                  }}
                >
                  Faq's
                </a>
              </li>
              <li>
                <a 
                  href="/blogs" 
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('blogs');
                    }
                  }}
                >
                  News
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Privacy & terms (Screenshot 2: Accordion on mobile) */}
          <div className={`footer-nav-col ${openMobileSections.privacy ? 'is-open' : ''}`}>
            <button 
              type="button" 
              className="footer-col-header-btn" 
              onClick={() => toggleMobileSection('privacy')}
              aria-expanded={openMobileSections.privacy}
            >
              <h4 className="footer-col-title">Privacy & terms</h4>
              <span className="footer-col-acc-icon">
                {openMobileSections.privacy ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <ul className="footer-links-list">
              <li>
                <a 
                  href="/pages/privacy-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('privacy');
                  }}
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a 
                  href="/pages/refund-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('refund');
                  }}
                >
                  Refund policy
                </a>
              </li>
              <li>
                <a 
                  href="/pages/shipping-return"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('shipping');
                  }}
                >
                  Shipping & return
                </a>
              </li>
              <li>
                <a 
                  href="/pages/terms-condition"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('terms');
                  }}
                >
                  Terms & condition
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Category (Screenshot 2: Accordion on mobile) */}
          <div className={`footer-nav-col ${openMobileSections.category ? 'is-open' : ''}`}>
            <button 
              type="button" 
              className="footer-col-header-btn" 
              onClick={() => toggleMobileSection('category')}
              aria-expanded={openMobileSections.category}
            >
              <h4 className="footer-col-title">Category</h4>
              <span className="footer-col-acc-icon">
                {openMobileSections.category ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <ul className="footer-links-list">
              <li>
                <a 
                  href="/collections"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('collections');
                  }}
                >
                  Bracelets
                </a>
              </li>
              <li>
                <a 
                  href="/collections"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('collections');
                  }}
                >
                  Earrings
                </a>
              </li>
              <li>
                <a 
                  href="/collections"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('collections');
                  }}
                >
                  Necklace
                </a>
              </li>
              <li>
                <a 
                  href="/collections"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('collections');
                  }}
                >
                  Rings
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact (Screenshot 2: Accordion on mobile) */}
          <div className={`footer-nav-col footer-contact-col ${openMobileSections.contact ? 'is-open' : ''}`}>
            <button 
              type="button" 
              className="footer-col-header-btn" 
              onClick={() => toggleMobileSection('contact')}
              aria-expanded={openMobileSections.contact}
            >
              <h4 className="footer-col-title">Contact</h4>
              <span className="footer-col-acc-icon">
                {openMobileSections.contact ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin size={17} className="contact-icon" />
                <span className="contact-text">
                  55 East 10th street, new york, ny 10003, united states
                </span>
              </div>
              <div className="footer-contact-item">
                <Phone size={17} className="contact-icon" />
                <a href="tel:+2201234567890" className="contact-text contact-link">
                  + (220) 123 456 7890
                </a>
              </div>
              <div className="footer-contact-item">
                <Mail size={17} className="contact-icon" />
                <a href="mailto:demo123546@gmail.com" className="contact-text contact-link">
                  demo123546@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Icons & Copyright Strip (Matches Screenshot 2) */}
        <div className="footer-bottom-strip">
          <div className="footer-bottom-centered">
            {/* Social Icons */}
            <div className="footer-social-icons">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="X (Twitter)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Pinterest">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <span className="footer-pipe-divider">|</span>

            {/* Copyright */}
            <p className="footer-copyright-text">
              Copyright © 2026 by spacingtech
            </p>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button (Unified across all pages, visible only on scroll down) */}
      <button 
        type="button" 
        className={`footer-scroll-top-btn ${showScrollTop ? 'is-visible' : ''}`} 
        onClick={scrollToTop} 
        aria-label="Scroll to top of page"
      >
        <ArrowUp size={18} strokeWidth={2} />
      </button>

      {/* Fixed Bottom Mobile Navigation Bar (Matches Screenshot 2: Home, Search, Shop, Wishlist, Account) */}
      <nav className="mobile-bottom-nav-bar" aria-label="Mobile Navigation">
        {/* 1. Home */}
        <button 
          type="button" 
          className="mob-nav-item" 
          onClick={() => {
            onNavigate?.('home');
            scrollToTop();
          }}
          aria-label="Navigate to Home"
        >
          <Home size={20} strokeWidth={1.6} />
          <span className="mob-nav-label">Home</span>
        </button>

        {/* 2. Search */}
        <button 
          type="button" 
          className="mob-nav-item" 
          onClick={() => {
            const searchInput = document.querySelector('.topbar-search-input') as HTMLInputElement;
            if (searchInput) {
              searchInput.focus();
              scrollToTop();
            } else {
              onNavigate?.('collections');
            }
          }}
          aria-label="Search Store"
        >
          <Search size={20} strokeWidth={1.6} />
          <span className="mob-nav-label">Search</span>
        </button>

        {/* 3. Shop */}
        <button 
          type="button" 
          className="mob-nav-item" 
          onClick={() => {
            onNavigate?.('collections');
            scrollToTop();
          }}
          aria-label="Shop Collections"
        >
          <LayoutGrid size={20} strokeWidth={1.6} />
          <span className="mob-nav-label">Shop</span>
        </button>

        {/* 4. Wishlist */}
        <button 
          type="button" 
          className="mob-nav-item" 
          onClick={() => {
            alert('Wishlist opened! (0 items saved)');
          }}
          aria-label="View Wishlist"
        >
          <div className="mob-nav-icon-wrap">
            <Heart size={20} strokeWidth={1.6} />
            <span className="mob-badge">0</span>
          </div>
          <span className="mob-nav-label">Wishlist</span>
        </button>

        {/* 5. Account */}
        <button 
          type="button" 
          className="mob-nav-item" 
          onClick={() => {
            onNavigate?.('account');
            scrollToTop();
          }}
          aria-label="My Account"
        >
          <User size={20} strokeWidth={1.6} />
          <span className="mob-nav-label">Account</span>
        </button>
      </nav>
    </footer>
  );
};
