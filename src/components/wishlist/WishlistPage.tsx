import React, { useEffect } from 'react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { useWishlist, type WishlistProduct } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './WishlistPage.css';

const WISHLIST_BREADCRUMB_BG = 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-breadcrumb.jpg?v=1742473987&width=1920';

interface WishlistPageProps {
  onNavigateHome?: () => void;
  onNavigateShop?: () => void;
  onSelectProduct?: (handleOrId: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  onNavigateHome,
  onNavigateShop,
  onSelectProduct
}) => {
  const { wishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { openQuickAdd } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Wishlist - Jelwo';
    return () => {
      document.title = "Jelwo - World's Best Fine Jewelry";
    };
  }, []);

  const handleAddToCart = (item: WishlistProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickAdd(item);
  };

  return (
    <div className={`wishlist-page-container ${wishlist.length === 0 ? 'is-empty' : ''}`}>
      {/* 1. Breadcrumb Area matching User's Screenshot */}
      <section 
        className="wishlist-breadcrumb-area" 
        aria-label="Wishlist Banner"
        style={{ backgroundImage: `url(${WISHLIST_BREADCRUMB_BG})` }}
      >
        <img 
          src={WISHLIST_BREADCRUMB_BG} 
          alt="Jelwo Fine Jewelry Wishlist Banner" 
          className="wishlist-breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="wishlist-breadcrumb-dark-tint" />

        <div className="wishlist-banner-content">
          {/* Breadcrumb text: HOME - WISHLIST */}
          <nav className="wishlist-breadcrumb-nav" aria-label="Breadcrumb">
            <button 
              type="button" 
              className="wishlist-breadcrumb-home-btn"
              onClick={onNavigateHome}
              title="Return to home page"
            >
              HOME
            </button>
            <span className="wishlist-breadcrumb-sep">-</span>
            <span className="wishlist-breadcrumb-current">WISHLIST</span>
          </nav>

          {/* Main Title: Wishlist */}
          <h1 className="wishlist-banner-title">Wishlist</h1>
        </div>
      </section>

      {/* 2. Main Wishlist Grid Section */}
      <main className={`wishlist-content-section ${wishlist.length === 0 ? 'is-empty' : ''}`} aria-label="Wishlist Products">
        <div className="wishlist-main-wrap">
          {wishlist.length === 0 ? (
            /* Empty State matching User's Screenshot */
            <div className="wishlist-empty-area">
              <p className="wishlist-empty-text">
                Your wishlist is empty{' '}
                <a
                  href="/collections"
                  className="wishlist-return-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateShop) {
                      onNavigateShop();
                    } else if (onNavigateHome) {
                      onNavigateHome();
                    }
                  }}
                >
                  return to store
                </a>
              </p>
            </div>
          ) : (
            /* Product Cards Grid matching Screenshot */
            <div className="wishlist-grid-row">
              {wishlist.map((item) => {
                const wishlisted = isWishlisted(item.id);
                return (
                  <div key={item.id} className="wishlist-card-wrapper">
                    <div 
                      className="wishlist-product-card"
                      onClick={() => onSelectProduct?.(item.handle)}
                    >
                      {/* Top-Left Discount Pill Badge (e.g. 68%) */}
                      {item.discount && (
                        <span className="wishlist-discount-badge" aria-label={`${item.discount} discount`}>
                          {item.discount}
                        </span>
                      )}

                      {/* Image Box with Alternate Angle Crossfade on Hover */}
                      <div className="wishlist-img-box">
                        {/* Top Floating Actions (Wishlist & Quick View) */}
                        <div className="card-floating-actions">
                          <button
                            type="button"
                            className={`card-action-btn wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
                            title="Remove from wishlist"
                            aria-label={`Remove ${item.title} from wishlist`}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromWishlist(item.id);
                            }}
                          >
                            <Heart size={18} strokeWidth={1.7} fill="none" />
                          </button>

                          <button
                            type="button"
                            className="card-action-btn quickview-btn"
                            title="Quick view"
                            aria-label={`Quick view ${item.title}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              openQuickAdd(item);
                            }}
                          >
                            <Eye size={18} strokeWidth={1.7} />
                          </button>
                        </div>

                        {/* Primary Image */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="wishlist-card-img img-primary"
                          loading="lazy"
                        />

                        {/* Secondary Image for Hover */}
                        {item.hoverImage && (
                          <img
                            src={item.hoverImage}
                            alt={`${item.title} alternate angle`}
                            className="wishlist-card-img img-secondary"
                            loading="lazy"
                          />
                        )}
                      </div>

                      {/* Card Information Body */}
                      <div className="wishlist-card-body">
                        {/* Title & Category Row with Square Bag Button on Right */}
                        <div className="wishlist-middle-row">
                          <div className="wishlist-info-left">
                            <h3 className="wishlist-item-title">
                              {item.title.toUpperCase()}
                            </h3>
                            <span className="wishlist-item-category">
                              {item.productType || 'Jewelry'}
                            </span>
                          </div>

                          {/* Square Shopping Bag Button */}
                          <button
                            type="button"
                            className="wishlist-bag-btn"
                            title={`Add ${item.title} to bag`}
                            aria-label={`Add ${item.title} to bag`}
                            onClick={(e) => handleAddToCart(item, e)}
                          >
                            <ShoppingBag size={15} strokeWidth={1.7} />
                          </button>
                        </div>

                        {/* Divider Line */}
                        <div className="wishlist-card-divider" />

                        {/* Price & Star Rating Row */}
                        <div className="wishlist-bottom-row">
                          <div className="wishlist-price-wrap">
                            <span className="wishlist-new-price">{item.price}</span>
                            {item.oldPrice && (
                              <span className="wishlist-old-price">{item.oldPrice}</span>
                            )}
                          </div>

                          <div className="wishlist-rating-wrap">
                            <Star size={13} fill="#f59e0b" color="#f59e0b" className="wishlist-star-icon" />
                            <span className="wishlist-rating-num">
                              ({item.rating > 0 ? item.rating.toFixed(item.rating % 1 === 0 ? 1 : 1) : '0'})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
