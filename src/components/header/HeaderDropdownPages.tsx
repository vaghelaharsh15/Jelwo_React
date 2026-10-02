import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SubPageItem {
  title: string;
  link: string;
}

interface PageItem {
  title: string;
  link: string;
  hasChevron?: boolean;
  subItems?: SubPageItem[];
}

const PAGE_ITEMS: PageItem[] = [
  { 
    title: 'About us', 
    link: '/pages/about-us', 
    hasChevron: true,
    subItems: [
      { title: 'About us', link: '/pages/about-us' },
      { title: 'About us 2' , link: '/pages/about-us'}
    ]
  },
  { 
    title: 'Contact', 
    link: '/pages/contact-1', 
    hasChevron: true,
    subItems: [
      { title: 'Contact 1', link: '/pages/contact-1' },
      { title: 'Contact 2', link: 'pages/contact-1'}
    ]
  },
  { title: "Faq's", link: '/pages/faq' },
  { title: 'Privacy policy', link: '/pages/privacy-policy' },
  { title: 'Refund policy', link: '/pages/refund-policy' },
  { title: 'Store location', link: '/pages/store-location' },
  { title: 'Shipping & return', link: '/pages/shipping-return' },
  { title: 'Terms & condition', link: '/pages/terms-condition' }
];

export interface HeaderDropdownPagesProps {
  onNavigate?: (page: 'about' | 'contact' | 'faq' | 'privacy' | 'refund' | 'shipping' | 'terms' | 'location') => void;
}

export const HeaderDropdownPages: React.FC<HeaderDropdownPagesProps> = ({ onNavigate }) => {
  const handleItemClick = (e: React.MouseEvent, title: string, _link?: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (title === 'About us' || title === 'About us 1') {
      if (onNavigate) {
        onNavigate('about');
      } else {
        window.history.pushState({ page: 'about' }, '', '/pages/about-us');
        window.dispatchEvent(new Event('popstate'));
      }
    } else if (title === 'Contact' || title === 'Contact 1') {
      if (onNavigate) {
        onNavigate('contact');
      } else {
        window.history.pushState({ page: 'contact' }, '', '/pages/contact-1');
        window.dispatchEvent(new Event('popstate'));
      }
    } else if (title === "Faq's" || title === 'Faq' || title === 'FAQs') {
      if (onNavigate) {
        onNavigate('faq');
      } else {
        window.history.pushState({ page: 'faq' }, '', '/pages/faq');
        window.dispatchEvent(new Event('popstate'));
      }
    } else if (title === 'Privacy policy' || title === 'Privacy Policy') {
      if (onNavigate) {
        onNavigate('privacy');
      } else {
        window.history.pushState({ page: 'privacy' }, '', '/pages/privacy-policy');
        window.dispatchEvent(new Event('popstate'));
      }
    } else if (title === 'Refund policy' || title === 'Refund Policy') {
      if (onNavigate) {
        onNavigate('refund');
      } else {
        window.history.pushState({ page: 'refund' }, '', '/pages/refund-policy');
        window.dispatchEvent(new Event('popstate'));
      }
    } else if (title === 'Shipping & return' || title === 'Shipping & Return') {
      if (onNavigate) {
        onNavigate('shipping');
      } else {
        window.history.pushState({ page: 'shipping' }, '', '/pages/shipping-return');
        window.dispatchEvent(new Event('popstate'));
      }
    } else if (
      title === 'Terms & condition' ||
      title === 'Terms & Condition' ||
      title === 'Terms & conditions' ||
      title === 'Terms and Conditions'
    ) {
      if (onNavigate) {
        onNavigate('terms');
      } else {
        window.history.pushState({ page: 'terms' }, '', '/pages/terms-condition');
        window.dispatchEvent(new Event('popstate'));
      }
    } else if (
      title === 'Store location' ||
      title === 'Store Location' ||
      title === 'Store locations' ||
      title === 'Store Locations'
    ) {
      if (onNavigate) {
        onNavigate('location');
      } else {
        window.history.pushState({ page: 'location' }, '', '/pages/store-location');
        window.dispatchEvent(new Event('popstate'));
      }
    }
  };

  return (
    <div className="flyout-dropdown flyout-dropdown-pages">
      <ul className="flyout-list">
        {PAGE_ITEMS.map((item, idx) => (
          <li key={idx} className={`flyout-item ${item.subItems ? 'has-sub-items' : ''}`}>
            <a 
              href={item.link} 
              className="flyout-link"
              onClick={(e) => handleItemClick(e, item.title, item.link)}
            >
              <span className="flyout-title">{item.title}</span>
              {item.hasChevron && (
                <ChevronRight size={15} className="flyout-chevron" />
              )}
            </a>

            {/* Nested Submenu (e.g. Contact -> Contact 1) */}
            {item.subItems && item.subItems.length > 0 && (
              <div className="flyout-sub-menu">
                <ul className="flyout-list">
                  {item.subItems.map((sub, sIdx) => (
                    <li key={sIdx} className="flyout-item">
                      <a
                        href={sub.link}
                        className="flyout-link flyout-sub-link"
                        onClick={(e) => handleItemClick(e, sub.title, sub.link)}
                      >
                        <span className="flyout-title">{sub.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
