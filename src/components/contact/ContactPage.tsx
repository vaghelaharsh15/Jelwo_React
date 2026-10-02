import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';
import './ContactPage.css';

interface ContactPageProps {
  onNavigateHome?: () => void;
}

// Top Breadcrumb banner background ( 1 & About Us Page)
const CONTACT_BREADCRUMB_BG = 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-breadcrumb.jpg?v=1742473987&width=1920';

// Customer Support representative background image (s 2 & 3)
const SUPPORT_BANNER_IMG = '/images/contact/support-banner.jpg';

// Woman wearing jewelry browsing smartphone 
const CONTACT_PHONE_WOMAN_IMG = '/images/contact/contact-phone-woman.jpg';

// Quick support 3 cards data ( 1)
const QUICK_SUPPORT_ITEMS = [
  {
    id: 'store-location',
    icon: MapPin,
    title: 'STORE LOCATION',
    line1: '14 Ringe lane, las vegas, nv, 89156 united states',
    link: 'https://maps.google.com/?q=14+Ringe+lane+las+vegas+nv+89156+united+states'
  },
  {
    id: 'contact-call',
    icon: Phone,
    title: 'CONTACT CALL',
    line1: '+00-1234567890',
    link: 'tel:+001234567890'
  },
  {
    id: 'contact-mail',
    icon: Mail,
    title: 'CONTACT MAIL',
    line1: 'demo@support.com',
    link: 'mailto:demo@support.com'
  }
];

// Location slides from user's provided HTML code (s 2 & 3)
interface LocationSlideItem {
  id: string;
  flagUrl: string;
  flagSrcset: string;
  address: string;
  phone: string;
  mail: string;
  title: string;
}

const LOCATION_SLIDES: LocationSlideItem[] = [
  {
    id: 'loc-1',
    flagUrl: 'https://jelwo.myshopify.com/cdn/shop/files/London.jpg?v=1741695526&width=200',
    flagSrcset: 'https://jelwo.myshopify.com/cdn/shop/files/London.jpg?v=1741695526&width=72 72w',
    address: '425 Broadway, 20th floor pharchard view, London',
    phone: '+91 123 456 7890',
    mail: 'support@store.com',
    title: 'London'
  },
  {
    id: 'loc-2',
    flagUrl: 'https://jelwo.myshopify.com/cdn/shop/files/France.jpg?v=1741695526&width=200',
    flagSrcset: 'https://jelwo.myshopify.com/cdn/shop/files/France.jpg?v=1741695526&width=72 72w',
    address: '27 Eden walk eden centre orchard view, paris, France',
    phone: '+91 123 456 7890',
    mail: 'support@store.com',
    title: 'France'
  },
  {
    id: 'loc-3',
    flagUrl: 'https://jelwo.myshopify.com/cdn/shop/files/Canada.jpg?v=1741695526&width=200',
    flagSrcset: 'https://jelwo.myshopify.com/cdn/shop/files/Canada.jpg?v=1741695526&width=72 72w',
    address: '523 North stockport road bridge, toronto, Canada',
    phone: '+91 123 456 7890',
    mail: 'support@store.com',
    title: 'Canada'
  },
  {
    id: 'loc-4',
    flagUrl: 'https://jelwo.myshopify.com/cdn/shop/files/England.jpg?v=1741695526&width=200',
    flagSrcset: 'https://jelwo.myshopify.com/cdn/shop/files/England.jpg?v=1741695526&width=72 72w',
    address: '048 Holburn street 20th floor camberley, England',
    phone: '+91 123 456 7890',
    mail: 'support@store.com',
    title: 'England'
  },
  {
    id: 'loc-5',
    flagUrl: 'https://jelwo.myshopify.com/cdn/shop/files/London.jpg?v=1741695526&width=200',
    flagSrcset: 'https://jelwo.myshopify.com/cdn/shop/files/London.jpg?v=1741695526&width=72 72w',
    address: '425 Broadway, 20th floor pharchard view, London',
    phone: '+91 123 456 7890',
    mail: 'support@store.com',
    title: 'London'
  }
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const touchStartX = useRef<number | null>(null);

  // Form State for "Keep in touch with us"
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    message: '',
    terms: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Set page title and scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Contact 1 - Jelwo Fine Jewelry';
    return () => {
      document.title = "Jelwo - World's Best Fine Jewelry";
    };
  }, []);

  // Track responsive screen size for items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setItemsPerView(1);
      } else if (width < 860) {
        setItemsPerView(2);
      } else if (width < 1180) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carousel boundary limit
  const maxIndex = Math.max(0, LOCATION_SLIDES.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, terms: e.target.checked }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        message: '',
        terms: false
      });
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <div className="contact-page-root">
      {/* 1. Breadcrumb Hero Banner Section ( 1) */}
      <section 
        className="contact-breadcrumb-area" 
        aria-label="Contact Breadcrumb Banner"
        style={{ backgroundImage: `url(${CONTACT_BREADCRUMB_BG})` }}
      >
        <img 
          src={CONTACT_BREADCRUMB_BG} 
          alt="Jelwo Fine Jewelry Contact Banner" 
          className="contact-breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="contact-breadcrumb-tint" />

        <div className="container">
          <div className="contact-breadcrumb-index">
            {/* Breadcrumb Links: HOME - CONTACT 1 */}
            <ul className="contact-breadcrumb-list">
              <li className="contact-breadcrumb-item">
                <button 
                  type="button" 
                  className="contact-breadcrumb-btn"
                  onClick={onNavigateHome}
                  title="Back to the home page"
                >
                  Home
                </button>
              </li>
              <li className="contact-breadcrumb-separator" aria-hidden="true">-</li>
              <li className="contact-breadcrumb-item">
                <span className="contact-breadcrumb-current">Contact 1</span>
              </li>
            </ul>

            {/* Main Title: Contact 1 */}
            <div className="contact-breadcrumb-title">
              <h1 className="mr-0">Contact 1</h1>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Quick support" Section with 3 info circles ( 1) */}
      <section className="quick-support-section" aria-label="Quick Support Information">
        <div className="container">
          <div className="quick-support-header">
            <h2 className="quick-support-title">Quick support</h2>
          </div>

          <div className="quick-support-grid">
            {QUICK_SUPPORT_ITEMS.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.id} className="quick-support-card">
                  <div className="quick-support-icon-circle">
                    <IconComp size={28} strokeWidth={1.5} className="quick-support-icon" />
                  </div>
                  <h3 className="quick-support-card-title">{item.title}</h3>
                  {item.link ? (
                    <a href={item.link} className="quick-support-card-desc">
                      {item.line1}
                    </a>
                  ) : (
                    <p className="quick-support-card-desc">{item.line1}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Support Representative Banner + "Get in touch" Carousel Section (s 2 & 3) */}
      <section className="contact-touch-section" aria-label="Get in touch section">
        {/* Support Representative Background Banner */}
        <div className="contact-support-banner-wrap">
          <img 
            src={SUPPORT_BANNER_IMG} 
            alt="Jelwo Customer Support Representative" 
            className="contact-support-banner-img"
            loading="lazy"
          />
          <div className="contact-support-banner-gradient" />
        </div>

        {/* Floating / Inset White Card: Location Block */}
        <div className="container contact-touch-container">
          <div className="location-block" id="location-block">
            {/* Section Capture Header */}
            <div className="section-capture">
              <div className="section-title">
                <h2 className="mr-0 fade-in" data-fade-in="">Get in touch</h2>
              </div>
            </div>

            {/* Location Slider / Carousel */}
            <div 
              className="location-slider"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="swiper swiper-initialized swiper-horizontal swiper-backface-hidden"
                id="location-slider-template--17769951821961__2bd1ad5f-628b-45b6-8664-5d16d6403d70"
                data-slides-per-view={itemsPerView}
              >
                <div 
                  className="swiper-wrapper"
                  id="swiper-wrapper-99f3d80de8a13f6c"
                  aria-live="off"
                  style={{
                    transform: `translate3d(-${currentIndex * (100 / itemsPerView)}%, 0px, 0px)`,
                    transitionDuration: '650ms',
                    transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  {LOCATION_SLIDES.map((slide, index) => {
                    const isVisible = index >= currentIndex && index < currentIndex + itemsPerView;
                    return (
                      <div 
                        key={`${slide.id}-${index}`}
                        className={`swiper-slide ${isVisible ? 'swiper-slide-active' : ''}`}
                        style={{
                          width: `${100 / itemsPerView}%`,
                          flex: `0 0 ${100 / itemsPerView}%`
                        }}
                        role="group"
                        aria-label={`${index + 1} / ${LOCATION_SLIDES.length}`}
                      >
                        <div className="add-block">
                          <span className="flag-img">
                            <img 
                              src={slide.flagUrl} 
                              srcSet={slide.flagSrcset}
                              width="72" 
                              height="44" 
                              alt={`${slide.title} flag`}
                              loading="lazy" 
                              className="ls-is-cached lazyloaded"
                            />
                          </span>
                          <p className="mr-0 address-text">{slide.address}</p>
                          <div className="url-content">
                            <a className="mobile" href={`tel:${slide.phone.replace(/\s+/g, '')}`}>
                              {slide.phone}
                            </a>
                            <a className="mail" href={`mailto:${slide.mail}`}>
                              {slide.mail}
                            </a>
                          </div>
                          <span className="cnt-title">{slide.title}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
              </div>

              {/* Navigation Arrows (Prev / Next) */}
              <div className="swiper-arrow">
                <button
                  type="button"
                  className={`arrow-prev arrow-prev-template--17769951821961__2bd1ad5f-628b-45b6-8664-5d16d6403d70 ${currentIndex === 0 ? 'is-disabled' : ''}`}
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  aria-controls="swiper-wrapper-99f3d80de8a13f6c"
                >
                  <ArrowLeft size={20} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  className={`arrow-next arrow-next-template--17769951821961__2bd1ad5f-628b-45b6-8664-5d16d6403d70 ${currentIndex === maxIndex ? 'is-disabled' : ''}`}
                  onClick={handleNext}
                  aria-label="Next slide"
                  aria-controls="swiper-wrapper-99f3d80de8a13f6c"
                >
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Keep in touch with us" Contact Form Section  */}
      <section className="keep-touch-section" aria-label="Keep in touch with us form">
        <div className="container">
          <div className="keep-touch-header">
            <h2 className="keep-touch-title">Keep in touch with us</h2>
          </div>

          <form className="keep-touch-form" onSubmit={handleFormSubmit}>
            <div className="keep-touch-form-grid">
              {/* Left Column: 3 Input fields + Checkbox */}
              <div className="keep-touch-left-col">
                <div className="keep-touch-input-wrap">
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="Your full name" 
                    className="keep-touch-input"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="keep-touch-input-wrap">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your email address" 
                    className="keep-touch-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="keep-touch-input-wrap">
                  <input 
                    type="tel" 
                    name="mobile"
                    placeholder="Your mobile number" 
                    className="keep-touch-input"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="keep-touch-checkbox-wrap">
                  <label className="keep-touch-checkbox-label">
                    <input 
                      type="checkbox" 
                      name="terms"
                      checked={formData.terms}
                      onChange={handleCheckboxChange}
                      className="keep-touch-checkbox"
                      required
                    />
                    <span className="keep-touch-terms-text">
                      I accept the terms & conditions and I understand that my data will be hold securely in accordance with the privacy policy.
                    </span>
                  </label>
                </div>
              </div>

              {/* Right Column: Large Textarea + SEND MESSAGE button */}
              <div className="keep-touch-right-col">
                <div className="keep-touch-textarea-wrap">
                  <textarea 
                    name="message"
                    placeholder="Your message here..." 
                    className="keep-touch-textarea"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                  />
                </div>

                <div className="keep-touch-btn-wrap">
                  <button 
                    type="submit" 
                    className={`keep-touch-submit-btn ${formSubmitted ? 'is-sent' : ''}`}
                  >
                    {formSubmitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* 5. "WE'D LOVE TO HEAR FROM YOU" / "Contact us" Section */}
      <section className="contact-details-section" aria-label="Contact details and locations">
        <div className="container contact-details-container">
          <div className="contact-details-grid">
            {/* Left Column: Image of woman browsing smartphone wearing jewelry */}
            <div className="contact-details-img-col">
              <div className="contact-details-img-wrap">
                <img 
                  src={CONTACT_PHONE_WOMAN_IMG} 
                  alt="Fine jewelry client browsing store on mobile" 
                  className="contact-details-img"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column: Header, Contact Rows (Address, Phone, Email) & Social Media */}
            <div className="contact-details-info-col">
              <div className="contact-details-header">
                <span className="contact-details-tag">WE'D LOVE TO HEAR FROM YOU</span>
                <h2 className="contact-details-title">Contact us</h2>
              </div>

              <div className="contact-details-list">
                {/* Address */}
                <div className="contact-detail-row">
                  <div className="contact-detail-icon">
                    <MapPin size={22} strokeWidth={1.5} />
                  </div>
                  <div className="contact-detail-content">
                    <h4 className="contact-detail-label">ADDRESS</h4>
                    <p className="contact-detail-value">
                      70 Washington square south new york, NY 10012, united states
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-detail-row">
                  <div className="contact-detail-icon">
                    <Phone size={22} strokeWidth={1.5} />
                  </div>
                  <div className="contact-detail-content">
                    <h4 className="contact-detail-label">PHONE</h4>
                    <a href="tel:+12345678910" className="contact-detail-value contact-detail-link">
                      +1 234 567 8910
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-detail-row">
                  <div className="contact-detail-icon">
                    <Mail size={22} strokeWidth={1.5} />
                  </div>
                  <div className="contact-detail-content">
                    <h4 className="contact-detail-label">EMAIL</h4>
                    <a href="mailto:info@yourdomain.com" className="contact-detail-value contact-detail-link">
                      info@yourdomain.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Links Row */}
              <div className="contact-social-icons">
                {/* Facebook */}
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="Facebook">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* X (formerly Twitter) */}
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="X (Twitter)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                {/* Pinterest */}
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="Pinterest">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.194-.333 1.36-.053.225-.177.273-.408.165-1.523-.709-2.474-2.934-2.474-4.723 0-3.844 2.793-7.375 8.056-7.375 4.229 0 7.516 3.013 7.516 7.042 0 4.201-2.648 7.584-6.324 7.584-1.235 0-2.396-.642-2.793-1.401l-.76 2.898c-.274 1.056-1.018 2.378-1.517 3.189C9.52 23.834 10.738 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="YouTube">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
