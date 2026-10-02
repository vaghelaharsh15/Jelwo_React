import React, { useState } from 'react';
import { ShoppingBag, Heart, Eye, Star } from 'lucide-react';
import { products, type Product } from '../../data/products';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './PopularProductsSection.css';

// The exact 4 products in Screenshot 1 in order:
// 1. FLOWER NOSE PIN
// 2. IAMOND RASHMI RING
// 3. ROSE GOLD RINGS (45% OFF)
// 4. PEARL EARRINGS (25% OFF)
const POPULAR_PRODUCT_HANDLES = [
  'flower-nose-pin',
  'iamond-rashmi-ring',
  'rose-gold-rings',
  'pearl-earrings'
];

export interface PopularProductsSectionProps {
  onSelectProduct?: (handle: string) => void;
}

export const PopularProductsSection: React.FC<PopularProductsSectionProps> = ({ onSelectProduct }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { openQuickAdd } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Retrieve products in exact screenshot order with fallback
  const popularProducts: Product[] = POPULAR_PRODUCT_HANDLES.map((handle) => {
    return products.find((p) => p.handle === handle) || products[0];
  });

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickAdd(product);
  };

  return (
    <section className="popular-products-section" aria-label="Popular Products Selection">
      <div className="popular-container">
        {/* Section Header (Matches 1st Screenshot: Centered Subtitle & Title) */}
        <div className="popular-section-header">
          <span className="popular-section-subtitle">JEWELRY SELECTION</span>
          <h2 className="popular-section-title">Popular product</h2>
        </div>

        {/* 4-Column Product Grid (Matches 1st Screenshot) */}
        <div className="popular-grid">
          {popularProducts.map((product) => {
            const isHovered = hoveredProduct === product.id;
            const wishlisted = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                className="popular-card"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image Box */}
                <div className="popular-image-box">
                  <a 
                    className="popular-img-link" 
                    href={product.url}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectProduct?.(product.handle);
                    }}
                  >
                    <div className="popular-img-wrap">
                      <img
                        src={product.images.primary}
                        alt={product.title}
                        className={`popular-img primary-img ${isHovered ? 'img-hidden' : 'img-visible'}`}
                        loading="lazy"
                      />
                      <img
                        src={product.images.secondary}
                        alt={`${product.title} alternate angle`}
                        className={`popular-img secondary-img ${isHovered ? 'img-visible' : 'img-hidden'}`}
                        loading="lazy"
                      />
                    </div>
                  </a>

                  {/* Green Discount Pill Badge (45%, 25%) */}
                  {product.discountPercent && (
                    <div className="popular-discount-badge" aria-label={`${product.discountPercent} discount`}>
                      {product.discountPercent}
                    </div>
                  )}

                  {/* Quick Action Floating Controls */}
                  <div className="popular-floating-actions">
                    <button
                      type="button"
                      className={`popular-action-icon-btn ${wishlisted ? 'active' : ''}`}
                      onClick={(e) => toggleWishlist(product, e)}
                      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      title={wishlisted ? 'In wishlist' : 'Add to wishlist'}
                    >
                      <Heart size={18} strokeWidth={1.7} fill="none" />
                    </button>
                    <button
                      type="button"
                      className="popular-action-icon-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        openQuickAdd(product);
                      }}
                      aria-label="Quick view"
                      title="Quick view"
                    >
                      <Eye size={18} strokeWidth={1.7} />
                    </button>
                  </div>
                </div>

                {/* Card Information Content */}
                <div className="popular-info">
                  <div className="popular-title-row">
                    <div className="popular-title-wrap">
                      <h3 className="popular-card-title">
                        <a 
                          href={product.url}
                          onClick={(e) => {
                            e.preventDefault();
                            onSelectProduct?.(product.handle);
                          }}
                        >
                          {product.title}
                        </a>
                      </h3>
                      <span className="popular-card-category">{product.productType}</span>
                    </div>

                    {/* Square Cart Button */}
                    <button
                      type="button"
                      className="popular-cart-btn"
                      onClick={(e) => handleAddToCart(product, e)}
                      aria-label={`Add ${product.title} to cart`}
                      title="Add to cart"
                    >
                      <ShoppingBag size={16} strokeWidth={1.8} />
                    </button>
                  </div>

                  {/* Divider Line */}
                  <div className="popular-card-divider" />

                  {/* Pricing and Star Rating Row */}
                  <div className="popular-bottom-row">
                    <div className="popular-pricing">
                      <span className="popular-price-current">{product.priceFormatted}</span>
                      {product.compareAtPriceFormatted && (
                        <span className="popular-price-old">{product.compareAtPriceFormatted}</span>
                      )}
                    </div>

                    <div className="popular-rating" aria-label={`Rated ${product.rating} stars`}>
                      <Star size={13} className="popular-star-icon" fill="#f59e0b" color="#f59e0b" />
                      <span className="popular-rating-text">({product.rating.toFixed(product.rating % 1 === 0 ? 1 : 2)})</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered VIEW COLLECTION Button (Matches 2nd Screenshot) */}
        <div className="popular-view-collection-wrap">
          <a href="/collections/all" className="popular-view-collection-btn">
            VIEW COLLECTION
          </a>
        </div>
      </div>
    </section>
  );
};
