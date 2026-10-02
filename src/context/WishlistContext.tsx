import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WishlistProduct {
  id: string;
  handle: string;
  title: string;
  productType: string;
  discount: string | null;
  price: string;
  oldPrice: string | null;
  rating: number;
  reviewsCount?: number;
  image: string;
  hoverImage?: string;
}

export interface WishlistContextType {
  wishlist: WishlistProduct[];
  wishlistCount: number;
  isWishlisted: (idOrHandle: string) => boolean;
  toggleWishlist: (product: any, e?: React.MouseEvent) => boolean;
  addToWishlist: (product: any) => void;
  removeFromWishlist: (idOrHandle: string) => void;
  clearWishlist: () => void;
  toastMessage: string | null;
  hideToast: () => void;
}

const INITIAL_WISHLIST: WishlistProduct[] = [
  {
    id: 'prod-7',
    handle: 'drop-gold-earrings',
    title: 'DROP GOLD EARRINGS',
    productType: 'Jewelry',
    discount: '68%',
    price: 'From Rs. 14.00',
    oldPrice: 'Rs. 44.00',
    rating: 4.0,
    reviewsCount: 1,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-46.jpg?v=1742445430&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-47.jpg?v=1742445430&width=720'
  },
  {
    id: 'prod-8',
    handle: 'flora-diamond-bangle',
    title: 'FLORA DIAMOND BANGLE',
    productType: 'Jewelry',
    discount: null,
    price: 'Rs. 28.00',
    oldPrice: null,
    rating: 0,
    reviewsCount: 0,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-31.jpg?v=1742444512&width=720',
    hoverImage: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-32.jpg?v=1742444512&width=720'
  }
];

export function normalizeToWishlistProduct(product: any): WishlistProduct {
  if (!product) {
    return {
      id: 'unknown-' + Date.now(),
      handle: 'jewelry-product',
      title: 'JEWELRY ITEM',
      productType: 'Jewelry',
      discount: null,
      price: 'Rs. 20.00',
      oldPrice: null,
      rating: 5,
      image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-46.jpg?v=1742445430&width=720'
    };
  }

  const rawTitle = (product.title || '').trim();
  const handle = product.handle || 
    rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
    'product';

  const image = product.image || 
    product.images?.primary || 
    product.images?.[0] || 
    'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-46.jpg?v=1742445430&width=720';

  const hoverImage = product.hoverImage || 
    product.images?.secondary || 
    product.images?.[1] || 
    image;

  let priceStr = 'Rs. 20.00';
  if (product.priceFormatted) {
    priceStr = product.priceFormatted;
  } else if (typeof product.price === 'string') {
    priceStr = product.price;
  } else if (typeof product.price === 'number') {
    priceStr = `Rs. ${product.price.toFixed(2)}`;
  }

  let oldPriceStr: string | null = null;
  if (product.oldPrice) {
    oldPriceStr = product.oldPrice;
  } else if (product.compareAtPriceFormatted) {
    oldPriceStr = product.compareAtPriceFormatted;
  } else if (typeof product.compareAtPrice === 'number' && product.compareAtPrice > 0) {
    oldPriceStr = `Rs. ${product.compareAtPrice.toFixed(2)}`;
  }

  const discountStr = product.discount || product.discountPercent || null;

  return {
    id: String(product.id || handle),
    handle,
    title: rawTitle.toUpperCase(),
    productType: product.productType || product.category || 'Jewelry',
    discount: discountStr,
    price: priceStr,
    oldPrice: oldPriceStr,
    rating: typeof product.rating === 'number' ? product.rating : 0,
    reviewsCount: product.reviewsCount ?? product.reviewCount ?? 0,
    image,
    hoverImage
  };
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'jelwo_wishlist_v1';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      } catch (err) {
        console.warn('Error reading wishlist from localStorage:', err);
      }
    }
    return INITIAL_WISHLIST;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = React.useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (err) {
      console.warn('Error writing wishlist to localStorage:', err);
    }
  }, [wishlist]);

  const isWishlisted = (idOrHandle: string): boolean => {
    const term = String(idOrHandle).toLowerCase();
    return wishlist.some(
      (item) => item.id.toLowerCase() === term || item.handle.toLowerCase() === term
    );
  };

  const addToWishlist = (rawProduct: any) => {
    const normalized = normalizeToWishlistProduct(rawProduct);
    setWishlist((prev) => {
      const exists = prev.some(
        (item) => item.id === normalized.id || item.handle === normalized.handle
      );
      if (exists) return prev;
      return [normalized, ...prev];
    });
    showToast(`Added "${normalized.title}" to your wishlist!`);
  };

  const removeFromWishlist = (idOrHandle: string) => {
    const term = String(idOrHandle).toLowerCase();
    let removedTitle = 'Product';
    setWishlist((prev) => {
      const found = prev.find(
        (item) => item.id.toLowerCase() === term || item.handle.toLowerCase() === term
      );
      if (found) removedTitle = found.title;
      return prev.filter(
        (item) => item.id.toLowerCase() !== term && item.handle.toLowerCase() !== term
      );
    });
    showToast(`Removed "${removedTitle}" from your wishlist.`);
  };

  const toggleWishlist = (rawProduct: any, e?: React.MouseEvent): boolean => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const normalized = normalizeToWishlistProduct(rawProduct);
    const exists = wishlist.some(
      (item) => item.id === normalized.id || item.handle === normalized.handle
    );

    if (exists) {
      removeFromWishlist(normalized.id);
      return false;
    } else {
      addToWishlist(normalized);
      return true;
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared.');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isWishlisted,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        toastMessage,
        hideToast
      }}
    >
      {children}

      {/* Global floating toast notification */}
      {toastMessage && (
        <div className="jelwo-global-toast" role="status" aria-live="polite">
          <div className="toast-heart-indicator">♡</div>
          <span className="toast-text">{toastMessage}</span>
          <button 
            type="button" 
            className="toast-close-btn" 
            onClick={hideToast}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
