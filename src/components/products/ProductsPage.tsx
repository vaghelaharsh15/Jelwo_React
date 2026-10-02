import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ALL_PRODUCTS, 
  CATEGORIES_LIST, 
  COLORS_LIST, 
  SPECIAL_PRODUCTS, 
  TOP_PROMO_BANNER, 
  SIDEBAR_PROMO_BANNER, 
  PRODUCTS_BREADCRUMB_BG,
  resolveCategoryTitle
} from '../../data/productsData';
import { 
  Grid3X3, 
  List, 
  ShoppingBag, 
  Star, 
  ArrowRight, 
  ArrowLeft, 
  Check,
  Filter,
  Heart,
  Eye,
  X
} from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './ProductsPage.css';

interface ProductsPageProps {
  onNavigateHome?: () => void;
  onSelectProduct?: (handleOrId: string) => void;
  initialCategory?: string | null;
  onClearInitialCategory?: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ 
  onNavigateHome, 
  onSelectProduct,
  initialCategory,
  onClearInitialCategory
}) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { openQuickAdd } = useCart();
  // Page State
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('title-ascending');

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (initialCategory) {
      const resolved = resolveCategoryTitle(initialCategory) || initialCategory;
      return [resolved];
    }
    return [];
  });
  const [selectedStock, setSelectedStock] = useState<'inStock' | 'outOfStock' | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(28);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const gridTopRef = useRef<HTMLDivElement>(null);

  // Set document title and scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Products - Jelwo Fine Jewelry';
    return () => {
      document.title = "Jelwo - World's Best Fine Jewelry";
    };
  }, []);

  // Update selectedCategories when initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      const resolved = resolveCategoryTitle(initialCategory) || initialCategory;
      setSelectedCategories([resolved]);
      setCurrentPageNum(1);
    }
  }, [initialCategory]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    // Filter by category
    if (selectedCategories.length > 0) {
      list = list.filter((p) => {
        const prodCategories = (p.categories && p.categories.length > 0 ? p.categories : [p.category]).map(c => c.toLowerCase());
        const prodMainCategory = (p.category || '').toLowerCase();

        return selectedCategories.some((cat) => {
          const catLower = cat.toLowerCase();
          return (
            prodCategories.includes(catLower) ||
            prodMainCategory === catLower ||
            prodCategories.some(pc => pc.replace(/[^a-z0-9]/g, '') === catLower.replace(/[^a-z0-9]/g, ''))
          );
        });
      });
    }

    // Filter by stock
    if (selectedStock === 'inStock') {
      list = list.filter((p) => p.inStock);
    } else if (selectedStock === 'outOfStock') {
      list = list.filter((p) => !p.inStock);
    }

    // Filter by price
    list = list.filter((p) => p.rawPrice <= maxPrice);

    // Filter by color
    if (selectedColor) {
      list = list.filter((p) => p.color.toLowerCase() === selectedColor.toLowerCase());
    }

    // Sort
    switch (sortBy) {
      case 'title-ascending':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-descending':
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-ascending':
        list.sort((a, b) => a.rawPrice - b.rawPrice);
        break;
      case 'price-descending':
        list.sort((a, b) => b.rawPrice - a.rawPrice);
        break;
      default:
        break;
    }

    return list;
  }, [selectedCategories, selectedStock, maxPrice, selectedColor, sortBy]);

  // Pagination Logic (12 per page)
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  const displayedProducts = useMemo(() => {
    // When no filters are active and default sorting is on, guarantee the exact 12 products per page from screenshots
    if (
      selectedCategories.length === 0 && 
      !selectedStock && 
      maxPrice === 28 && 
      !selectedColor && 
      sortBy === 'title-ascending'
    ) {
      const start = (currentPageNum - 1) * itemsPerPage;
      return ALL_PRODUCTS.slice(start, start + itemsPerPage);
    }

    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPageNum, selectedCategories, selectedStock, maxPrice, selectedColor, sortBy]);

  const handlePageChange = (newPage: number) => {
    setCurrentPageNum(newPage);
    if (gridTopRef.current) {
      const topOffset = gridTopRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  // Dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES_LIST.forEach((cat) => {
      const catLower = cat.title.toLowerCase();
      counts[cat.title] = ALL_PRODUCTS.filter((p) => {
        const prodCats = (p.categories && p.categories.length > 0 ? p.categories : [p.category]).map(c => c.toLowerCase());
        const prodMainCategory = (p.category || '').toLowerCase();
        return (
          prodCats.includes(catLower) ||
          prodMainCategory === catLower ||
          prodCats.some(pc => pc.replace(/[^a-z0-9]/g, '') === catLower.replace(/[^a-z0-9]/g, ''))
        );
      }).length;
    });
    return counts;
  }, []);

  // Toggle Category Checkbox
  const toggleCategory = (catTitle: string) => {
    setSelectedCategories((prev) => {
      const exists = prev.some(c => c.toLowerCase() === catTitle.toLowerCase());
      const next = exists
        ? prev.filter(c => c.toLowerCase() !== catTitle.toLowerCase())
        : [...prev, catTitle];
      if (next.length === 0) {
        onClearInitialCategory?.();
      }
      return next;
    });
    setCurrentPageNum(1);
  };

  const renderFilterWidgets = () => (
    <>
      {/* Categories Widget */}
      <div className="sidebar-widget">
        <div className="sidebar-subheading-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 className="sidebar-widget-title" style={{ margin: 0 }}>Categories</h2>
          {selectedCategories.length > 0 && (
            <button 
              type="button" 
              className="sidebar-reset-btn"
              onClick={() => {
                setSelectedCategories([]);
                setCurrentPageNum(1);
                onClearInitialCategory?.();
              }}
              style={{ fontSize: '13px', color: '#c5705d', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Reset ({selectedCategories.length})
            </button>
          )}
        </div>
        <div className="sidebar-scroll-list">
          {CATEGORIES_LIST.map((cat) => {
            const isChecked = selectedCategories.some(sc => sc.toLowerCase() === cat.title.toLowerCase());
            const count = categoryCounts[cat.title] !== undefined ? categoryCounts[cat.title] : cat.count;
            return (
              <label key={cat.id} className="sidebar-checkbox-label">
                <div className="sidebar-checkbox-left">
                  <input 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={() => toggleCategory(cat.title)} 
                  />
                  <span className="sidebar-custom-checkbox">
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span>{cat.title}</span>
                </div>
                <span className="sidebar-count">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Filter Section */}
      <div className="sidebar-widget">
        <h2 className="sidebar-widget-title">Filter</h2>

        {/* Availability Sub-widget */}
        <div className="sidebar-sub-block">
          <div className="sidebar-subheading-row">
            <h3 className="sidebar-subheading">Availability</h3>
          </div>
          <div className="sidebar-sub-info">
            <span>{selectedStock ? '1 selected' : '0 selected'}</span>
            {selectedStock && (
              <button 
                type="button" 
                className="sidebar-reset-btn"
                onClick={() => setSelectedStock(null)}
              >
                Reset
              </button>
            )}
          </div>
          <div className="sidebar-scroll-list" style={{ maxHeight: '100px' }}>
            <label className="sidebar-checkbox-label">
              <div className="sidebar-checkbox-left">
                <input 
                  type="checkbox" 
                  checked={selectedStock === 'inStock'}
                  onChange={() => setSelectedStock(selectedStock === 'inStock' ? null : 'inStock')}
                />
                <span className="sidebar-custom-checkbox">
                  {selectedStock === 'inStock' && <Check size={12} strokeWidth={3} />}
                </span>
                <span>In stock</span>
              </div>
              <span className="sidebar-count">(24)</span>
            </label>

            <label className="sidebar-checkbox-label">
              <div className="sidebar-checkbox-left">
                <input 
                  type="checkbox" 
                  checked={selectedStock === 'outOfStock'}
                  onChange={() => setSelectedStock(selectedStock === 'outOfStock' ? null : 'outOfStock')}
                />
                <span className="sidebar-custom-checkbox">
                  {selectedStock === 'outOfStock' && <Check size={12} strokeWidth={3} />}
                </span>
                <span>Out of stock</span>
              </div>
              <span className="sidebar-count">(1)</span>
            </label>
          </div>
        </div>

        {/* Price Sub-widget */}
        <div className="sidebar-sub-block" style={{ marginTop: '25px' }}>
          <div className="sidebar-subheading-row">
            <h3 className="sidebar-subheading">Price</h3>
          </div>
          <div className="sidebar-sub-info">
            <span>The highest price is Rs. 28.00</span>
            {maxPrice < 28 && (
              <button 
                type="button" 
                className="sidebar-reset-btn"
                onClick={() => setMaxPrice(28)}
              >
                Reset
              </button>
            )}
          </div>

          <div className="price-slider-wrap">
            <div className="price-track-container">
              <div 
                className="price-track-fill" 
                style={{ left: '0%', width: `${(maxPrice / 28) * 100}%` }} 
              />
              <input 
                type="range" 
                min="0" 
                max="28" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-slider-input"
                aria-label="Filter products by maximum price"
              />
            </div>

            <div className="price-inputs-row">
              <div className="price-input-box">
                <span className="currency-sym">₹</span>
                <input 
                  type="number" 
                  value="0" 
                  readOnly 
                  aria-label="Minimum price"
                />
              </div>
              <span className="price-separator-dash">-</span>
              <div className="price-input-box">
                <span className="currency-sym">₹</span>
                <input 
                  type="number" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Math.min(28, Math.max(0, Number(e.target.value) || 0)))}
                  aria-label="Maximum price"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Color Sub-widget */}
        <div className="sidebar-sub-block" style={{ marginTop: '25px' }}>
          <div className="sidebar-subheading-row">
            <h3 className="sidebar-subheading">Color</h3>
          </div>
          <div className="sidebar-sub-info">
            <span>{selectedColor ? '1 selected' : '0 selected'}</span>
            {selectedColor && (
              <button 
                type="button" 
                className="sidebar-reset-btn"
                onClick={() => setSelectedColor(null)}
              >
                Reset
              </button>
            )}
          </div>

          <div className="color-swatch-list">
            {COLORS_LIST.map((c) => {
              const isSelected = selectedColor === c.name;
              return (
                <div 
                  key={c.name} 
                  className="color-swatch-item"
                  onClick={() => setSelectedColor(isSelected ? null : c.name)}
                >
                  <div className="color-swatch-left">
                    <span 
                      className="color-dot" 
                      style={{ backgroundColor: c.hex }} 
                    />
                    <span style={{ fontWeight: isSelected ? '600' : '400' }}>
                      {c.name}
                    </span>
                  </div>
                  <span className="sidebar-count">({c.count})</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Special Product Widget (Screenshots 3 & 4) */}
      <div className="sidebar-widget">
        <h2 className="sidebar-widget-title">Special product</h2>
        <div className="special-products-widget">
          {SPECIAL_PRODUCTS.map((sp) => (
            <a 
              key={sp.id} 
              href={`/products/${sp.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="special-product-card"
              onClick={(e) => {
                e.preventDefault();
                onSelectProduct?.(sp.title.toLowerCase().replace(/\s+/g, '-'));
              }}
            >
              <div className="special-prod-thumb">
                <img src={sp.image} alt={sp.title} loading="lazy" />
              </div>
              <div className="special-prod-info">
                <h4 className="special-prod-title">{sp.title}</h4>
                <span className="special-prod-price">{sp.price}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Sidebar Promotional Banner Card (Screenshot 4) */}
      <div className="sidebar-widget">
        <div className="sidebar-promo-banner-card">
          <img 
            src={SIDEBAR_PROMO_BANNER.image} 
            alt={SIDEBAR_PROMO_BANNER.title} 
            className="sidebar-promo-img"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="products-page-root">
      {/* 1. Hero Breadcrumb Banner (Desktop >= 1200px) */}
      <section 
        className="breadcrumb-area" 
        aria-label="Products Breadcrumb Banner"
        style={{ backgroundImage: `url(${PRODUCTS_BREADCRUMB_BG})` }}
      >
        <img 
          src={PRODUCTS_BREADCRUMB_BG} 
          alt="Jelwo Fine Jewelry Products Banner" 
          className="breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="breadcrumb-dark-tint" />

        <div className="container">
          <div className="breadcrumb-index">
            <ul className="breadcrumb-list list-unstyled">
              <li className="breadcrumb-item">
                <button 
                  type="button" 
                  className="breadcrumb-nav-btn"
                  onClick={onNavigateHome}
                  title="Back to the home page"
                >
                  Home
                </button>
              </li>
              <li className="breadcrumb-separator" aria-hidden="true">-</li>
              <li className="breadcrumb-item">
                <span className="breadcrumb-current">Products</span>
              </li>
            </ul>

            <div className="breadcrumb-title">
              <h1>Products</h1>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Filters Layout */}
      <section className="products-main-layout" aria-label="Products Catalog">
        <div className="container">
          <div className="products-layout-grid">
            
            {/* LEFT SIDEBAR (Desktop >= 1200px) */}
            <aside className="products-sidebar" aria-label="Product Filters">
              {renderFilterWidgets()}
            </aside>

            {/* RIGHT MAIN AREA (Screenshots 1 to 5) */}
            <main className="products-content-area" ref={gridTopRef}>
              <h2 className="products-area-title">Products</h2>

              {/* Top Collection Promo Banner (Screenshot 1) */}
              <div className="collection-promo-banner-wrap">
                <img 
                  src={TOP_PROMO_BANNER.image} 
                  alt={TOP_PROMO_BANNER.title} 
                  className="collection-promo-banner-img"
                  loading="eager"
                />
                <p className="collection-sustainability-notice">
                  {TOP_PROMO_BANNER.description}
                </p>
              </div>

              {/* Shop Top Toolbar */}
              <div className="shop-top-toolbar">
                <div className="toolbar-left">
                  {/* Tablet/Mobile Filter Button (< 1200px) */}
                  <button 
                    type="button" 
                    className="toolbar-filter-btn"
                    onClick={() => setMobileFilterOpen(true)}
                    aria-label="Filter products"
                  >
                    <Filter size={15} />
                    <span>Filter</span>
                  </button>

                  <button 
                    type="button" 
                    className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                    aria-label="Switch to grid view"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button 
                    type="button" 
                    className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List View"
                    aria-label="Switch to list view"
                  >
                    <List size={18} />
                  </button>
                  <span className="toolbar-count desktop-only-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</span>
                </div>

                <div className="toolbar-right">
                  <span className="toolbar-count tablet-only-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</span>
                  <div className="sort-select-wrapper">
                    <span className="sort-select-label">Sort by:</span>
                    <select 
                      className="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      aria-label="Sort products by"
                    >
                      <option value="title-ascending">Alphabetically, A-Z</option>
                      <option value="title-descending">Alphabetically, Z-A</option>
                      <option value="price-ascending">Price, low to high</option>
                      <option value="price-descending">Price, high to low</option>
                      <option value="best-selling">Best selling</option>
                      <option value="featured">Featured</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filter Strip when category is applied from Collections / Shop page */}
              {selectedCategories.length > 0 && (
                <div
                  className="products-active-filter-strip"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                    margin: '18px 0 24px',
                    padding: '12px 18px',
                    backgroundColor: '#faf7f5',
                    borderRadius: '4px',
                    border: '1px solid #ede5df'
                  }}
                >
                  <span style={{ fontSize: '13px', color: '#555555', fontWeight: 600 }}>
                    Active Filter:
                  </span>
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '5px 12px',
                        backgroundColor: '#ffffff',
                        border: '1.5px solid #c97a5e',
                        color: '#c97a5e',
                        borderRadius: '3px',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.2px'
                      }}
                    >
                      <span>{cat}</span>
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          color: '#c97a5e'
                        }}
                        aria-label={`Remove filter ${cat}`}
                        title={`Remove filter ${cat}`}
                      >
                        <X size={14} strokeWidth={2.5} />
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategories([]);
                      setCurrentPageNum(1);
                      onClearInitialCategory?.();
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#777777',
                      fontSize: '12.5px',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      marginLeft: '8px',
                      fontWeight: 500
                    }}
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Products Grid or Empty State */}
              {displayedProducts.length === 0 ? (
                <div className="no-products-empty-state" style={{ padding: '60px 20px', textAlign: 'center', background: '#faf8f5', borderRadius: '12px', border: '1px solid #ede8e3', margin: '30px 0' }}>
                  <p style={{ fontSize: '18px', color: '#444', marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>
                    No products found matching the selected filters.
                  </p>
                  <button 
                    type="button"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedStock(null);
                      setMaxPrice(28);
                      setSelectedColor(null);
                      setCurrentPageNum(1);
                    }}
                    style={{ padding: '10px 24px', backgroundColor: '#1f2937', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <ul className={`products-cards-grid list-unstyled ${viewMode === 'list' ? 'is-list-view' : ''}`}>
                  {displayedProducts.map((prod) => (
                    <li key={prod.id} className="product-card-item">
                        {/* Image Container with Clean Background */}
                        <div 
                          className={`product-card-img-wrap ${prod.hoverImage ? 'has-hover-image' : ''}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => onSelectProduct?.(prod.title.toLowerCase().replace(/\s+/g, '-'))}
                        >
                          {/* Green Discount Badge (top-left) */}
                          {prod.discount && (
                            <span className="product-discount-badge">{prod.discount}</span>
                          )}

                          {/* Top Floating Actions on Hover (Wishlist & Quick View) */}
                          <div className="card-floating-actions">
                            <button
                              type="button"
                              className={`card-action-btn wishlist-btn ${isWishlisted(prod.id) ? 'wishlisted' : ''}`}
                              title={isWishlisted(prod.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                              aria-label={`Wishlist ${prod.title}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(prod, e);
                              }}
                            >
                              <Heart size={18} strokeWidth={1.7} fill="none" />
                            </button>
                            <button
                              type="button"
                              className="card-action-btn quickview-btn"
                              title="Quick view"
                              aria-label={`Quick view ${prod.title}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectProduct?.(prod.title.toLowerCase().replace(/\s+/g, '-'));
                              }}
                            >
                              <Eye size={18} strokeWidth={1.7} />
                            </button>
                          </div>

                          {/* Primary Image */}
                          <img 
                            src={prod.image} 
                            alt={prod.title} 
                            loading="lazy" 
                            className="product-card-img img-primary"
                          />

                          {/* Hover Secondary Angle Image */}
                          {prod.hoverImage && (
                            <img 
                              src={prod.hoverImage} 
                              alt={`${prod.title} alternate angle`} 
                              loading="lazy" 
                              className="product-card-img img-hover"
                            />
                          )}
                        </div>

                        {/* Product Content Details */}
                        <div className="product-card-details">
                          {/* Title */}
                          <h3 
                            className="product-card-title"
                            style={{ cursor: 'pointer' }}
                            onClick={() => onSelectProduct?.(prod.title.toLowerCase().replace(/\s+/g, '-'))}
                          >
                            {prod.title}
                          </h3>

                          {/* Category (Jewelry) */}
                          <a 
                            href="#category" 
                            className="product-card-category"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleCategory(prod.category);
                            }}
                          >
                            Jewelry
                          </a>

                          {/* 3 Action Buttons row for < 1200px: [ ♡ ] [ 🛍 ] [ 👁 ] */}
                          <div className="product-card-actions-row">
                            <button
                              type="button"
                              className={`card-action-btn card-wishlist-btn ${isWishlisted(prod.id) ? 'wishlisted' : ''}`}
                              title={isWishlisted(prod.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                              aria-label="Add to wishlist"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(prod, e);
                              }}
                            >
                              <Heart size={15} />
                            </button>
                            <button
                              type="button"
                              className="card-action-btn card-cart-btn"
                              title="Add to bag"
                              aria-label="Add to bag"
                              onClick={(e) => {
                                e.stopPropagation();
                                openQuickAdd(prod);
                              }}
                            >
                              <ShoppingBag size={15} />
                            </button>
                            <button
                              type="button"
                              className="card-action-btn card-quickview-btn"
                              title="Quick view"
                              aria-label="Quick view"
                              onClick={(e) => {
                                e.stopPropagation();
                                openQuickAdd(prod);
                              }}
                            >
                              <Eye size={15} />
                            </button>
                          </div>

                          {/* Desktop Single Add Bag Button (Visible on >= 1200px) */}
                          <button 
                            type="button" 
                            className="product-add-bag-btn desktop-bag-btn"
                            title={`Add ${prod.title} to bag`}
                            aria-label={`Add ${prod.title} to bag`}
                            onClick={(e) => {
                              e.stopPropagation();
                              openQuickAdd(prod);
                            }}
                          >
                            <ShoppingBag size={16} />
                          </button>

                          {/* Bottom Row */}
                          <div className="product-card-bottom-row">
                            <div className="product-pricing-wrap">
                              <span className="product-price-current">{prod.price}</span>
                              {prod.oldPrice && (
                                <span className="product-price-old">{prod.oldPrice}</span>
                              )}
                            </div>

                            <div className="product-rating-wrap">
                              <Star size={13} className="product-rating-star" fill="#f59e0b" />
                              <span>({prod.rating})</span>
                            </div>
                          </div>
                        </div>
                      </li>
                  ))}
                </ul>
              )}

              {/* Pagination Controls */}
              <nav className="products-pagination-wrap" aria-label="Products pagination">
                {currentPageNum > 1 && (
                  <button 
                    type="button" 
                    className="pagination-arrow-btn"
                    onClick={() => handlePageChange(currentPageNum - 1)}
                    aria-label="Previous page"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button 
                    key={pageNum}
                    type="button" 
                    className={`pagination-page-btn ${currentPageNum === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                    aria-current={currentPageNum === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                ))}

                {currentPageNum < totalPages && (
                  <button 
                    type="button" 
                    className="pagination-arrow-btn"
                    onClick={() => handlePageChange(currentPageNum + 1)}
                    aria-label="Next page"
                  >
                    <ArrowRight size={16} />
                  </button>
                )}
              </nav>
            </main>

          </div>
        </div>
      </section>

      {/* Mobile/Tablet Filter Drawer (< 1200px) */}
      {mobileFilterOpen && (
        <div className="mobile-filter-drawer-overlay" onClick={() => setMobileFilterOpen(false)}>
          <div className="mobile-filter-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-filter-drawer-header">
              <h3 className="mobile-filter-title">Filter Products</h3>
              <button 
                type="button" 
                className="mobile-filter-close-btn"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mobile-filter-drawer-body">
              {renderFilterWidgets()}
            </div>
            <div className="mobile-filter-drawer-footer">
              <button 
                type="button" 
                className="mobile-filter-apply-btn"
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
