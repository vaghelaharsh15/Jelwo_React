import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { products, type Product } from '../../data/products';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './JewelryProductGrid.css';

export interface JewelryProductGridProps {
  onSelectProduct?: (handle: string) => void;
}

export const JewelryProductGrid: React.FC<JewelryProductGridProps> = ({ onSelectProduct }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { openQuickAdd } = useCart();
  const [selectedTab, setSelectedTab] = useState<'NEW PRODUCT' | 'TRENDING PRODUCT' | 'BEST SELLER'>('NEW PRODUCT');
  const [showAll, setShowAll] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickAdd(product);
  };

  // Filter products by active tab
  const getTabProducts = (): Product[] => {
    switch (selectedTab) {
      case 'NEW PRODUCT':
        // The first 4 in the list match  3 exactly
        return products;
      case 'TRENDING PRODUCT':
        // Trending rings, bangles & bracelets
        return products.filter(
          (p) =>
            p.title.toLowerCase().includes('ring') ||
            p.title.toLowerCase().includes('bangle') ||
            p.title.toLowerCase().includes('bracelet')
        );
      case 'BEST SELLER':
        // Highest rated / discounted products
        return [...products].sort((a, b) => (b.discountPercent ? 1 : 0) - (a.discountPercent ? 1 : 0));
      default:
        return products;
    }
  };

  const currentTabProducts = getTabProducts();
  // In  3, exactly 4 products are displayed initially with a "VIEW ALL" button below
  const visibleProducts = showAll ? currentTabProducts : currentTabProducts.slice(0, 4);

  return (
    <section className="great-selection-section" id="collection-template" aria-label="Great Selection Products">
      <div className="wide-content-container">
        {/* Section Header (Matches 2nd ) */}
        <div className="great-selection-header">
          <span className="great-selection-subtitle">NEW ARRIVALS</span>
          <h2 className="great-selection-title">Great selection</h2>

          {/* 3 Filter Tabs */}
          <div className="great-selection-tabs">
            {(['NEW PRODUCT', 'TRENDING PRODUCT', 'BEST SELLER'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`great-tab-btn ${selectedTab === tab ? 'active' : ''}`}
                onClick={() => {
                  setSelectedTab(tab);
                  setShowAll(false);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Product Grid (Matches 3rd ) */}
        <ul className="product-view grid-4" id="product-grid">
          {visibleProducts.map((product) => {
            const isHovered = hoveredProduct === product.id;

            return (
              <li key={product.id} className="st-col-item">
                <div
                  className="great-product-card"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Image Box */}
                  <div className="card-image-box">
                    <a 
                      className="card-img-link" 
                      href={product.url}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectProduct?.(product.handle);
                      }}
                    >
                      <div className="card-img-wrap">
                        <img
                          src={product.images.primary}
                          alt={product.title}
                          className={`card-img primary-img ${isHovered ? 'img-hidden' : 'img-visible'}`}
                          loading="lazy"
                        />
                        <img
                          src={product.images.secondary}
                          alt={`${product.title} alternate angle`}
                          className={`card-img secondary-img ${isHovered ? 'img-visible' : 'img-hidden'}`}
                          loading="lazy"
                        />
                      </div>
                    </a>

                    {/* Green Discount Pill Badge (Matches 3rd : 45%, 25%) */}
                    {product.discountPercent && (
                      <div className="green-discount-badge" aria-label={`${product.discountPercent} discount`}>
                        {product.discountPercent}
                      </div>
                    )}

                    {/* Floating Wishlist & Quick View Actions */}
                    <div className="card-floating-actions">
                      <button
                        type="button"
                        className={`card-action-btn wishlist-btn ${isWishlisted(product.id) ? 'wishlisted' : ''}`}
                        onClick={(e) => toggleWishlist(product, e)}
                        title={isWishlisted(product.id) ? 'In wishlist' : 'Add to wishlist'}
                        aria-label={`Wishlist ${product.title}`}
                      >
                        <Heart
                          size={18}
                          strokeWidth={1.7}
                          fill="none"
                        />
                      </button>

                      <button
                        type="button"
                        className="card-action-btn quickview-btn"
                        onClick={() => openQuickAdd(product)}
                        title="Quick view"
                        aria-label={`Quick view ${product.title}`}
                      >
                        <Eye size={18} strokeWidth={1.7} />
                      </button>
                    </div>
                  </div>

                  {/* Card Content (Matches 3rd ) */}
                  <div className="card-content-box">
                    {/* Top Row: Title + Category on Left, Square Bag Button on Right */}
                    <div className="card-info-top-row">
                      <div className="card-title-group">
                        <h6 className="card-product-title">
                          <a 
                            href={product.url} 
                            title={product.title}
                            onClick={(e) => {
                              e.preventDefault();
                              onSelectProduct?.(product.handle);
                            }}
                          >
                            {product.title.toUpperCase()}
                          </a>
                        </h6>
                        <span className="card-product-category">{product.productType}</span>
                      </div>

                      {/* Square Outline Bag Button */}
                      <button
                        type="button"
                        className="card-square-cart-btn"
                        onClick={(e) => handleAddToCart(product, e)}
                        title="Add to cart"
                        aria-label={`Add ${product.title} to cart`}
                      >
                        <ShoppingBag size={15} strokeWidth={1.8} />
                      </button>
                    </div>

                    {/* Horizontal Divider Line */}
                    <div className="card-divider-line" />

                    {/* Bottom Row: Price on Left, Rating on Right */}
                    <div className="card-price-rating-row">
                      <div className="card-price-wrap">
                        <span className="card-new-price">{product.priceFormatted}</span>
                        {product.compareAtPriceFormatted && (
                          <span className="card-old-price">{product.compareAtPriceFormatted}</span>
                        )}
                      </div>

                      <div className="card-rating-wrap">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" className="card-star-icon" />
                        <span className="card-rating-num">
                          ({product.rating > 0 ? product.rating.toFixed(product.rating % 1 === 0 ? 1 : 2) : '5.0'})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* View All Centered Button (Matches 3rd ) */}
        {currentTabProducts.length > 4 && (
          <div className="view-all-wrap">
            <button
              type="button"
              className="view-all-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'SHOW LESS' : 'VIEW ALL'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
