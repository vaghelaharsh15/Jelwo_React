import React, { useEffect } from 'react';
import { COLLECTIONS_LIST, COLLECTIONS_BREADCRUMB_BG } from '../../data/collectionsData';
import './CollectionsPage.css';

interface CollectionsPageProps {
  onNavigateHome?: () => void;
  onSelectCollection?: (collectionIdOrTitle: string) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ onNavigateHome, onSelectCollection }) => {
  // Ensure we scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Collections - Jelwo';
    return () => {
      document.title = "Jelwo - World's Best Fine Jewelry";
    };
  }, []);

  return (
    <div className="collections-page-root">
      {/* 1. Breadcrumb Hero Banner Section  */}
      <section 
        className="breadcrumb-area" 
        aria-label="Collections Breadcrumb Banner"
        style={{ backgroundImage: `url(${COLLECTIONS_BREADCRUMB_BG})` }}
      >
        <img 
          src={COLLECTIONS_BREADCRUMB_BG} 
          alt="Jelwo Fine Jewelry Collections Banner" 
          className="breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="breadcrumb-dark-tint" />

        <div className="container">
          <div className="breadcrumb-index">
            {/* Breadcrumb Links: HOME - COLLECTIONS */}
            <ul className="breadcrumb-list list-unstyled">
              <li className="breadcrumb-item">
                <button 
                  type="button" 
                  className="breadcrumb-nav-btn"
                  onClick={onNavigateHome}
                  title="Back to the home page"
                >
                  Home
                </button>
              </li>
              <li className="breadcrumb-separator" aria-hidden="true">-</li>
              <li className="breadcrumb-item">
                <span className="breadcrumb-current">Collections</span>
              </li>
            </ul>

            {/* Main Title */}
            <div className="breadcrumb-title">
              <h1 className="mr-0">Collections</h1>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Collection Items Grid Section  */}
      <section className="list-collection section-ptb" aria-label="Fine Jewelry Collections">
        <div className="container">
          <ul className="list-unstyled grid-wrap">
            {COLLECTIONS_LIST.map((item) => {
              const isWhiteBg = item.image.includes('jewelry-pro-');
              return (
                <li key={item.id} className="grid-wrapper">
                  <a 
                    className="coll-block" 
                    href={item.href}
                    title={`Explore ${item.title}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectCollection?.(item.id || item.title);
                    }}
                  >
                    <div 
                      className="collection-img ratio banner-hover" 
                      style={{ '--ratio-percent': '100%' } as React.CSSProperties}
                    >
                      <span className="item-count-badge">{item.count}</span>
                      <img 
                        src={item.image} 
                        alt={item.alt} 
                        loading="lazy" 
                        className={`collection-product-img ${isWhiteBg ? 'blend-multiply' : ''} ls-is-cached lazyloaded`} 
                      />
                    </div>
                    <div className="collection-content">
                      <div className="content">
                        <h6 className="mr-0">{item.title}</h6>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};
