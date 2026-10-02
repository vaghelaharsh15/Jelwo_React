import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string; // unique cart item key: e.g. `${productId}-${size}-${color}`
  productId: string;
  handle: string;
  title: string;
  price: string;
  rawPrice: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
}

export interface QuickAddProduct {
  id: string;
  handle: string;
  title: string;
  category?: string;
  price: string;
  rawPrice: number;
  oldPrice?: string | null;
  rawOldPrice?: number | null;
  discount?: string | null;
  rating: number;
  reviewsCount?: number;
  inStock: boolean;
  stockCount: number;
  description: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
}

export interface AddToCartPayload {
  productId: string;
  handle: string;
  title: string;
  price: string;
  rawPrice: number;
  image: string;
  size?: string;
  color?: string;
  quantity?: number;
}

export interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  subtotalFormatted: string;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (payload: AddToCartPayload) => void;
  updateQuantity: (id: string, deltaOrQuantity: number, isAbsolute?: boolean) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  // Quick View / Quick Add Modal
  quickAddProduct: QuickAddProduct | null;
  openQuickAdd: (productOrHandleOrId: any) => void;
  closeQuickAdd: () => void;
}

const CART_STORAGE_KEY = 'jelwo_shopping_cart_v1';

// Initial items matching Screenshot 2 & 3:
// Item 1: GLITTER DIAMOND RING (Rs. 10.00, Size: 28, Color: Gold, Qty: 1)
// Item 2: GOLD NOSE PIN (Rs. 12.00, Color: Gold, Qty: 1)
// Total = Rs. 22.00
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'prod-16-28-Gold',
    productId: 'prod-16',
    handle: 'glitter-diamond-ring',
    title: 'GLITTER DIAMOND RING',
    price: 'Rs. 10.00',
    rawPrice: 10,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-51.jpg?v=1742445540&width=720',
    size: '28',
    color: 'Gold',
    quantity: 1
  },
  {
    id: 'prod-17-default-Gold',
    productId: 'prod-17',
    handle: 'gold-nose-pin',
    title: 'GOLD NOSE PIN',
    price: 'Rs. 12.00',
    rawPrice: 12,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-41.jpg?v=1742444936&width=720',
    color: 'Gold',
    quantity: 1
  }
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved !== null) {
          return JSON.parse(saved);
        }
      } catch (err) {
        console.error('Failed to parse cart from storage:', err);
      }
    }
    return INITIAL_CART_ITEMS;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState<QuickAddProduct | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to storage:', err);
    }
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (payload: AddToCartPayload) => {
    const qty = payload.quantity && payload.quantity > 0 ? payload.quantity : 1;
    const size = payload.size || '';
    const color = payload.color || '';
    const itemKey = `${payload.productId}-${size}-${color}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: itemKey,
          productId: payload.productId,
          handle: payload.handle,
          title: payload.title,
          price: payload.price,
          rawPrice: payload.rawPrice,
          image: payload.image,
          size: payload.size,
          color: payload.color,
          quantity: qty
        };
        return [newItem, ...prev];
      }
    });

    // Automatically open the cart drawer so user sees their added item immediately
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, deltaOrQuantity: number, isAbsolute: boolean = false) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = isAbsolute ? deltaOrQuantity : item.quantity + deltaOrQuantity;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Convert any product object or handle to QuickAddProduct
  const openQuickAdd = (productInput: any) => {
    if (!productInput) return;

    let productObj: any = productInput;

    // If a string (handle or id) was passed, or if incomplete product was passed:
    const title = productObj.title || 'Simple Pearl earrings';
    const titleLower = title.toLowerCase();

    // Check if it's Pearl Earrings (matches Screenshot 4)
    const isPearlEarrings = 
      titleLower.includes('pearl') || 
      titleLower.includes('earring') && titleLower.includes('simple') ||
      productObj.handle === 'pearl-earrings' ||
      productObj.id === 'prod-20' ||
      productObj.id === 'prod-23';

    let images: string[] = [];

    if (isPearlEarrings) {
      // Exact 5 images from Screenshot 4
      images = [
        'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-6.jpg?v=1741603703&width=720',
        'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-7.jpg?v=1741603703&width=720',
        'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-8.jpg?v=1741603703&width=720',
        'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-9.jpg?v=1741603703&width=720',
        'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-10.jpg?v=1741603703&width=720'
      ];
    } else {
      const primary = productObj.image || productObj.images?.primary || productObj.images?.[0] || 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-51.jpg?v=1742445540&width=720';
      const secondary = productObj.hoverImage || productObj.images?.secondary || productObj.images?.[1] || primary;
      images = [
        primary,
        secondary,
        'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-58.jpg?v=1741670785',
        'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-59.jpg?v=1741670785',
        'https://jelwo.myshopify.com/cdn/shop/files/jewelry-pro-60.jpg?v=1741670785'
      ];
    }

    const rawPrice = typeof productObj.rawPrice === 'number' 
      ? productObj.rawPrice 
      : typeof productObj.price === 'number'
      ? productObj.price
      : 15;

    const priceFormatted = productObj.priceFormatted || 
      (typeof productObj.price === 'string' ? productObj.price : `Rs. ${rawPrice.toFixed(2)}`);

    const oldPriceFormatted = productObj.compareAtPriceFormatted || 
      productObj.oldPrice || 
      (isPearlEarrings ? 'Rs. 20.00' : (productObj.discount ? `Rs. ${(rawPrice * 1.33).toFixed(2)}` : null));

    const discountFormatted = productObj.discountPercent || 
      productObj.discount || 
      (isPearlEarrings ? 'Sale 25%' : null);

    const quickProduct: QuickAddProduct = {
      id: productObj.id ? String(productObj.id) : `quick-${Date.now()}`,
      handle: productObj.handle || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: isPearlEarrings ? 'Simple Pearl earrings' : title,
      category: productObj.category || productObj.productType || 'Jewelry',
      price: priceFormatted,
      rawPrice: rawPrice,
      oldPrice: oldPriceFormatted,
      rawOldPrice: isPearlEarrings ? 20 : (oldPriceFormatted ? rawPrice * 1.33 : null),
      discount: discountFormatted,
      rating: productObj.rating > 0 ? productObj.rating : 5,
      reviewsCount: productObj.reviewsCount || 1,
      inStock: true,
      stockCount: 16,
      description: productObj.description || 'Care for fiber: 30% more recycled polyester. We label garments manufactured using environmentally friendly technologies and raw materials with the Join Life label.',
      images: images,
      colors: [
        { name: 'Gold', hex: '#DAA520' },
        { name: 'Bronze', hex: '#8c4a2a' },
        { name: 'Silver', hex: '#D1D5DB' }
      ],
      sizes: productObj.sizes || (titleLower.includes('ring') ? ['28', '29', '30'] : [])
    };

    setQuickAddProduct(quickProduct);
  };

  const closeQuickAdd = () => {
    setQuickAddProduct(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + (item.rawPrice * item.quantity), 0);
  const subtotalFormatted = `Rs. ${subtotal.toFixed(2)}`;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        subtotalFormatted,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        quickAddProduct,
        openQuickAdd,
        closeQuickAdd
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
