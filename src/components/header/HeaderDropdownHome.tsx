import React from 'react';

interface DemoItem {
  id: string;
  title: string;
  image: string;
  isNew?: boolean;
  link: string;
}

const DEMO_ITEMS: DemoItem[] = [
  {
    id: '06-classic',
    title: '06 Classic jewelry',
    image: '/images/header/demo-classic.jpg',
    isNew: true,
    link: '#demo-classic'
  },
  {
    id: '01-unique',
    title: '01 Unique jewelry',
    image: '/images/header/demo-unique.jpg',
    link: '#demo-unique'
  },
  {
    id: '02-modern',
    title: '02 Modern jewelry',
    image: '/images/header/demo-modern.jpg',
    link: '#demo-modern'
  },
  {
    id: '03-traditional',
    title: '03 Traditional jewelry',
    image: '/images/header/demo-traditional.jpg',
    link: '#demo-traditional'
  },
  {
    id: '04-luxury',
    title: '04 Luxury jewelry',
    image: '/images/header/demo-luxury.jpg',
    link: '#demo-luxury'
  },
  {
    id: '05-elegant',
    title: '05 Elegant jewelry',
    image: '/images/header/demo-elegant.jpg',
    link: '#demo-elegant'
  }
];

export const HeaderDropdownHome: React.FC = () => {
  return (
    <div className="mega-dropdown mega-dropdown-home">
      <div className="container mega-container">
        <div className="home-demos-grid">
          {DEMO_ITEMS.map((item) => (
            <a key={item.id} href={item.link} className="home-demo-card">
              <div className="home-demo-thumb-box">
                {item.isNew && (
                  <div className="demo-badge-new">
                    <span>New</span>
                  </div>
                )}
                <img
                  src={item.image}
                  alt={item.title}
                  className="home-demo-thumb-img"
                  loading="lazy"
                />
                <div className="home-demo-overlay" />
              </div>
              <span className="home-demo-title">{item.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
