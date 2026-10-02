import React, { useState } from 'react';
import { ShoppingBag, X, Minus, Plus, Trash2, Truck, ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

interface RecommendedProduct {
  id: string;
  handle: string;
  title: string;
  price: string;
  rawPrice: number;
  oldPrice?: string;
  image: string;
}

const RECOMMENDED_PRODUCTS: RecommendedProduct[] = [
  {
    id: 'rec-1',
    handle: 'pearl-earrings',
    title: 'PEARL EARRINGS',
    price: 'Rs. 15.00',
    rawPrice: 15,
    oldPrice: 'Rs. 20.00',
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-6.jpg?v=1741603703&width=150'
  },
  {
    id: 'rec-2',
    handle: 'iamond-rashmi-ring',
    title: 'IAMOND RASHMI RING',
    price: 'Rs. 12.00',
    rawPrice: 12,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-11.jpg?v=1742443330&width=150'
  },
  {
    id: 'rec-3',
    handle: 'flower-pendant',
    title: 'FLOWER PENDANT',
    price: 'Rs. 22.00',
    rawPrice: 22,
    oldPrice: 'Rs. 28.00',
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-11.jpg?v=1741605562&width=150'
  },
  {
    id: 'rec-4',
    handle: 'sherbi-ring',
    title: 'SHERBI RING',
    price: 'Rs. 26.00',
    rawPrice: 26,
    oldPrice: 'Rs. 30.00',
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-1.jpg?v=1741608272&width=150'
  }
];

const FREE_SHIPPING_THRESHOLD = 100;

export const CartDrawer: React.FC = () => {
  const {
    cart,
    subtotal,
    subtotalFormatted,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    openQuickAdd
  } = useCart();

  const [notesOpen, setNotesOpen] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [recIndex, setRecIndex] = useState(0);

  if (!isCartOpen) return null;

  const isEmpty = cart.length === 0;

  // Free shipping calculation
  const amountRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handlePrevRec = () => {
    setRecIndex((prev) => (prev > 0 ? prev - 1 : RECOMMENDED_PRODUCTS.length - 1));
  };

  const handleNextRec = () => {
    setRecIndex((prev) => (prev < RECOMMENDED_PRODUCTS.length - 1 ? prev + 1 : 0));
  };

  const currentRec = RECOMMENDED_PRODUCTS[recIndex] || RECOMMENDED_PRODUCTS[0];

  return (
    <div className="cart-drawer-backdrop" onClick={closeCart}>
      <aside
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Top Promo Banner (Matches Screenshot 1 & 2) */}
        <div className="cart-promo-top-bar">
          <span>
            New customers save 10% with code <strong>WELCOME10</strong>
          </span>
        </div>

        {/* Drawer Header */}
        <header className="cart-drawer-header">
          <h2 className="cart-drawer-title">My shopping cart</h2>
          <button
            type="button"
            className="cart-drawer-close-btn"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </header>

        {/* Cart Body */}
        {isEmpty ? (
          /* Empty State (Matches Screenshot 1) */
          <div className="cart-empty-body">
            <div className="cart-empty-center">
              <div className="cart-empty-icon-wrap">
                <ShoppingBag size={40} strokeWidth={1.2} />
              </div>
              <h3 className="cart-empty-heading">Your cart is empty</h3>
              <button
                type="button"
                className="cart-continue-btn"
                onClick={closeCart}
              >
                CONTINUE SHOPPING
              </button>
            </div>

            {/* "You might also like" for Empty State */}
            <div className="cart-recommendations-section">
              <div className="cart-rec-header">
                <h4 className="cart-rec-title">You might also like</h4>
                <div className="cart-rec-arrows">
                  <button
                    type="button"
                    className="cart-arrow-btn"
                    onClick={handlePrevRec}
                    aria-label="Previous recommendation"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="cart-arrow-btn"
                    onClick={handleNextRec}
                    aria-label="Next recommendation"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div
                className="cart-rec-card"
                onClick={() => openQuickAdd(currentRec)}
                title={`Quick view ${currentRec.title}`}
              >
                <div className="cart-rec-img-wrap">
                  <img
                    src={currentRec.image}
                    alt={currentRec.title}
                    className="cart-rec-img"
                  />
                </div>
                <div className="cart-rec-info">
                  <h5 className="cart-rec-product-title">{currentRec.title}</h5>
                  <div className="cart-rec-pricing">
                    <span className="cart-rec-price-current">{currentRec.price}</span>
                    {currentRec.oldPrice && (
                      <span className="cart-rec-price-old">{currentRec.oldPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Cart With Items (Matches Screenshots 2 & 3) */
          <div className="cart-filled-body">
            {/* Free Shipping Progress Notice (Matches Screenshot 2) */}
            <div className="cart-free-shipping-wrap">
              <p className="cart-free-shipping-text">
                {amountRemaining > 0 ? (
                  <>
                    Spend <strong>Rs. {amountRemaining.toFixed(2)}</strong> more and get free shipping!
                  </>
                ) : (
                  <span className="cart-shipping-unlocked">
                    🎉 You've unlocked free shipping!
                  </span>
                )}
              </p>
              <div className="cart-progress-bar-track">
                <div
                  className="cart-progress-bar-fill"
                  style={{ width: `${freeShippingProgress}%` }}
                >
                  <div className="cart-progress-truck-badge">
                    <Truck size={13} strokeWidth={2} />
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Cart Items List */}
            <div className="cart-items-scroll-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-img-wrap">
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                  </div>

                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.title}</h4>
                    <div className="cart-item-price">{item.price}</div>

                    {item.size && (
                      <div className="cart-item-option">
                        <span>Size: </span>
                        <strong>{item.size},</strong>
                      </div>
                    )}
                    {item.color && (
                      <div className="cart-item-option">
                        <span>Color: </span>
                        <strong>{item.color}</strong>
                      </div>
                    )}

                    <div className="cart-item-actions-row">
                      <div className="cart-item-stepper">
                        <button
                          type="button"
                          className="cart-stepper-btn"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="cart-stepper-val">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-stepper-btn"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-item-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* "You might also like" in filled cart (Matches Screenshot 2 & 3) */}
              <div className="cart-recommendations-section filled-cart-rec">
                <div className="cart-rec-header">
                  <h4 className="cart-rec-title">You might also like</h4>
                  <div className="cart-rec-arrows">
                    <button
                      type="button"
                      className="cart-arrow-btn"
                      onClick={handlePrevRec}
                      aria-label="Previous recommendation"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="button"
                      className="cart-arrow-btn"
                      onClick={handleNextRec}
                      aria-label="Next recommendation"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                <div
                  className="cart-rec-card"
                  onClick={() => openQuickAdd(currentRec)}
                  title={`Quick view ${currentRec.title}`}
                >
                  <div className="cart-rec-img-wrap">
                    <img
                      src={currentRec.image}
                      alt={currentRec.title}
                      className="cart-rec-img"
                    />
                  </div>
                  <div className="cart-rec-info">
                    <h5 className="cart-rec-product-title">{currentRec.title}</h5>
                    <div className="cart-rec-pricing">
                      <span className="cart-rec-price-current">{currentRec.price}</span>
                      {currentRec.oldPrice && (
                        <span className="cart-rec-price-old">{currentRec.oldPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Drawer Footer (Matches Screenshot 3) */}
            <footer className="cart-drawer-footer">
              {/* Order special instructions Accordion */}
              <div className="cart-instructions-accordion">
                <button
                  type="button"
                  className="cart-instructions-toggle"
                  onClick={() => setNotesOpen(!notesOpen)}
                  aria-expanded={notesOpen}
                >
                  <span>Order special instructions</span>
                  {notesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {notesOpen && (
                  <div className="cart-instructions-content">
                    <textarea
                      className="cart-instructions-textarea"
                      placeholder="Special instructions or gift notes for your order..."
                      rows={3}
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Subtotal Row */}
              <div className="cart-subtotal-row">
                <span className="cart-subtotal-label">Subtotal</span>
                <span className="cart-subtotal-val">{subtotalFormatted}</span>
              </div>

              <p className="cart-disclaimer-text">
                Taxes, discounts and shipping calculated at checkout.
              </p>

              {/* Action Buttons Row */}
              <div className="cart-footer-buttons-row">
                <button
                  type="button"
                  className="cart-btn-view-cart"
                  onClick={closeCart}
                >
                  VIEW CART
                </button>
                <button
                  type="button"
                  className="cart-btn-checkout"
                  onClick={() => {
                    alert(`Proceeding to checkout with subtotal: ${subtotalFormatted}`);
                  }}
                >
                  CHECKOUT
                </button>
              </div>
            </footer>
          </div>
        )}
      </aside>
    </div>
  );
};
