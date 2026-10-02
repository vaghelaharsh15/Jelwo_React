import React, { useState, useEffect, useRef } from 'react';

export const HeaderTopBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isWideScreen, setIsWideScreen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1200;
    }
    return true;
  });

  const mobileMarqueeRef = useRef<any>(null);
  const desktopMarqueeRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      const wide = window.innerWidth >= 1200;
      setIsWideScreen(wide);

      // Keep marquee static at 1200+ px and working when < 1200px
      if (wide) {
        mobileMarqueeRef.current?.stop?.();
        desktopMarqueeRef.current?.stop?.();
      } else {
        mobileMarqueeRef.current?.start?.();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="header-topbar">
      {/* 1. Tablet & Mobile Working Marquee Bar (< 1200px: keeps moving right to left with spacing) */}
      <div className="topbar-marquee-wrapper" aria-label="Delivery Announcements">
        {React.createElement(
          'marquee',
          {
            ref: mobileMarqueeRef,
            behavior: 'scroll',
            direction: 'left',
            scrollamount: isWideScreen ? 0 : 5,
            className: 'topbar-marquee-tag'
          },
          Array.from({ length: 8 }).map((_, idx) =>
            React.createElement(
              'span',
              { key: idx, className: 'topbar-marquee-item' },
              'Free uk standard delivery on all orders.'
            )
          )
        )}
      </div>

      {/* 2. Desktop Bar (1200+ px: marquee tag is static, Try at home & Search on right) */}
      <div className="container header-topbar-container desktop-topbar-utilities">
        {/* Left message on 1200+ px: marquee tag is static (scrollamount=0, stopped) */}
        <div className="topbar-left">
          {React.createElement(
            'marquee',
            {
              ref: desktopMarqueeRef,
              behavior: 'scroll',
              direction: 'left',
              scrollamount: 0,
              className: 'topbar-delivery-text topbar-static-marquee'
            },
            'Free uk standard delivery on all orders.'
          )}
        </div>

        {/* Right utility items */}
        <div className="topbar-right">
          {/* Free try at home */}
          <a href="#try-at-home" className="topbar-try-link">
            <svg
              className="topbar-house-icon"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
              <path
                d="M12 11.5c-.8-1.2-2.5-.8-2.5.8 0 1.5 2.5 3.2 2.5 3.2s2.5-1.7 2.5-3.2c0-1.6-1.7-2-2.5-.8z"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            <span>Free try at home</span>
          </a>

          {/* Search form */}
          <form className="topbar-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="topbar-search-input"
              placeholder="Search our store"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search our store"
            />
            <button type="submit" className="topbar-search-btn">
              SEARCH
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
