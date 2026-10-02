import React, { useState, useRef, useEffect } from 'react';
import { 
  Search,
  ChevronDown, 
  UserPlus, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { HeaderTopBar } from './header/HeaderTopBar';
import { HeaderDropdownHome } from './header/HeaderDropdownHome';
import { HeaderDropdownShop } from './header/HeaderDropdownShop';
import { HeaderDropdownProducts } from './header/HeaderDropdownProducts';
import { HeaderDropdownPages } from './header/HeaderDropdownPages';
import { JELWO_LOGO_URL } from '../constants/branding';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

type ActiveMenuType = 'home' | 'shop' | 'products' | 'pages' | null;

export type NavbarPageType = 'home' | 'collections' | 'products' | 'product-details' | 'blogs' | 'about' | 'contact' | 'faq' | 'privacy' | 'refund' | 'shipping' | 'terms' | 'location' | 'account' | 'wishlist';

export interface NavbarProps {
  currentPage?: NavbarPageType;
  onNavigate?: (page: NavbarPageType) => void;
  onSelectProduct?: (handle: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home', onNavigate, onSelectProduct }) => {
  const { wishlistCount } = useWishlist();
  const { cartCount, openCart } = useCart();
  const [activeMenu, setActiveMenu] = useState<ActiveMenuType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<ActiveMenuType>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerSearchOpen, setHeaderSearchOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');

  const closeTimeoutRef = useRef<number | null>(null);

  // Clear hover timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Handle scroll state for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: ActiveMenuType) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const handleDropdownMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const toggleMobileAccordion = (menu: ActiveMenuType) => {
    setMobileAccordion((prev) => (prev === menu ? null : menu));
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-sticky' : ''}`}>
      {/* 1. Top Announcement & Utility Bar */}
      <HeaderTopBar />

      {/* 2. Main Navigation Bar */}
      <div className="header-main-bar">
        <div className="container header-main-container">
          {/* Mobile Left: Hamburger Toggle Button (Matches Screenshot 1) */}
          <button
            type="button"
            className="mobile-header-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Logo (Centered on mobile in Screenshot 1) */}
          <a 
            href="/" 
            className="jelwo-brand" 
            aria-label="Jelwo Jewelry Homepage"
            onClick={(e) => {
              e.preventDefault();
              setActiveMenu(null);
              setMobileMenuOpen(false);
              onNavigate?.('home');
            }}
          >
            <img
              src={JELWO_LOGO_URL}
              alt="Jelwo Fine Jewelry"
              className="jelwo-main-logo"
            />
          </a>

          {/* Center Navigation Links */}
          <nav className="header-nav-menu" aria-label="Primary Navigation">
            {/* Home */}
            <div 
              className={`nav-item-wrapper ${activeMenu === 'home' ? 'active' : ''} ${currentPage === 'home' && !activeMenu ? 'current-active' : ''}`}
              onMouseEnter={() => handleMouseEnter('home')}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="/" 
                className="nav-item-link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(null);
                  onNavigate?.('home');
                }}
              >
                <span>Home</span>
                <ChevronDown size={14} className="nav-chevron" />
              </a>
            </div>

            {/* Shop (with SALE badge) */}
            <div 
              className={`nav-item-wrapper ${activeMenu === 'shop' ? 'active' : ''} ${currentPage === 'collections' && !activeMenu ? 'current-active' : ''}`}
              onMouseEnter={() => handleMouseEnter('shop')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="nav-sale-badge">
                <span>SALE</span>
                <div className="nav-sale-badge-tail" />
              </div>
              <a 
                href="/collections" 
                className="nav-item-link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(null);
                  onNavigate?.('collections');
                }}
              >
                <span>Shop</span>
                <ChevronDown size={14} className="nav-chevron" />
              </a>
            </div>

            {/* Products */}
            <div 
              className={`nav-item-wrapper ${activeMenu === 'products' ? 'active' : ''} ${currentPage === 'products' && !activeMenu ? 'current-active' : ''}`}
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="/products" 
                className="nav-item-link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(null);
                  onNavigate?.('products');
                }}
              >
                <span>Products</span>
                <ChevronDown size={14} className="nav-chevron" />
              </a>
            </div>

            {/* Blogs */}
            <div 
              className={`nav-item-wrapper ${currentPage === 'blogs' && !activeMenu ? 'current-active' : ''}`}
            >
              <a 
                href="/blogs" 
                className="nav-item-link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(null);
                  onNavigate?.('blogs');
                }}
              >
                <span>Blogs</span>
              </a>
            </div>

            {/* Pages */}
            <div 
              className={`nav-item-wrapper ${activeMenu === 'pages' ? 'active' : ''} ${(currentPage === 'about' || currentPage === 'contact' || currentPage === 'faq' || currentPage === 'privacy' || currentPage === 'refund' || currentPage === 'shipping' || currentPage === 'terms' || currentPage === 'location') && !activeMenu ? 'current-active' : ''}`}
              onMouseEnter={() => handleMouseEnter('pages')}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#pages" className="nav-item-link">
                <span>Pages</span>
                <ChevronDown size={14} className="nav-chevron" />
              </a>

              {/* Flyout Dropdown for Pages (anchored specifically to Pages) */}
              {activeMenu === 'pages' && (
                <div 
                  className="pages-flyout-container"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <HeaderDropdownPages onNavigate={(page) => {
                    setActiveMenu(null);
                    onNavigate?.(page);
                  }} />
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons */}
          <div className="header-actions">
            {/* Search Button (Visible on screens 600px - 1199px matching Screenshot 2) */}
            <button
              type="button"
              className="header-action-btn header-action-search"
              aria-label="Search store"
              onClick={() => setHeaderSearchOpen(!headerSearchOpen)}
            >
              <Search size={20} strokeWidth={1.6} />
            </button>

            {/* User Account (Desktop & Tablet: visible on >= 600px) */}
            <a 
              href="/account/login" 
              className={`header-action-btn header-action-user ${currentPage === 'account' ? 'current-active' : ''}`} 
              aria-label="User Account"
              onClick={(e) => {
                e.preventDefault();
                setActiveMenu(null);
                onNavigate?.('account');
              }}
            >
              <UserPlus size={20} strokeWidth={1.6} />
            </a>

            {/* Wishlist (Desktop & Tablet: visible on >= 600px) */}
            <a 
              href="/pages/wishlist" 
              className={`header-action-btn header-action-wishlist ${currentPage === 'wishlist' ? 'current-active' : ''}`} 
              aria-label={`Wishlist (${wishlistCount} items)`}
              onClick={(e) => {
                e.preventDefault();
                setActiveMenu(null);
                onNavigate?.('wishlist');
              }}
            >
              <Heart size={20} strokeWidth={1.6} />
              <span className="action-count">({wishlistCount})</span>
            </a>

            {/* Cart (Matches Screenshot 1, 2, 3: 🛍 (count)) */}
            <button
              type="button"
              className="header-action-btn header-action-cart"
              aria-label={`Cart (${cartCount} items)`}
              onClick={(e) => {
                e.preventDefault();
                openCart();
              }}
            >
              <ShoppingBag size={20} strokeWidth={1.6} />
              <span className="action-count">({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Expandable Search Bar for Tablet & Mobile when search icon is clicked */}
        {headerSearchOpen && (
          <div className="header-search-bar-expand">
            <form 
              className="header-search-form-inner"
              onSubmit={(e) => {
                e.preventDefault();
                if (headerSearchQuery.trim()) {
                  console.log('Searching for:', headerSearchQuery);
                }
              }}
            >
              <input
                type="text"
                className="header-search-input-field"
                placeholder="Search our store..."
                autoFocus
                value={headerSearchQuery}
                onChange={(e) => setHeaderSearchQuery(e.target.value)}
              />
              <button type="submit" className="header-search-submit-btn">
                SEARCH
              </button>
              <button 
                type="button" 
                className="header-search-close-btn"
                onClick={() => setHeaderSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}

        {/* Mega Menu Dropdowns (Full-width containers for Home, Shop, and Products) */}
        <div 
          className={`mega-menus-portal ${activeMenu && activeMenu !== 'pages' ? 'is-open' : ''}`}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {activeMenu === 'home' && <HeaderDropdownHome />}
          {activeMenu === 'shop' && (
            <HeaderDropdownShop 
              onSelectProduct={(handle) => {
                setActiveMenu(null);
                onSelectProduct?.(handle);
              }} 
            />
          )}
          {activeMenu === 'products' && (
            <HeaderDropdownProducts 
              onSelectProduct={(handle) => {
                setActiveMenu(null);
                onSelectProduct?.(handle);
              }} 
            />
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay">
          <div className="mobile-nav-drawer">
            <div className="mobile-nav-header">
              <a 
                href="/" 
                className="jelwo-brand" 
                aria-label="Jelwo Jewelry Homepage" 
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  onNavigate?.('home');
                }}
              >
                <img
                  src={JELWO_LOGO_URL}
                  alt="Jelwo Fine Jewelry"
                  className="jelwo-mobile-logo"
                />
              </a>
              <button 
                type="button" 
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Mobile Menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mobile-nav-body">
              {/* Home Accordion */}
              <div className="mobile-nav-accordion-item">
                <div className="mobile-accordion-header-row">
                  <button 
                    type="button" 
                    className="mobile-accordion-direct-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate?.('home');
                    }}
                  >
                    <span>Home</span>
                  </button>
                  <button 
                    type="button" 
                    className="mobile-accordion-toggle-btn"
                    onClick={() => toggleMobileAccordion('home')}
                    aria-label="Toggle Home submenu"
                  >
                    <ChevronDown 
                      size={16} 
                      className={`mobile-acc-arrow ${mobileAccordion === 'home' ? 'rotated' : ''}`} 
                    />
                  </button>
                </div>
                {mobileAccordion === 'home' && (
                  <div className="mobile-accordion-content">
                    <HeaderDropdownHome />
                  </div>
                )}
              </div>

              {/* Shop Accordion */}
              <div className="mobile-nav-accordion-item">
                <div className="mobile-accordion-header-row">
                  <button 
                    type="button" 
                    className="mobile-accordion-direct-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate?.('collections');
                    }}
                  >
                    <span className="mobile-shop-title-wrap">
                      <span>Shop</span>
                      <span className="mobile-sale-tag">SALE</span>
                    </span>
                  </button>
                  <button 
                    type="button" 
                    className="mobile-accordion-toggle-btn"
                    onClick={() => toggleMobileAccordion('shop')}
                    aria-label="Toggle Shop categories"
                  >
                    <ChevronDown 
                      size={16} 
                      className={`mobile-acc-arrow ${mobileAccordion === 'shop' ? 'rotated' : ''}`} 
                    />
                  </button>
                </div>
                {mobileAccordion === 'shop' && (
                  <div className="mobile-accordion-content">
                    <HeaderDropdownShop 
                      onSelectProduct={(handle) => {
                        setMobileMenuOpen(false);
                        onSelectProduct?.(handle);
                      }} 
                    />
                  </div>
                )}
              </div>

              {/* Products Accordion */}
              <div className="mobile-nav-accordion-item">
                <div className="mobile-accordion-header-row">
                  <button 
                    type="button" 
                    className="mobile-accordion-direct-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate?.('products');
                    }}
                  >
                    <span>Products</span>
                  </button>
                  <button 
                    type="button" 
                    className="mobile-accordion-toggle-btn"
                    onClick={() => toggleMobileAccordion('products')}
                    aria-label="Toggle Products dropdown"
                  >
                    <ChevronDown 
                      size={16} 
                      className={`mobile-acc-arrow ${mobileAccordion === 'products' ? 'rotated' : ''}`} 
                    />
                  </button>
                </div>
                {mobileAccordion === 'products' && (
                  <div className="mobile-accordion-content">
                    <HeaderDropdownProducts 
                      onSelectProduct={(handle) => {
                        setMobileMenuOpen(false);
                        onSelectProduct?.(handle);
                      }} 
                    />
                  </div>
                )}
              </div>

              {/* Blogs Link */}
              <div className="mobile-nav-accordion-item">
                <button 
                  type="button" 
                  className="mobile-accordion-header mobile-direct-link"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate?.('blogs');
                  }}
                  style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', font: 'inherit', padding: '14px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <span>Blogs</span>
                </button>
              </div>

              {/* Wishlist Link */}
              <div className="mobile-nav-accordion-item">
                <button 
                  type="button" 
                  className="mobile-accordion-header mobile-direct-link"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate?.('wishlist');
                  }}
                  style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', font: 'inherit', padding: '14px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <span>Wishlist</span>
                  <span style={{ fontSize: '12px', background: '#c86542', color: '#fff', borderRadius: '10px', padding: '2px 8px', fontWeight: 600 }}>{wishlistCount}</span>
                </button>
              </div>

              {/* Pages Accordion */}
              <div className="mobile-nav-accordion-item">
                <button 
                  type="button" 
                  className="mobile-accordion-header"
                  onClick={() => toggleMobileAccordion('pages')}
                >
                  <span>Pages</span>
                  <ChevronDown 
                    size={16} 
                    className={`mobile-acc-arrow ${mobileAccordion === 'pages' ? 'rotated' : ''}`} 
                  />
                </button>
                {mobileAccordion === 'pages' && (
                  <div className="mobile-accordion-content">
                    <HeaderDropdownPages onNavigate={(page) => {
                      setMobileMenuOpen(false);
                      onNavigate?.(page);
                    }} />
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Footer Utilities */}
            <div className="mobile-drawer-footer">
              <a href="#try-at-home" className="mobile-util-link">
                <span>Free try at home</span>
                <ChevronRight size={16} />
              </a>
              <a 
                href="/account/login" 
                className="mobile-util-link"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  onNavigate?.('account');
                }}
              >
                <span>My Account</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
