import React from 'react';
import './ShopByCategory.css';

interface CategoryCard {
  id: string;
  name: string;
  count: string;
  image: string;
  link: string;
}

const CATEGORY_CARDS: CategoryCard[] = [
  {
    id: 'cat-chain',
    name: 'CHAIN',
    count: '12+ Items',
    image: '/images/home/cat-chain.png',
    link: '#chain'
  },
  {
    id: 'cat-brooch',
    name: 'BROOCH',
    count: '12+ Items',
    image: '/images/home/cat-brooch.png',
    link: '#brooch'
  },
  {
    id: 'cat-diamond',
    name: 'DIAMOND',
    count: '10+ Items',
    image: '/images/home/cat-diamond.png',
    link: '#diamond'
  },
  {
    id: 'cat-necklaces',
    name: 'NECKLACES',
    count: '12+ Items',
    image: '/images/home/cat-necklace.png',
    link: '#necklaces'
  },
  {
    id: 'cat-earrings',
    name: 'EARRINGS',
    count: '10+ Items',
    image: '/images/home/cat-earrings.png',
    link: '#earrings'
  }
];

interface ShopByCategoryProps {
  onSelectCategory?: (category: string) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onSelectCategory }) => {
  return (
    <section className="shop-by-category-section" aria-label="Shop Jewelry by Category">
      <div className="wide-content-container">
        {/* Section Header */}
        <div className="section-header-wrap">
          <span className="section-subtitle">JEWELRY COLLECTION</span>
          <h2 className="section-main-title">Shop by category</h2>
        </div>

        {/* 5 Fluid Category Cards */}
        <div className="category-cards-fluid-grid">
          {CATEGORY_CARDS.map((cat) => (
            <a 
              key={cat.id} 
              href={cat.link} 
              className="category-showcase-card"
              onClick={(e) => {
                if (onSelectCategory) {
                  e.preventDefault();
                  onSelectCategory(cat.name);
                }
              }}
            >
              <div className="category-card-inner">
                {/* Circular image disc */}
                <div className="category-circle-disc">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="category-circle-img"
                    loading="lazy"
                  />
                </div>

                {/* Meta details */}
                <span className="category-item-count">{cat.count}</span>
              </div>

              {/* Bottom label bar */}
              <div className="category-label-footer">
                <span className="category-name-text">{cat.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
