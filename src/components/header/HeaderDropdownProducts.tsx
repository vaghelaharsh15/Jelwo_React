import React, { useState } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface CategoryItem {
  title: string;
  handle: string;
}

interface CategoryColumn {
  title: string;
  items: CategoryItem[];
}

const PRODUCT_CATEGORIES: CategoryColumn[] = [
  {
    title: 'Bracelets',
    items: [
      { title: 'Modish bracelet', handle: 'modish-bracelet' },
      { title: 'Floral gold bangle', handle: 'floral-gold-bangle' },
      { title: 'Twister bangle', handle: 'twister-bangle' },
      { title: 'Classic gold bangle', handle: 'floral-gold-bangle' },
      { title: 'Diamond charm bracelet', handle: 'modish-bracelet' },
      { title: 'Minimalist open cuff', handle: 'twister-bangle' }
    ]
  },
  {
    title: 'Earrings',
    items: [
      { title: 'Pearl earrings', handle: 'pearl-earrings' },
      { title: 'Drop earrings', handle: 'drop-earrings' },
      { title: 'Flower jhumka', handle: 'flower-jhumka' },
      { title: 'Simple Pearl earrings', handle: 'pearl-earrings' },
      { title: 'Glitter diamond studs', handle: 'drop-earrings' },
      { title: 'Chandelier earrings', handle: 'flower-jhumka' }
    ]
  },
  {
    title: 'Necklace',
    items: [
      { title: 'Flower pendant', handle: 'flower-pendant' },
      { title: 'Diamond rashmi necklace', handle: 'flower-pendant' },
      { title: 'Rose gold pendant', handle: 'flower-pendant' },
      { title: 'Gold chain pendant', handle: 'flower-pendant' },
      { title: 'Floral emerald pendant', handle: 'flower-pendant' },
      { title: 'Solitaire charm pendant', handle: 'flower-pendant' }
    ]
  },
  {
    title: 'Rings',
    items: [
      { title: 'Rose gold rings', handle: 'rose-gold-rings' },
      { title: 'Iamond rashmi ring', handle: 'iamond-rashmi-ring' },
      { title: 'Diamond rings', handle: 'diamond-rings' },
      { title: 'Sherbi ring', handle: 'sherbi-ring' },
      { title: 'Flower nose pin', handle: 'flower-nose-pin' },
      { title: 'Gold nose pin', handle: 'flower-nose-pin' }
    ]
  }
];

export interface HeaderDropdownProductsProps {
  onSelectProduct?: (handle: string) => void;
}

export const HeaderDropdownProducts: React.FC<HeaderDropdownProductsProps> = ({ onSelectProduct }) => {
  const { openQuickAdd } = useCart();
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setStartIndex((prev) => (prev > 0 ? prev - 1 : products.length - 2));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setStartIndex((prev) => (prev < products.length - 2 ? prev + 1 : 0));
  };

  const visibleProducts = [
    products[startIndex % products.length],
    products[(startIndex + 1) % products.length]
  ];

  return (
    <div className="mega-dropdown mega-dropdown-products">
      <div className="container mega-container">
        <div className="products-dropdown-layout">
          {/* 4 Category Columns */}
          <div className="products-categories-grid">
            {PRODUCT_CATEGORIES.map((col, idx) => (
              <div key={idx} className="category-nav-column">
                <h4 className="category-column-heading">{col.title}</h4>
                <ul className="category-item-list">
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href={`/products/${item.handle}`}
                        className="category-item-link"
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectProduct?.(item.handle);
                        }}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Popular Collection Showcase powered by products.json */}
          <div className="products-popular-section">
            <div className="popular-header">
              <h3 className="popular-title">Popular collection</h3>
              <div className="popular-nav-arrows">
                <button
                  type="button"
                  className="popular-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous products"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="popular-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next products"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="popular-cards-row">
              {visibleProducts.map((prod) => (
                <div key={prod.id} className="popular-product-card">
                  <div 
                    className="popular-product-img-box"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelectProduct?.(prod.handle)}
                  >
                    <img
                      src={prod.images.primary}
                      alt={prod.title}
                      className="popular-product-img"
                      loading="lazy"
                    />
                    <button
                      type="button"
                      className="popular-add-cart-btn"
                      title="Add to bag"
                      aria-label={`Add ${prod.title} to cart`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickAdd(prod);
                      }}
                    >
                      <ShoppingBag size={14} />
                    </button>
                  </div>
                  <div className="popular-product-info">
                    <a 
                      href={prod.url} 
                      className="popular-product-name"
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectProduct?.(prod.handle);
                      }}
                    >
                      {prod.title}
                    </a>
                    <span className="popular-product-category">{prod.productType}</span>
                    <div className="popular-price-rating-row">
                      <span className="popular-price">{prod.priceFormatted}</span>
                      <span className="popular-rating">
                        <Star size={12} className="star-icon" fill="currentColor" />
                        <span className="rating-num">({prod.rating > 0 ? prod.rating.toFixed(1) : '5.0'})</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
