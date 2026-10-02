import React, { useState, useEffect } from 'react';
import { X, Star, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './QuickAddModal.css';

export const QuickAddModal: React.FC = () => {
  const { quickAddProduct, closeQuickAdd, addToCart } = useCart();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Gold');
  const [selectedSize, setSelectedSize] = useState('28');
  const [quantity, setQuantity] = useState(1);

  // Reset local state when product changes
  useEffect(() => {
    if (quickAddProduct) {
      setSelectedImgIndex(0);
      setSelectedColor(quickAddProduct.colors?.[0]?.name || 'Gold');
      setSelectedSize(quickAddProduct.sizes?.[0] || '28');
      setQuantity(1);
    }
  }, [quickAddProduct]);

  if (!quickAddProduct) return null;

  const currentImage =
    quickAddProduct.images[selectedImgIndex] ||
    quickAddProduct.images[0] ||
    'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-6.jpg?v=1741603703&width=720';

  const handleAddToCart = () => {
    addToCart({
      productId: quickAddProduct.id,
      handle: quickAddProduct.handle,
      title: quickAddProduct.title.toUpperCase(),
      price: quickAddProduct.price,
      rawPrice: quickAddProduct.rawPrice,
      image: currentImage,
      size: quickAddProduct.sizes.length > 0 ? selectedSize : undefined,
      color: selectedColor,
      quantity: quantity
    });

    closeQuickAdd();
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  return (
    <div className="quickadd-modal-overlay" onClick={closeQuickAdd}>
      <div
        className="quickadd-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick add ${quickAddProduct.title}`}
      >
        {/* Close Button (Top right X) */}
        <button
          type="button"
          className="quickadd-close-btn"
          onClick={closeQuickAdd}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="quickadd-modal-grid">
          {/* Left Column: Product Images (Matches Screenshot 4) */}
          <div className="quickadd-media-col">
            <div className="quickadd-main-image-wrap">
              <img
                src={currentImage}
                alt={quickAddProduct.title}
                className="quickadd-main-img"
              />
            </div>

            {/* Thumbnail Strip (Row of 5 images) */}
            <div className="quickadd-thumbs-row">
              {quickAddProduct.images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`quickadd-thumb-btn ${selectedImgIndex === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImgIndex(idx)}
                  aria-label={`Select product image ${idx + 1}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="quickadd-thumb-img" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details & Actions (Matches Screenshot 4) */}
          <div className="quickadd-details-col">
            <h2 className="quickadd-title">{quickAddProduct.title}</h2>

            {/* Star Rating */}
            <div className="quickadd-rating-row" aria-label="Rated 5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  fill="#f59e0b"
                  color="#f59e0b"
                  className="quickadd-star-icon"
                />
              ))}
            </div>

            {/* Pricing Row */}
            <div className="quickadd-price-row">
              <span className="quickadd-price-current">{quickAddProduct.price}</span>
              {quickAddProduct.oldPrice && (
                <span className="quickadd-price-old">{quickAddProduct.oldPrice}</span>
              )}
              {quickAddProduct.discount && (
                <span className="quickadd-discount-badge">{quickAddProduct.discount}</span>
              )}
            </div>

            <p className="quickadd-tax-note">
              Tax included. Shipping calculated at checkout.
            </p>

            {/* Stock Indicator */}
            <div className="quickadd-stock-indicator">
              <span className="quickadd-stock-dot" />
              <span>{quickAddProduct.stockCount || 16} in stock</span>
            </div>

            <div className="quickadd-divider" />

            {/* Description / Join Life note */}
            <p className="quickadd-description">
              {quickAddProduct.description}
            </p>

            {/* Color Swatches */}
            {quickAddProduct.colors && quickAddProduct.colors.length > 0 && (
              <div className="quickadd-option-group">
                <div className="quickadd-option-label">
                  Color: <strong>{selectedColor}</strong>
                </div>
                <div className="quickadd-color-swatches">
                  {quickAddProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={`quickadd-color-swatch ${selectedColor === color.name ? 'active' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Select color ${color.name}`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Options (if applicable) */}
            {quickAddProduct.sizes && quickAddProduct.sizes.length > 0 && (
              <div className="quickadd-option-group">
                <div className="quickadd-option-label">
                  Size: <strong>{selectedSize}</strong>
                </div>
                <div className="quickadd-size-swatches">
                  {quickAddProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`quickadd-size-btn ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="quickadd-quantity-wrap">
              <div className="quickadd-stepper">
                <button
                  type="button"
                  className="quickadd-stepper-btn"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="quickadd-stepper-val">{quantity}</span>
                <button
                  type="button"
                  className="quickadd-stepper-btn"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons Row (Matches Screenshot 4) */}
            <div className="quickadd-actions-row">
              <button
                type="button"
                className="quickadd-btn-add-cart"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
              <button
                type="button"
                className="quickadd-btn-buy-now"
                onClick={handleBuyNow}
              >
                BUY IT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
