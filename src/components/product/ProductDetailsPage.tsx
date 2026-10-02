import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Heart, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Plus, 
  FileText, 
  Edit3, 
  Share2, 
  MapPin, 
  RotateCcw, 
  DollarSign, 
  X, 
  Check, 
  Send,
  ShoppingBag,
  Eye
} from 'lucide-react';
import { getProductDetail, type ProductDetailInfo } from '../../data/productDetailsData';
import productsJson from '../../data/products.json';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './ProductDetailsPage.css';

interface ProductDetailsPageProps {
  productIdentifier?: string | null;
  onNavigateHome?: () => void;
  onNavigateShop?: () => void;
  onSelectProduct?: (handleOrId: string) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  productIdentifier = 'rose-gold-rings',
  onNavigateHome,
  onNavigateShop,
  onSelectProduct
}) => {
  const { isWishlisted: checkWishlist, toggleWishlist } = useWishlist();
  const { addToCart, openQuickAdd } = useCart();
  // Stable memoized Product Data - only recomputes when productIdentifier changes
  const product: ProductDetailInfo = useMemo(() => {
    return getProductDetail(productIdentifier);
  }, [productIdentifier]);

  // States
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '28');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Gold');
  const [quantity, setQuantity] = useState<number>(1);
  const isWishlisted = checkWishlist(product.id) || checkWishlist(product.handle);

  // Accordion active tab
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    description: true,
    additional: false,
    returnPolicies: false,
    review: false
  });

  // Sticky bottom bar visibility
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);

  // Modals
  const [activeModal, setActiveModal] = useState<'sizeguide' | 'question' | 'share' | null>(null);
  const [questionSubmitted, setQuestionSubmitted] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Urgency Countdown Timer (ticks every second)
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 1430,
    hours: 14,
    minutes: 12,
    seconds: 40
  });

  const zoomContainerRef = useRef<HTMLDivElement>(null);

  // Reset product state ONLY when user navigates to a different product
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedSize(product.sizes[0] || '28');
    setSelectedColor(product.colors[0]?.name || 'Gold');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${product.title} - Jelwo Fine Jewelry`;
  }, [productIdentifier]);

  // Urgency Timer interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sticky Bar Scroll Listener (debounced with requestAnimationFrame)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowStickyBar(window.scrollY > 600);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Variant matching
  const currentVariant = product.variants.find(
    (v) => v.size === selectedSize && v.color.toLowerCase() === selectedColor.toLowerCase()
  ) || product.variants[0];

  const displayPrice = currentVariant ? currentVariant.price : product.price;
  const displayOldPrice = currentVariant ? currentVariant.compareAtPrice : product.oldPrice;

  // Zoom Handler (exact calculation from user script: zoom(event))
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomContainerRef.current) return;
    const rect = zoomContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  // Image Navigation
  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  // Size click: also switches featured image per user's json variant table
  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    if (size === '28') setActiveImageIndex(0);
    else if (size === '29') setActiveImageIndex(Math.min(4, product.images.length - 1));
    else if (size === '30') setActiveImageIndex(Math.min(2, product.images.length - 1));
  };

  // Color click
  const handleSelectColor = (colorName: string) => {
    setSelectedColor(colorName);
  };

  // Accordion toggle
  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Toast trigger
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add to cart handler
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      handle: product.handle,
      title: product.title.toUpperCase(),
      price: product.price,
      rawPrice: product.rawPrice,
      image: product.images[activeImageIndex] || product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    });
  };

  const handleBuyItNow = () => {
    handleAddToCart();
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  // Recommended products matching Screenshots 2 & 3
  const recommendedProducts = useMemo(() => {
    const targetHandles = ['diamond-rings', 'drop-earrings', 'floral-gold-bangle', 'flower-jhumka'];
    
    // Pick the target items first, filtering out the currently viewed product
    let list = targetHandles
      .map((handle) => productsJson.find((p) => p.handle === handle))
      .filter((p): p is (typeof productsJson)[0] => p !== undefined && p.handle !== product.handle);

    // If viewing one of the target handles, fill with another product to always show 4 cards
    if (list.length < 4) {
      const fillers = productsJson.filter(
        (p) => p.handle !== product.handle && !list.some((item) => item.handle === p.handle)
      );
      list = [...list, ...fillers].slice(0, 4);
    }
    return list;
  }, [product.handle]);

  const activeImageSrc = product.images[activeImageIndex] || product.images[0];

  return (
    <div className="product-details-page-root">
      {/* 1. Breadcrumb Bar (Matches Screenshot 1: Home / Product Title) */}
      <section className="pro-breadcrumb-bar" aria-label="Breadcrumb Navigation">
        <div className="pro-breadcrumb-container">
          <nav className="pro-breadcrumb-nav">
            <button 
              type="button" 
              className="pro-breadcrumb-link"
              onClick={onNavigateHome}
            >
              Home
            </button>
            <span className="pro-breadcrumb-sep">/</span>
            <span className="pro-breadcrumb-current">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* 2. Main Two-Column Product Hero Section (Matches Screenshot 1 & 2) */}
      <section className="pro-main-section" aria-label="Product Showcase">
        <div className="pro-main-container">
          <div className="pro-details-layout">
            
            {/* LEFT COLUMN: Gallery & Zoom Lens */}
            <div className="pro-gallery-col">
              {/* Large Image Box */}
              <div className="pro-main-image-wrapper">
                <div
                  ref={zoomContainerRef}
                  className={`pro-zoom-container ${isZoomed ? 'is-zoomed' : ''}`}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundImage: `url(${activeImageSrc})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`
                  }}
                >
                  <img
                    src={activeImageSrc}
                    alt={product.title}
                    className="pro-featured-img"
                    loading="eager"
                  />
                </div>

                {/* Left Arrow */}
                <button
                  type="button"
                  className="pro-slider-arrow pro-slider-prev"
                  onClick={handlePrevImage}
                  aria-label="Previous product image"
                >
                  <ChevronLeft size={22} />
                </button>

                {/* Right Arrow */}
                <button
                  type="button"
                  className="pro-slider-arrow pro-slider-next"
                  onClick={handleNextImage}
                  aria-label="Next product image"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* 5 Thumbnails Row (Matches Screenshot 1 & 2) */}
              <div className="pro-thumbnails-row">
                {product.images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pro-thumb-item ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View image angle ${idx + 1}`}
                  >
                    <img
                      src={imgSrc}
                      alt={`${product.title} view ${idx + 1}`}
                      className="pro-thumb-img"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Product Information & Purchase Options */}
            <div className="pro-info-col">
              {/* Product Title */}
              <div className="pro-title-wrap">
                <h1 className="pro-main-title">{product.title}</h1>
              </div>

              {/* Reviews Stars */}
              <div className="pro-reviews-row">
                <div className="pro-stars-list">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <span 
                  className="pro-review-count-text"
                  onClick={() => {
                    setOpenAccordions((prev) => ({ ...prev, review: true }));
                    const el = document.getElementById('pro-reviews-accordion');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {product.reviewsCount} {product.reviewsCount === 1 ? 'review' : 'reviews'}
                </span>
              </div>

              {/* Price Row with Strikethrough & Green Sale Badge */}
              <div className="pro-price-row">
                <span className="pro-current-price">{displayPrice}</span>
                {displayOldPrice && (
                  <span className="pro-old-price">{displayOldPrice}</span>
                )}
                {product.discount && (
                  <span className="pro-sale-badge">{product.discount}</span>
                )}
              </div>

              {/* Shipping Note */}
              <p className="pro-shipping-notice">
                Tax included. Shipping calculated at checkout.
              </p>

              {/* In Stock Indicator with Pulsing Green Dot */}
              <div className="pro-inventory-row">
                <svg className="pro-stock-pulse-svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <circle cx="8" cy="8" r="8" fill="rgba(62, 214, 96, 0.28)"></circle>
                  <circle cx="8" cy="8" r="5" stroke="#ffffff" strokeWidth="1" fill="#3ed660"></circle>
                </svg>
                <span>{product.stockCount} in stock</span>
              </div>

              {/* Short Description */}
              <p className="pro-short-desc">
                {product.shortDescription}
              </p>

              {/* Urgency Sale Countdown Banner (Screenshot 1: Hurry up! Sale ends in) */}
              <div className="pro-countdown-box">
                <span className="pro-countdown-title">Hurry up! Sale ends in:</span>
                <span className="pro-countdown-timer">
                  {timeLeft.days} : {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>

              {/* Size Selector (28, 29, 30) */}
              <div className="pro-option-section">
                <h3 className="pro-option-header">
                  Size: <span className="current-value">{selectedSize}</span>
                </h3>
                <div className="pro-size-buttons-group">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`pro-size-btn ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => handleSelectSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatch Selector (Gold, Beige, Silver) */}
              <div className="pro-option-section">
                <h3 className="pro-option-header">
                  Color: <span className="current-value">{selectedColor}</span>
                </h3>
                <div className="pro-color-swatches-group">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      title={c.name}
                      className={`pro-color-swatch-btn ${selectedColor.toLowerCase() === c.name.toLowerCase() ? 'active' : ''}`}
                      onClick={() => handleSelectColor(c.name)}
                    >
                      <span 
                        className="pro-color-swatch-circle"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Cart Buttons */}
              <div className="pro-purchase-group">
                <div className="pro-qty-actions-row">
                  {/* Quantity Stepper */}
                  <div className="pro-qty-box">
                    <button
                      type="button"
                      className="pro-qty-btn"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="number"
                      className="pro-qty-input"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min={1}
                      aria-label="Product quantity"
                    />
                    <button
                      type="button"
                      className="pro-qty-btn"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Add to Cart & Buy it Now Buttons */}
                  <div className="pro-buttons-row">
                    <button
                      type="button"
                      className="pro-btn-add-cart"
                      onClick={handleAddToCart}
                    >
                      ADD TO CART
                    </button>
                    <button
                      type="button"
                      className="pro-btn-buy-now"
                      onClick={handleBuyItNow}
                    >
                      BUY IT NOW
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 Secondary Action Links (Screenshot 2: Wishlist, Sizeguide, Question, Share) */}
              <div className="pro-secondary-actions-grid">
                <button
                  type="button"
                  className={`pro-action-tool-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={handleToggleWishlist}
                >
                  <Heart size={15} fill={isWishlisted ? '#c86542' : 'none'} color={isWishlisted ? '#c86542' : 'currentColor'} />
                  <span>Wishlist</span>
                </button>

                <button
                  type="button"
                  className="pro-action-tool-btn"
                  onClick={() => setActiveModal('sizeguide')}
                >
                  <FileText size={15} />
                  <span>Sizeguide</span>
                </button>

                <button
                  type="button"
                  className="pro-action-tool-btn"
                  onClick={() => setActiveModal('question')}
                >
                  <Edit3 size={15} />
                  <span>Question</span>
                </button>

                <button
                  type="button"
                  className="pro-action-tool-btn"
                  onClick={() => setActiveModal('share')}
                >
                  <Share2 size={15} />
                  <span>Share</span>
                </button>
              </div>

              {/* Delivery, Returns, SKU (Screenshot 2) */}
              <div className="pro-meta-info-list">
                <div className="pro-meta-item">
                  <span className="pro-meta-label">Delivery:</span>
                  <span className="pro-meta-value">Estimated delivery time: 5-7 days</span>
                </div>
                <div className="pro-meta-item">
                  <span className="pro-meta-label">Returns:</span>
                  <span className="pro-meta-value">Within 45 days of purchase</span>
                </div>
                <div className="pro-meta-item">
                  <span className="pro-meta-label">Sku:</span>
                  <span className="pro-meta-value">{product.sku}</span>
                </div>
              </div>

              {/* Payment & Security Box (Warm Beige / Ivory background) */}
              <div className="pro-payment-security-box">
                <h4 className="pro-payment-title">Payment & Security</h4>
                <div className="pro-payment-icons-row">
                  {/* Visa SVG */}
                  <svg className="pro-payment-icon-svg" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24">
                    <title>Visa</title>
                    <rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none"></rect>
                    <path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#142FBD"></path>
                    <path d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z" fill="#1532CB"></path>
                    <path d="M29.5944 10.2167H29.2778C28.8556 11.2722 28.5389 11.8 28.2222 13.3833H30.2278C29.9111 11.8 29.9111 11.0611 29.5944 10.2167V10.2167ZM32.6556 16.4444H30.8611C30.7556 16.4444 30.7556 16.4444 30.65 16.3389L30.4389 15.3889L30.3333 15.1778H27.8C27.6944 15.1778 27.5889 15.1778 27.5889 15.3889L27.2722 16.3389C27.2722 16.4444 27.1667 16.4444 27.1667 16.4444H24.95L25.1611 15.9167L28.2222 8.73889C28.2222 8.21111 28.5389 8 29.0667 8H30.65C30.7556 8 30.8611 8 30.8611 8.21111L32.3389 15.0722C32.4444 15.4944 32.55 15.8111 32.55 16.2333C32.6556 16.3389 32.6556 16.3389 32.6556 16.4444V16.4444ZM18.5111 16.1278L18.9333 14.2278C19.0389 14.2278 19.1444 14.3333 19.1444 14.3333C19.8833 14.65 20.6222 14.8611 21.3611 14.7556C21.5722 14.7556 21.8889 14.65 22.1 14.5444C22.6278 14.3333 22.6278 13.8056 22.2056 13.3833C21.9944 13.1722 21.6778 13.0667 21.3611 12.8556C20.9389 12.6444 20.5167 12.4333 20.2 12.1167C18.9333 11.0611 19.3556 9.58333 20.0944 8.84444C20.7278 8.42222 21.0444 8 21.8889 8C23.1556 8 24.5278 8 25.1611 8.21111H25.2667C25.1611 8.84444 25.0556 9.37222 24.8444 10.0056C24.3167 9.79444 23.7889 9.58333 23.2611 9.58333C22.9444 9.58333 22.6278 9.58333 22.3111 9.68889C22.1 9.68889 21.9944 9.79444 21.8889 9.9C21.6778 10.1111 21.6778 10.4278 21.8889 10.6389L22.4167 11.0611C22.8389 11.2722 23.2611 11.4833 23.5778 11.6944C24.1056 12.0111 24.6333 12.5389 24.7389 13.1722C24.95 14.1222 24.6333 14.9667 23.7889 15.6C23.2611 16.0222 23.05 16.2333 22.3111 16.2333C20.8333 16.2333 19.6722 16.3389 18.7222 16.0222C18.6167 16.2333 18.6167 16.2333 18.5111 16.1278V16.1278ZM14.8167 16.4444C14.9222 15.7056 14.9222 15.7056 15.0278 15.3889C15.5556 13.0667 16.0833 10.6389 16.5056 8.31667C16.6111 8.10556 16.6111 8 16.8222 8H18.7222C18.5111 9.26667 18.3 10.2167 17.9833 11.3778C17.6667 12.9611 17.35 14.5444 16.9278 16.1278C16.9278 16.3389 16.8222 16.3389 16.6111 16.3389L14.8167 16.4444ZM5 8.21111C5 8.10556 5.21111 8 5.31667 8H8.90556C9.43333 8 9.85556 8.31667 9.96111 8.84444L10.9111 13.4889C10.9111 13.5944 10.9111 13.5944 11.0167 13.7C11.0167 13.5944 11.1222 13.5944 11.1222 13.5944L13.3389 8.21111C13.2333 8.10556 13.3389 8 13.4444 8H15.6611C15.6611 8.10556 15.6611 8.10556 15.5556 8.21111L12.2833 15.9167C12.1778 16.1278 12.1778 16.2333 12.0722 16.3389C11.9667 16.4444 11.7556 16.3389 11.5444 16.3389H9.96111C9.85556 16.3389 9.75 16.3389 9.75 16.1278L8.06111 9.58333C7.85 9.37222 7.53333 9.05556 7.11111 8.95C6.47778 8.63333 5.31667 8.42222 5.10556 8.42222L5 8.21111Z" fill="white"></path>
                  </svg>

                  {/* Mastercard SVG */}
                  <svg className="pro-payment-icon-svg" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24">
                    <title>Mastercard</title>
                    <rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none"></rect>
                    <path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#1C1C1C"></path>
                    <path d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z" fill="#232323"></path>
                    <path d="M14.6364 19.2727C18.8538 19.2727 22.2727 15.8538 22.2727 11.6364C22.2727 7.41892 18.8538 4 14.6364 4C10.4189 4 7 7.41892 7 11.6364C7 15.8538 10.4189 19.2727 14.6364 19.2727Z" fill="#EB001B"></path>
                    <path d="M23.3637 19.2727C27.5811 19.2727 31 15.8538 31 11.6364C31 7.41892 27.5811 4 23.3637 4C19.1462 4 15.7273 7.41892 15.7273 11.6364C15.7273 15.8538 19.1462 19.2727 23.3637 19.2727Z" fill="#F79E1B"></path>
                    <path d="M22.2727 11.6362C22.2727 9.01797 20.9637 6.72706 19 5.41797C17.0364 6.83615 15.7273 9.12706 15.7273 11.6362C15.7273 14.1452 17.0364 16.5452 19 17.8543C20.9637 16.5452 22.2727 14.2543 22.2727 11.6362Z" fill="#FF5F00"></path>
                  </svg>

                  {/* Amex SVG */}
                  <svg className="pro-payment-icon-svg" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24">
                    <title>American Express</title>
                    <rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none"></rect>
                    <path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#0071CE"></path>
                    <path d="M25.8662 6.33203V3H31L31.8662 5.5332L32.7334 3H37V14.2002H36.7998L34.8672 16.2656L36.7998 18.3594H37V21.2666H33.5996L31.9336 19.3994L30.2002 21.2666H19.4668V12.666H16L20.2666 3H24.4004L25.8662 6.33203ZM20.5996 20.2656H27V18.5322H22.666V17.3994H26.8662V15.666H22.666V14.5322H27V12.7988H20.5996V20.2656Z" fill="white"></path>
                  </svg>

                  {/* PayPal SVG */}
                  <svg className="pro-payment-icon-svg" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>PayPal</title>
                    <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                    <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                    <path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path>
                    <path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path>
                  </svg>
                </div>
                <p className="pro-payment-notice">
                  Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
                </p>
              </div>

              {/* 3 Service Badges (Screenshot 2: Order tracking, 90 days return, Money guarantee) */}
              <div className="pro-services-strip">
                <div className="pro-service-item">
                  <MapPin className="pro-service-icon" size={20} />
                  <span className="pro-service-text">Order tracking</span>
                </div>
                <div className="pro-service-item">
                  <RotateCcw className="pro-service-icon" size={20} />
                  <span className="pro-service-text">90 days return</span>
                </div>
                <div className="pro-service-item">
                  <DollarSign className="pro-service-icon" size={20} />
                  <span className="pro-service-text">Money guarantee</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Collapsible Accordions (Screenshots 3 & 4) */}
      <section className="pro-accordions-section" aria-label="Product Information Details">
        <div className="pro-accordions-container">
          
          {/* Description Accordion (Default Open) */}
          <div className="pro-accordion-card">
            <button
              type="button"
              className="pro-accordion-header"
              onClick={() => toggleAccordion('description')}
              aria-expanded={openAccordions.description}
            >
              <h3 className="pro-accordion-title">Description</h3>
              <span className="pro-accordion-icon">
                {openAccordions.description ? '—' : '+'}
              </span>
            </button>

            {openAccordions.description && (
              <div className="pro-accordion-body">
                <div className="pro-desc-three-col">
                  {/* Left: Round image of hand wearing ring */}
                  <div className="pro-desc-circle-col">
                    <img
                      src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"
                      alt={`${product.title} on finger`}
                      className="pro-desc-round-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Middle: Specifications & Washing Instructions */}
                  <div className="pro-desc-spec-col">
                    <div>
                      <h4 className="pro-spec-group-title">Product Specifications</h4>
                      <p className="pro-spec-paragraph">{product.specifications}</p>
                    </div>

                    <div>
                      <h4 className="pro-spec-group-title">Washing Instructions</h4>
                      <div className="pro-washing-list">
                        <div className="pro-washing-item">
                          {/* Iron icon */}
                          <svg className="pro-wash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M3 18h18M5 14h14l-2-6H7l-2 6zM8 11h.01M12 11h.01M16 11h.01"></path>
                          </svg>
                          <span>{product.washingInstructions.iron}</span>
                        </div>
                        <div className="pro-washing-item">
                          {/* Bleach crossed icon */}
                          <svg className="pro-wash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M12 3l9 16H3l9-16zM4 20L20 4"></path>
                          </svg>
                          <span>{product.washingInstructions.bleach}</span>
                        </div>
                        <div className="pro-washing-item">
                          {/* Dry clean crossed icon */}
                          <svg className="pro-wash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M5 19L19 5"></path>
                          </svg>
                          <span>{product.washingInstructions.dryClean}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Material & Wearing */}
                  <div className="pro-desc-material-col">
                    <div>
                      <h4 className="pro-spec-group-title">Material</h4>
                      <p className="pro-spec-paragraph">{product.material}</p>
                    </div>
                    <div>
                      <h4 className="pro-spec-group-title">Wearing</h4>
                      <p className="pro-spec-paragraph">{product.wearing}</p>
                      <p className="pro-spec-paragraph" style={{ marginTop: '6px' }}>Size M</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional info Accordion */}
          <div className="pro-accordion-card">
            <button
              type="button"
              className="pro-accordion-header"
              onClick={() => toggleAccordion('additional')}
              aria-expanded={openAccordions.additional}
            >
              <h3 className="pro-accordion-title">Additional info</h3>
              <span className="pro-accordion-icon">
                {openAccordions.additional ? '—' : '+'}
              </span>
            </button>

            {openAccordions.additional && (
              <div className="pro-accordion-body">
                <table className="pro-additional-table">
                  <tbody>
                    {product.additionalInfo.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.label}</td>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Return policies Accordion */}
          <div className="pro-accordion-card">
            <button
              type="button"
              className="pro-accordion-header"
              onClick={() => toggleAccordion('returnPolicies')}
              aria-expanded={openAccordions.returnPolicies}
            >
              <h3 className="pro-accordion-title">Return policies</h3>
              <span className="pro-accordion-icon">
                {openAccordions.returnPolicies ? '—' : '+'}
              </span>
            </button>

            {openAccordions.returnPolicies && (
              <div className="pro-accordion-body">
                <p className="pro-spec-paragraph" style={{ maxWidth: '800px', lineHeight: 1.8 }}>
                  {product.returnPolicyText}
                </p>
              </div>
            )}
          </div>

          {/* Review Accordion (Screenshot 4) */}
          <div className="pro-accordion-card" id="pro-reviews-accordion">
            <button
              type="button"
              className="pro-accordion-header"
              onClick={() => toggleAccordion('review')}
              aria-expanded={openAccordions.review}
            >
              <h3 className="pro-accordion-title">Review</h3>
              <span className="pro-accordion-icon">
                {openAccordions.review ? '—' : '+'}
              </span>
            </button>

            {openAccordions.review && (
              <div className="pro-accordion-body">
                <div className="pro-reviews-content">
                  <div className="pro-review-summary-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span className="pro-review-rating-huge">{product.rating.toFixed(1)}</span>
                      <div>
                        <div className="pro-stars-list">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} fill="currentColor" />
                          ))}
                        </div>
                        <span style={{ fontSize: '13px', color: '#666', marginTop: '4px', display: 'block' }}>
                          Based on {product.reviewsCount} verified purchase review
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="pro-write-review-btn"
                      onClick={() => showToast('Review submission form will open shortly.')}
                    >
                      Write a review
                    </button>
                  </div>

                  {/* Sample Review */}
                  <div className="pro-single-review-item">
                    <div className="pro-reviewer-header">
                      <div>
                        <span className="pro-reviewer-name">Sophia Montgomery</span>
                        <div className="pro-stars-list" style={{ marginTop: '4px' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={13} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <span className="pro-review-date">2 weeks ago</span>
                    </div>
                    <p className="pro-review-text">
                      "Stunning ring! The rose gold finish has a warm, radiant tone that pairs effortlessly with my daily jewelry. The pavé diamonds catch light with exquisite sparkle. True to size and exceptionally comfortable."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 4. Editorial Promotional Lifestyle Banners (Screenshots 4 & 5) */}
      <section className="pro-editorial-section" aria-label="Brand Editorial Stories">
        <div className="pro-editorial-container">
          
          {/* Banner 1: Left photo, Right text (Screenshot 4: New woman fashion arrivals) */}
          <div className="pro-editorial-banner-row">
            <div className="pro-editorial-img-box">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop"
                alt="New woman fashion arrivals with fine jewelry necklace"
                className="pro-editorial-img"
                loading="lazy"
              />
            </div>
            <div className="pro-editorial-text-box">
              <h2 className="pro-editorial-heading">
                New woman fashion arrivals
              </h2>
              <p className="pro-editorial-paragraph">
                As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze we're asking women to invite us into their most intimate space.
              </p>
              <button
                type="button"
                className="pro-editorial-shop-btn"
                onClick={onNavigateShop}
              >
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Banner 2: Left text, Right photo (Matches Screenshot 2: I make clothes make fashion) */}
          <div className="pro-editorial-banner-row pro-editorial-banner-2">
            <div className="pro-editorial-text-box">
              <h2 className="pro-editorial-heading">
                I make clothes make<br />fashion
              </h2>
              <p className="pro-editorial-paragraph">
                As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze we're asking women to invite us into their most intimate space.
              </p>
              <button
                type="button"
                className="pro-editorial-shop-btn"
                onClick={onNavigateShop}
              >
                SHOP NOW
              </button>
            </div>
            <div className="pro-editorial-img-box">
              <img
                src="/images/home/editorial-pink-heart-earrings.jpg"
                alt="I make clothes make fashion pink heart dripping gold jewelry"
                className="pro-editorial-img"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 5. Recommended Products Section (Matches Screenshots 2 & 3) */}
      <section className="pro-related-section" aria-label="Recommended Fine Jewelry Products">
        <div className="pro-related-container">
          <div className="pro-related-header">
            <span className="pro-related-subtitle">YOU MIGHT ALSO LIKE</span>
            <h2 className="pro-related-title">Recommended product</h2>
          </div>

          <div className="pro-related-grid">
            {recommendedProducts.map((rel) => {
              const ratingDisplay = rel.rating > 0 
                ? (rel.rating === 4 ? '4.0' : rel.rating.toFixed(1)) 
                : '0';

              return (
                <div 
                  key={rel.id} 
                  className="pro-rec-card"
                  onClick={() => onSelectProduct?.(rel.handle)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProduct?.(rel.handle);
                    }
                  }}
                >
                  {/* Top-Left Discount Badge */}
                  {rel.discountPercent && (
                    <span className="pro-rec-discount-badge">{rel.discountPercent}</span>
                  )}

                  {/* Product Image (Primary & Hover Secondary Image) */}
                  <div className={`pro-rec-img-wrap ${rel.images.secondary ? 'has-secondary' : ''}`}>
                    <img
                      src={rel.images.primary}
                      alt={rel.title}
                      className="pro-rec-img pro-rec-img-primary"
                      loading="lazy"
                    />
                    {rel.images.secondary && (
                      <img
                        src={rel.images.secondary}
                        alt={`${rel.title} alternate view`}
                        className="pro-rec-img pro-rec-img-secondary"
                        loading="lazy"
                      />
                    )}
                    {/* Top Floating Actions (Wishlist & Quick View) */}
                    <div className="card-floating-actions">
                      <button
                        type="button"
                        className={`card-action-btn ${checkWishlist(rel.id) || checkWishlist(rel.handle) ? 'wishlisted' : ''}`}
                        aria-label={checkWishlist(rel.id) || checkWishlist(rel.handle) ? 'Remove from wishlist' : 'Add to wishlist'}
                        title={checkWishlist(rel.id) || checkWishlist(rel.handle) ? 'In wishlist' : 'Add to wishlist'}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(rel, e);
                        }}
                      >
                        <Heart size={18} strokeWidth={1.7} fill="none" />
                      </button>
                      <button
                        type="button"
                        className="card-action-btn"
                        aria-label={`Quick view ${rel.title}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct?.(rel.handle);
                        }}
                      >
                        <Eye size={18} strokeWidth={1.7} />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="pro-rec-body">
                    {/* Middle Row: Title + Category on left, Bag button on right */}
                    <div className="pro-rec-middle-row">
                      <div className="pro-rec-info">
                        <h4 className="pro-rec-title">{rel.title.toUpperCase()}</h4>
                        <span className="pro-rec-category">{rel.productType || 'Jewelry'}</span>
                      </div>
                      <button
                        type="button"
                        className="pro-rec-bag-btn"
                        aria-label={`Add ${rel.title} to bag`}
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuickAdd(rel);
                        }}
                      >
                        <ShoppingBag size={14} strokeWidth={1.6} />
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="pro-rec-divider" />

                    {/* Bottom Row: Price on left, Rating on right */}
                    <div className="pro-rec-bottom-row">
                      <div className="pro-rec-price-wrap">
                        <span className="pro-rec-price">{rel.priceFormatted}</span>
                        {rel.compareAtPriceFormatted && (
                          <span className="pro-rec-compare-price">{rel.compareAtPriceFormatted}</span>
                        )}
                      </div>
                      <div className="pro-rec-rating">
                        <Star size={12} fill="#f59e0b" color="#f59e0b" className="pro-rec-star" />
                        <span className="pro-rec-rating-text">({ratingDisplay})</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Sticky Bottom Bar (Screenshots 3, 4, 5) */}
      <div className={`pro-sticky-bottom-bar ${showStickyBar ? 'visible' : ''}`}>
        <div className="pro-sticky-left">
          <img
            src={activeImageSrc}
            alt={product.title}
            className="pro-sticky-thumb"
          />
          <h4 className="pro-sticky-title">{product.title}</h4>
        </div>

        <div className="pro-sticky-right">
          {/* Variant dropdown */}
          <select
            className="pro-sticky-variant-select"
            value={`${selectedSize}-${selectedColor}`}
            onChange={(e) => {
              const [sz, col] = e.target.value.split('-');
              setSelectedSize(sz);
              setSelectedColor(col);
            }}
            aria-label="Select variant"
          >
            {product.variants.map((v) => (
              <option key={v.id} value={`${v.size}-${v.color}`}>
                {v.size} / {v.color} - {v.price}
              </option>
            ))}
          </select>

          {/* Stepper */}
          <div className="pro-sticky-qty-box">
            <button
              type="button"
              className="pro-sticky-qty-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <input
              type="number"
              className="pro-sticky-qty-input"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              aria-label="Sticky bar quantity"
            />
            <button
              type="button"
              className="pro-sticky-qty-btn"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Sticky Add to Cart */}
          <button
            type="button"
            className="pro-sticky-add-cart-btn"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* 7. Interactive Modals (Sizeguide, Question, Share) */}
      {activeModal && (
        <div className="pro-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="pro-modal-box" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="pro-modal-header">
              <h3 className="pro-modal-title">
                {activeModal === 'sizeguide' && 'Ring & Jewelry Size Guide'}
                {activeModal === 'question' && 'Have a Question?'}
                {activeModal === 'share' && 'Share this Product'}
              </h3>
              <button
                type="button"
                className="pro-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="pro-modal-body">
              {/* Sizeguide Modal */}
              {activeModal === 'sizeguide' && (
                <div>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, margin: '0 0 16px' }}>
                    Use the conversion table below to find your perfect Jelwo fine ring fit. For best results, measure your finger at the end of the day when it is at its largest.
                  </p>
                  <table className="pro-sizeguide-table">
                    <thead>
                      <tr>
                        <th>Size (Jelwo)</th>
                        <th>Inside Diameter (mm)</th>
                        <th>Inside Circumference (mm)</th>
                        <th>US Size</th>
                        <th>UK Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>28</strong></td>
                        <td>16.5 mm</td>
                        <td>51.8 mm</td>
                        <td>6</td>
                        <td>L 1/2</td>
                      </tr>
                      <tr>
                        <td><strong>29</strong></td>
                        <td>17.3 mm</td>
                        <td>54.4 mm</td>
                        <td>7</td>
                        <td>N 1/2</td>
                      </tr>
                      <tr>
                        <td><strong>30</strong></td>
                        <td>18.1 mm</td>
                        <td>56.9 mm</td>
                        <td>8</td>
                        <td>P 1/2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Question Modal */}
              {activeModal === 'question' && (
                <div>
                  {questionSubmitted ? (
                    <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                      <Check size={40} color="#2ea745" style={{ margin: '0 auto 12px' }} />
                      <h4 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 8px' }}>Thank you!</h4>
                      <p style={{ fontSize: '14px', color: '#666' }}>
                        Your inquiry regarding <strong>{product.title}</strong> has been received. Our concierge team will reply within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setQuestionSubmitted(true);
                      setTimeout(() => {
                        setActiveModal(null);
                        setQuestionSubmitted(false);
                      }, 2500);
                    }}>
                      <div className="pro-form-group">
                        <label className="pro-form-label">Your Name *</label>
                        <input type="text" required className="pro-form-input" placeholder="e.g. Eleanor Vance" />
                      </div>
                      <div className="pro-form-group">
                        <label className="pro-form-label">Email Address *</label>
                        <input type="email" required className="pro-form-input" placeholder="you@domain.com" />
                      </div>
                      <div className="pro-form-group">
                        <label className="pro-form-label">Your Question regarding {product.title} *</label>
                        <textarea rows={4} required className="pro-form-textarea" placeholder="Ask about sizing, stone certifications, custom engraving, or shipping..." />
                      </div>
                      <button type="submit" className="pro-form-submit-btn">
                        Submit Question
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Share Modal */}
              {activeModal === 'share' && (
                <div>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', textAlign: 'center' }}>
                    Share <strong>{product.title}</strong> with your friends and loved ones:
                  </p>
                  <div className="pro-share-options-list">
                    <button 
                      type="button" 
                      className="pro-share-social-btn" 
                      title="Share to Facebook"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button 
                      type="button" 
                      className="pro-share-social-btn" 
                      title="Share to X"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product.title)}`, '_blank')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </button>
                    <button 
                      type="button" 
                      className="pro-share-social-btn" 
                      title="Share via WhatsApp"
                      onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${product.title} - ${window.location.href}`)}`, '_blank')}
                    >
                      <Send size={18} />
                    </button>
                  </div>

                  <div className="pro-share-copy-box">
                    <input 
                      type="text" 
                      readOnly 
                      value={typeof window !== 'undefined' ? window.location.href : 'https://jelwo.myshopify.com/products/rose-gold-rings'} 
                      className="pro-share-url-input" 
                    />
                    <button 
                      type="button" 
                      className="pro-share-copy-btn"
                      onClick={handleCopyLink}
                    >
                      {linkCopied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 8. Toast Notice */}
      {toastMessage && (
        <div className="pro-toast-notice">
          <Check size={18} className="pro-toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
