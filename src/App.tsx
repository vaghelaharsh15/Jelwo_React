import { useState, useEffect } from 'react';
import { Navbar, type NavbarPageType } from './components/Navbar';
import { CollectionsPage } from './components/collections/CollectionsPage';
import { ProductsPage } from './components/products/ProductsPage';
import { ProductDetailsPage } from './components/product/ProductDetailsPage';
import { BlogPage } from './components/blogs/BlogPage';
import { AboutUsPage } from './components/about/AboutUsPage';
import { JewelryHeroBanner } from './components/home/JewelryHeroBanner';
import { ShopByCategory } from './components/home/ShopByCategory';
import { JewelryPromoBanners } from './components/home/JewelryPromoBanners';
import { JewelryProductGrid } from './components/home/JewelryProductGrid';
import { LuxuryEditorialSection } from './components/home/LuxuryEditorialSection';
import { BrandLogosCarousel } from './components/home/BrandLogosCarousel';
import { JewelryReelsSlider } from './components/home/JewelryReelsSlider';
import { PopularProductsSection } from './components/home/PopularProductsSection';
import { NewsAndEventsSection } from './components/home/NewsAndEventsSection';
import { InstagramSection } from './components/home/InstagramSection';
import { ContactPage } from './components/contact/ContactPage';
import { FaqPage } from './components/faq/FaqPage';
import { PrivacyPolicyPage } from './components/privacy/PrivacyPolicyPage';
import { RefundPolicyPage } from './components/refund/RefundPolicyPage';
import { ShippingReturnPage } from './components/shipping/ShippingReturnPage';
import { TermsConditionPage } from './components/terms/TermsConditionPage';
import { StoreLocationPage } from './components/location/StoreLocationPage';
import { LoginPage } from './components/account/LoginPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickAddModal } from './components/cart/QuickAddModal';
import { resolveCategoryTitle } from './data/productsData';
import './App.css';

export type AppPageType = NavbarPageType;

function parseProductDetailPath(pathname: string, hash: string): string | null {
  const path = pathname.toLowerCase();
  const h = hash.toLowerCase();

  if (path.includes('/products/')) {
    const parts = path.split('/products/');
    if (parts[1]) {
      const handle = parts[1].split('/')[0].split('?')[0];
      if (handle) return handle;
    }
  }
  if (h.includes('/products/')) {
    const parts = h.split('/products/');
    if (parts[1]) {
      const handle = parts[1].split('/')[0].split('?')[0];
      if (handle) return handle;
    }
  }
  return null;
}

export function App() {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (
        path.startsWith('/collections/') &&
        path !== '/collections' &&
        path !== '/collections/' &&
        path !== '/collections/all'
      ) {
        const slug = path.replace('/collections/', '').split('/')[0].split('?')[0];
        return resolveCategoryTitle(slug) || slug;
      }
    }
    return null;
  });

  const [currentProductHandle, setCurrentProductHandle] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const matched = parseProductDetailPath(window.location.pathname, window.location.hash);
      if (matched) return matched;
    }
    return 'rose-gold-rings';
  });

  const [currentPage, setCurrentPage] = useState<AppPageType>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      // Check if it is a product details page URL first
      const productHandle = parseProductDetailPath(path, hash);
      if (productHandle) {
        return 'product-details';
      }

      if (
        path === '/account' ||
        path === '/account/login' ||
        path === '/login' ||
        path === '/pages/login' ||
        path === '/pages/account' ||
        hash === '#account' ||
        hash === '#login' ||
        hash === '#/account' ||
        hash === '#/login'
      ) {
        return 'account';
      } else if (
        path === '/store-location' ||
        path === '/store-locations' ||
        path === '/pages/store-location' ||
        path === '/pages/store-locations' ||
        path.startsWith('/pages/store-location') ||
        hash === '#store-location' ||
        hash === '#store-locations' ||
        hash === '#/store-location' ||
        hash === '#/store-locations'
      ) {
        return 'location';
      } else if (
        path === '/terms' ||
        path === '/terms-condition' ||
        path === '/terms-conditions' ||
        path === '/terms-and-condition' ||
        path === '/terms-and-conditions' ||
        path === '/pages/terms' ||
        path === '/pages/terms-condition' ||
        path === '/pages/terms-conditions' ||
        path === '/pages/terms-and-condition' ||
        path === '/pages/terms-and-conditions' ||
        path.startsWith('/pages/terms') ||
        hash === '#terms' ||
        hash === '#terms-condition' ||
        hash === '#terms-conditions' ||
        hash === '#/terms' ||
        hash === '#/terms-condition'
      ) {
        return 'terms';
      } else if (
        path === '/shipping' ||
        path === '/shipping-return' ||
        path === '/shipping-and-return' ||
        path === '/pages/shipping' ||
        path === '/pages/shipping-return' ||
        path === '/pages/shipping-and-return' ||
        path.startsWith('/pages/shipping') ||
        hash === '#shipping' ||
        hash === '#shipping-return' ||
        hash === '#/shipping' ||
        hash === '#/shipping-return'
      ) {
        return 'shipping';
      } else if (
        path === '/refund' ||
        path === '/refund-policy' ||
        path === '/pages/refund' ||
        path === '/pages/refund-policy' ||
        path.startsWith('/pages/refund') ||
        hash === '#refund' ||
        hash === '#refund-policy' ||
        hash === '#/refund' ||
        hash === '#/refund-policy'
      ) {
        return 'refund';
      } else if (
        path === '/privacy' ||
        path === '/privacy-policy' ||
        path === '/pages/privacy' ||
        path === '/pages/privacy-policy' ||
        path.startsWith('/pages/privacy') ||
        hash === '#privacy' ||
        hash === '#privacy-policy' ||
        hash === '#/privacy' ||
        hash === '#/privacy-policy'
      ) {
        return 'privacy';
      } else if (
        path === '/faq' ||
        path === '/faqs' ||
        path === '/pages/faq' ||
        path === '/pages/faqs' ||
        path.startsWith('/pages/faq') ||
        hash === '#faq' ||
        hash === '#faqs' ||
        hash === '#/faq' ||
        hash === '#/faqs'
      ) {
        return 'faq';
      } else if (
        path === '/contact' ||
        path === '/contact-1' ||
        path === '/pages/contact' ||
        path === '/pages/contact-1' ||
        path.startsWith('/pages/contact') ||
        hash === '#contact' ||
        hash === '#contact-us' ||
        hash === '#contact-1' ||
        hash === '#/contact'
      ) {
        return 'contact';
      } else if (
        path === '/about' ||
        path === '/pages/about-us' ||
        path.startsWith('/pages/about') ||
        hash === '#about' ||
        hash === '#about-us' ||
        hash === '#/about'
      ) {
        return 'about';
      } else if (
        path === '/blogs' ||
        path.startsWith('/blogs/') ||
        path === '/news' ||
        hash === '#blogs' ||
        hash === '#/blogs' ||
        hash === '#news'
      ) {
        return 'blogs';
      } else if (
        path === '/products' ||
        path === '/collections/all' ||
        hash === '#products' ||
        hash === '#/products' ||
        (path.startsWith('/collections/') &&
          path !== '/collections' &&
          path !== '/collections/' &&
          path !== '/collections/all')
      ) {
        return 'products';
      } else if (
        path === '/collections' ||
        path === '/collections/' ||
        hash === '#collections' ||
        hash === '#/collections' ||
        hash === '#shop'
      ) {
        return 'collections';
      } else if (
        path === '/wishlist' ||
        path === '/pages/wishlist' ||
        hash === '#wishlist' ||
        hash === '#/wishlist'
      ) {
        return 'wishlist';
      }
    }
    return 'home';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      // Check if it is a product details page URL
      const productHandle = parseProductDetailPath(path, hash);
      if (productHandle) {
        setCurrentProductHandle(productHandle);
        setCurrentPage('product-details');
        return;
      }

      if (
        path === '/account' ||
        path === '/account/login' ||
        path === '/login' ||
        path === '/pages/login' ||
        path === '/pages/account' ||
        hash === '#account' ||
        hash === '#login' ||
        hash === '#/account' ||
        hash === '#/login'
      ) {
        setCurrentPage('account');
      } else if (
        path === '/store-location' ||
        path === '/store-locations' ||
        path === '/pages/store-location' ||
        path === '/pages/store-locations' ||
        path.startsWith('/pages/store-location') ||
        hash === '#store-location' ||
        hash === '#store-locations' ||
        hash === '#/store-location' ||
        hash === '#/store-locations'
      ) {
        setCurrentPage('location');
      } else if (
        path === '/terms' ||
        path === '/terms-condition' ||
        path === '/terms-conditions' ||
        path === '/terms-and-condition' ||
        path === '/terms-and-conditions' ||
        path === '/pages/terms' ||
        path === '/pages/terms-condition' ||
        path === '/pages/terms-conditions' ||
        path === '/pages/terms-and-condition' ||
        path === '/pages/terms-and-conditions' ||
        path.startsWith('/pages/terms') ||
        hash === '#terms' ||
        hash === '#terms-condition' ||
        hash === '#terms-conditions' ||
        hash === '#/terms' ||
        hash === '#/terms-condition'
      ) {
        setCurrentPage('terms');
      } else if (
        path === '/shipping' ||
        path === '/shipping-return' ||
        path === '/shipping-and-return' ||
        path === '/pages/shipping' ||
        path === '/pages/shipping-return' ||
        path === '/pages/shipping-and-return' ||
        path.startsWith('/pages/shipping') ||
        hash === '#shipping' ||
        hash === '#shipping-return' ||
        hash === '#/shipping' ||
        hash === '#/shipping-return'
      ) {
        setCurrentPage('shipping');
      } else if (
        path === '/refund' ||
        path === '/refund-policy' ||
        path === '/pages/refund' ||
        path === '/pages/refund-policy' ||
        path.startsWith('/pages/refund') ||
        hash === '#refund' ||
        hash === '#refund-policy' ||
        hash === '#/refund' ||
        hash === '#/refund-policy'
      ) {
        setCurrentPage('refund');
      } else if (
        path === '/privacy' ||
        path === '/privacy-policy' ||
        path === '/pages/privacy' ||
        path === '/pages/privacy-policy' ||
        path.startsWith('/pages/privacy') ||
        hash === '#privacy' ||
        hash === '#privacy-policy' ||
        hash === '#/privacy' ||
        hash === '#/privacy-policy'
      ) {
        setCurrentPage('privacy');
      } else if (
        path === '/faq' ||
        path === '/faqs' ||
        path === '/pages/faq' ||
        path === '/pages/faqs' ||
        path.startsWith('/pages/faq') ||
        hash === '#faq' ||
        hash === '#faqs' ||
        hash === '#/faq' ||
        hash === '#/faqs'
      ) {
        setCurrentPage('faq');
      } else if (
        path === '/contact' ||
        path === '/contact-1' ||
        path === '/pages/contact' ||
        path === '/pages/contact-1' ||
        path.startsWith('/pages/contact') ||
        hash === '#contact' ||
        hash === '#contact-us' ||
        hash === '#contact-1' ||
        hash === '#/contact'
      ) {
        setCurrentPage('contact');
      } else if (
        path === '/about' ||
        path === '/pages/about-us' ||
        path.startsWith('/pages/about') ||
        hash === '#about' ||
        hash === '#about-us' ||
        hash === '#/about'
      ) {
        setCurrentPage('about');
      } else if (
        path === '/blogs' ||
        path.startsWith('/blogs/') ||
        path === '/news' ||
        hash === '#blogs' ||
        hash === '#/blogs' ||
        hash === '#news'
      ) {
        setCurrentPage('blogs');
      } else if (
        path.startsWith('/collections/') &&
        path !== '/collections' &&
        path !== '/collections/' &&
        path !== '/collections/all'
      ) {
        const slug = path.replace('/collections/', '').split('/')[0].split('?')[0];
        const resolved = resolveCategoryTitle(slug) || slug;
        setSelectedCategoryFilter(resolved);
        setCurrentPage('products');
      } else if (
        path === '/products' ||
        path === '/collections/all' ||
        hash === '#products' ||
        hash === '#/products'
      ) {
        setCurrentPage('products');
      } else if (
        path === '/collections' ||
        path === '/collections/' ||
        hash === '#collections' ||
        hash === '#/collections' ||
        hash === '#shop'
      ) {
        setSelectedCategoryFilter(null);
        setCurrentPage('collections');
      } else if (
        path === '/wishlist' ||
        path === '/pages/wishlist' ||
        hash === '#wishlist' ||
        hash === '#/wishlist'
      ) {
        setCurrentPage('wishlist');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleSelectProduct = (handleOrId: string) => {
    const clean = handleOrId
      .replace(/^\/products\//, '')
      .replace(/^\/collections\/[^/]+\/products\//, '')
      .split('?')[0]
      .split('#')[0]
      .replace(/\/$/, '');

    const resolvedHandle = clean || 'rose-gold-rings';
    setCurrentProductHandle(resolvedHandle);
    setCurrentPage('product-details');

    const targetPath = `/products/${resolvedHandle}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page: 'product-details', handle: resolvedHandle }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCollection = (collectionIdOrTitle: string) => {
    const resolved = resolveCategoryTitle(collectionIdOrTitle) || collectionIdOrTitle;
    setSelectedCategoryFilter(resolved);
    setCurrentPage('products');

    const cleanSlug = collectionIdOrTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const targetPath = `/collections/${cleanSlug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page: 'products', category: resolved }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Intercept global link clicks targeting products and collections
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      if (
        href.includes('/products/') &&
        !href.endsWith('/products') &&
        !href.endsWith('/products/')
      ) {
        e.preventDefault();
        const parts = href.split('/products/');
        if (parts[1]) {
          const handle = parts[1].split('?')[0].split('#')[0].replace(/\/$/, '');
          if (handle) {
            handleSelectProduct(handle);
          }
        }
      } else if (
        href.startsWith('/collections/') &&
        href !== '/collections' &&
        href !== '/collections/' &&
        href !== '/collections/all'
      ) {
        e.preventDefault();
        const slug = href.replace('/collections/', '').split('?')[0].split('#')[0].replace(/\/$/, '');
        if (slug) {
          handleSelectCollection(slug);
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleNavigate = (page: AppPageType) => {
    if (page === 'products' || page === 'collections') {
      setSelectedCategoryFilter(null);
    }
    setCurrentPage(page);
    let targetPath = '/';
    if (page === 'collections') targetPath = '/collections';
    if (page === 'products') targetPath = '/products';
    if (page === 'product-details') targetPath = `/products/${currentProductHandle || 'rose-gold-rings'}`;
    if (page === 'blogs') targetPath = '/blogs';
    if (page === 'about') targetPath = '/pages/about-us';
    if (page === 'contact') targetPath = '/pages/contact-1';
    if (page === 'faq') targetPath = '/pages/faq';
    if (page === 'privacy') targetPath = '/pages/privacy-policy';
    if (page === 'refund') targetPath = '/pages/refund-policy';
    if (page === 'shipping') targetPath = '/pages/shipping-return';
    if (page === 'terms') targetPath = '/pages/terms-condition';
    if (page === 'location') targetPath = '/pages/store-location';
    if (page === 'account') targetPath = '/account/login';
    if (page === 'wishlist') targetPath = '/pages/wishlist';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      {/* 1. Full-Width Luxury Header with Mega Dropdowns & Active Page Navigation */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Content Area */}
      <main id="main-content" className="app-main">
        {currentPage === 'product-details' ? (
          /* Product Details Page (Matches User's Screenshots 1 to 5 and Provided HTML) */
          <ProductDetailsPage
            productIdentifier={currentProductHandle}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateShop={() => handleNavigate('collections')}
            onSelectProduct={handleSelectProduct}
          />
        ) : currentPage === 'wishlist' ? (
          /* Wishlist Page (Matches User's Screenshot) */
          <WishlistPage
            onNavigateHome={() => handleNavigate('home')}
            onNavigateShop={() => handleNavigate('products')}
            onSelectProduct={handleSelectProduct}
          />
        ) : currentPage === 'account' ? (
          /* Sign In / Account Login Page */
          <LoginPage onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'location' ? (
          /* Store Location Page */
          <StoreLocationPage onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'terms' ? (
          /* Terms & Condition Page */
          <TermsConditionPage onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'shipping' ? (
          /* Shipping & Return Page */
          <ShippingReturnPage onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'refund' ? (
          /* Refund Policy Page */
          <RefundPolicyPage onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'privacy' ? (
          /* Privacy Policy Page */
          <PrivacyPolicyPage onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'faq' ? (
          /* FAQ Page */
          <FaqPage onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'contact' ? (
          /* Contact 1 Page */
          <ContactPage onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'about' ? (
          /* About Us Page */
          <AboutUsPage onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'blogs' ? (
          /* Blog / News Page */
          <BlogPage onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'products' ? (
          /* Products Catalog Page */
          <ProductsPage 
            onNavigateHome={() => handleNavigate('home')} 
            onSelectProduct={handleSelectProduct}
            initialCategory={selectedCategoryFilter}
            onClearInitialCategory={() => setSelectedCategoryFilter(null)}
          />
        ) : currentPage === 'collections' ? (
          /* Collections Page */
          <CollectionsPage 
            onNavigateHome={() => handleNavigate('home')} 
            onSelectCollection={handleSelectCollection}
          />
        ) : (
          /* Main Home Sections in Exact Sequence */
          <>
            {/* 2. Full-Width Hero Slider Banner ("World's best jewelrys") */}
            <JewelryHeroBanner />

            {/* 3. Shop by Category ("JEWELRY COLLECTION" with 5 circular category cards) */}
            <ShopByCategory onSelectCategory={handleSelectCollection} />

            {/* 4. 3 Feature Promo Banners ("Luxury to your look", "Happiness of women", "Everyday's luxuries") */}
            <JewelryPromoBanners />

            {/* 5. Great Selection Product Grid */}
            <JewelryProductGrid onSelectProduct={handleSelectProduct} />

            {/* 6. Luxury Editorial Section */}
            <LuxuryEditorialSection />

            {/* 7. Brand Partners Swiper Carousel */}
            <BrandLogosCarousel />

            {/* 8. Hot Picks Reels Video Slider Carousel */}
            <JewelryReelsSlider onSelectProduct={handleSelectProduct} />

            {/* 9. Popular Product Collection Section */}
            <PopularProductsSection onSelectProduct={handleSelectProduct} />

            {/* 10. News and Events Blog Carousel Section */}
            <NewsAndEventsSection />

            {/* 11. Social Media Follow Instagram Carousel Section */}
            <InstagramSection />
          </>
        )}
      </main>

      {/* Luxury Fine Jewelry Footer */}
      <Footer 
        showTrustStrip={currentPage === 'home'} 
        onNavigate={handleNavigate} 
      />

      {/* Shopping Cart Drawer (Matches Screenshots 1, 2, 3) */}
      <CartDrawer />

      {/* Product Quick View / Quick Add Modal (Matches Screenshot 4) */}
      <QuickAddModal />
    </div>
  );
}

export default App;
