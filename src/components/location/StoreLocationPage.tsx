import React, { useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import './StoreLocationPage.css';

interface StoreLocationPageProps {
  onNavigateHome?: () => void;
}

// Background image matching Jelwo's breadcrumb hero banner
const LOCATION_BREADCRUMB_BG = 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-breadcrumb.jpg?v=1742473987&width=1920';

interface StoreItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
}

const STORE_LOCATIONS: StoreItem[] = [
  {
    id: 'valsone-shop',
    name: 'Valsone shop',
    image: 'https://jelwo.myshopify.com/cdn/shop/files/Valsone-shop.jpg?v=1741696989&width=1024',
    alt: 'Valsone shop jewelry store',
    phone: '+999 3222 000 388',
    email: 'store@domain.com',
    address: '27 Eden walk eden centre, Broadway, United States',
    hours: 'Mon - Fri : 9:00am - 6:00pm'
  },
  {
    id: 'melbourne-place',
    name: 'Melbourne place',
    image: 'https://jelwo.myshopify.com/cdn/shop/files/Melbourne-place.jpg?v=1741696988&width=1024',
    alt: 'Melbourne place jewelry store',
    phone: '+999 3222 000 388',
    email: 'store@domain.com',
    address: '27 Eden walk eden centre, Broadway, United States',
    hours: 'Mon - Fri : 9:00am - 6:00pm'
  },
  {
    id: 'ansolt-park',
    name: 'Ansolt park',
    image: 'https://jelwo.myshopify.com/cdn/shop/files/Ansolt-park.jpg?v=1741696988&width=1024',
    alt: 'Ansolt park jewelry store',
    phone: '+999 3222 000 388',
    email: 'store@domain.com',
    address: '27 Eden walk eden centre,',
    hours: 'Mon - Fri : 9:00am - 6:00pm'
  }
];

export const StoreLocationPage: React.FC<StoreLocationPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Store location - Jelwo Fine Jewelry';
    return () => {
      document.title = "Jelwo - World's Best Fine Jewelry";
    };
  }, []);

  return (
    <div className="store-location-page-root">
      {/* 1. Breadcrumb Hero Banner Section */}
      <section className="store-breadcrumb-area" aria-label="Store Location Banner">
        <img
          src={LOCATION_BREADCRUMB_BG}
          alt="Store Location Breadcrumb Background"
          className="store-breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="store-breadcrumb-tint" />
        <div className="store-breadcrumb-index">
          <ul className="store-breadcrumb-list">
            <li className="store-breadcrumb-item">
              <button
                type="button"
                className="store-breadcrumb-btn"
                onClick={onNavigateHome}
              >
                HOME
              </button>
            </li>
            <li className="store-breadcrumb-separator" aria-hidden="true">-</li>
            <li className="store-breadcrumb-item">
              <span className="store-breadcrumb-current">STORE LOCATION</span>
            </li>
          </ul>

          <div className="store-breadcrumb-title">
            <h1>Store location</h1>
          </div>
        </div>
      </section>

      {/* 2. Main Store Location Sections */}
      <section 
        className="store-location" 
        style={{
          '--padding-top': '80px',
          '--padding-bottom': '80px',
          '--padding-top-ipad': '80px',
          '--padding-bottom-ipad': '80px',
          '--padding-top-xs': '60px',
          '--padding-bottom-xs': '60px'
        } as React.CSSProperties}
        aria-label="Jelwo Store Locations"
      >
        <div className="container store-container">
          {STORE_LOCATIONS.map((store, index) => (
            <div key={store.id} className="store-content">
              <div className={`contact-content ${index % 2 === 1 ? 'is-reversed' : ''}`}>
                {/* Image Section */}
                <div className="contact-detail image-warp">
                  <div className="contact-img-wrap banner-hover">
                    <img 
                      src={store.image} 
                      alt={store.alt} 
                      width="701" 
                      height="622" 
                      loading="lazy" 
                      className="store-featured-img"
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="contact-detail get-info">
                  <div className="store-info">
                    <div className="section-title">
                      <h2 className="store-shop-title mr-0">{store.name}</h2>
                    </div>

                    <ul className="info_wrap list-unstyled">
                      {/* Let's Talk */}
                      <li className="info_wrapper">
                        <div className="info-block">
                          <div className="icon">
                            <Phone size={19} strokeWidth={1.8} className="store-info-icon" />
                          </div>
                          <div className="text-block">
                            <span>LET'S TALK</span>
                            <a href={`tel:${store.phone.replace(/\s+/g, '')}`}>{store.phone}</a>
                          </div>
                        </div>
                      </li>

                      {/* Say Hi! */}
                      <li className="info_wrapper">
                        <div className="info-block">
                          <div className="icon">
                            <Mail size={19} strokeWidth={1.8} className="store-info-icon" />
                          </div>
                          <div className="text-block">
                            <span>SAY HI!</span>
                            <a href={`mailto:${store.email}`}>{store.email}</a>
                          </div>
                        </div>
                      </li>

                      {/* Store Address */}
                      <li className="info_wrapper">
                        <div className="info-block">
                          <div className="icon">
                            <MapPin size={19} strokeWidth={1.8} className="store-info-icon" />
                          </div>
                          <div className="text-block">
                            <span>STORE ADDRESS</span>
                            <p className="mr-0">{store.address}</p>
                          </div>
                        </div>
                      </li>

                      {/* Opening Hours */}
                      <li className="info_wrapper">
                        <div className="info-block">
                          <div className="icon">
                            <Clock size={19} strokeWidth={1.8} className="store-info-icon" />
                          </div>
                          <div className="text-block">
                            <span>OPENING HOURS</span>
                            <p className="mr-0">{store.hours}</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
