import React from 'react';

export interface HeaderDropdownShopProps {
  onSelectProduct?: (handle: string) => void;
}

interface CategoryItem {
  title: string;
  handle: string;
}

interface CategoryColumn {
  title: string;
  items: CategoryItem[];
}

const CATEGORIES: CategoryColumn[] = [
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

export const HeaderDropdownShop: React.FC<HeaderDropdownShopProps> = ({ onSelectProduct }) => {
  return (
    <div className="mega-dropdown mega-dropdown-shop">
      <div className="container mega-container">
        <div className="shop-columns-layout">
          {/* 4 Category Columns */}
          <div className="shop-categories-grid">
            {CATEGORIES.map((col, idx) => (
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

          {/* 5th Column: Promo Banner Card */}
          <div className="shop-promo-column">
            <a
              href="/products/rose-gold-rings"
              className="shop-promo-card"
              onClick={(e) => {
                e.preventDefault();
                onSelectProduct?.('rose-gold-rings');
              }}
            >
              <div className="promo-card-content">
                <h3 className="promo-title">New jewelry</h3>
                <div className="promo-image-container">
                  <img
                    src="/images/header/promo-jewelry.jpg"
                    alt="New jewelry promo collection"
                    className="promo-image"
                    loading="lazy"
                  />
                  <div className="promo-discount-badge">
                    <span className="promo-discount-text">30% OFF</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
