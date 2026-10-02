import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Truck, RotateCw, DollarSign } from 'lucide-react';
import './AboutUsPage.css';

interface AboutUsPageProps {
  onNavigateHome?: () => void;
}

const ABOUT_BREADCRUMB_BG = 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-breadcrumb.jpg?v=1742473987&width=1920';

const ABOUT_STATS = [
  {
    title: '5,000+ HAPPY CUSTOMER',
    desc: "The customer's perception is your reality. Your most unhappy customers are your greatest source of learning"
  },
  {
    title: '29+ AWARDS WON',
    desc: 'Awards can give you a tremendous amount of encouragement to keep getting better, no matter how young or old you are.'
  },
  {
    title: '40 YEARS OF EXPERIENCES',
    desc: 'The major problem is that we tend to live our life in our head, in our thoughts, cut off from our actual experience.'
  }
];

interface TestimonialItem {
  id: number;
  image: string;
  tag: string;
  desc: string;
  name: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-testi-1.jpg?v=1741598801&width=90',
    tag: 'We love our clients',
    desc: 'It is a long established fact that a reader will be distracted when looking at its layout.',
    name: 'Miranda joy'
  },
  {
    id: 2,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-testi-3.jpg?v=1741598801&width=90',
    tag: 'We love our clients',
    desc: 'It is a long established fact that a reader will be distracted when looking at its layout.',
    name: 'Miranda joy'
  },
  {
    id: 3,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-testi-4.jpg?v=1741598801&width=90',
    tag: 'We love our clients',
    desc: 'It is a long established fact that a reader will be distracted when looking at its layout.',
    name: 'Miranda joy'
  },
  {
    id: 4,
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-testi-2.jpg?v=1741598801&width=90',
    tag: 'We love our clients',
    desc: 'It is a long established fact that a reader will be distracted when looking at its layout.',
    name: 'Miranda joy'
  }
];

interface TeamMember {
  name: string;
  role: string;
  image: string;
  srcset?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Harvey jones',
    role: 'Ceo & founder',
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-team-1.jpg?v=1741693184&width=500',
    srcset: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-team-1.jpg?v=1741693184&width=352 352w, https://jelwo.myshopify.com/cdn/shop/files/jewelry-team-1.jpg?v=1741693184&width=450 450w'
  },
  {
    name: 'mory Orlando',
    role: 'Marketing',
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-team-2.jpg?v=1741693183&width=500',
    srcset: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-team-2.jpg?v=1741693183&width=352 352w, https://jelwo.myshopify.com/cdn/shop/files/jewelry-team-2.jpg?v=1741693183&width=450 450w'
  },
  {
    name: 'Harlie puth',
    role: 'Designer & model',
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-team-3.jpg?v=1741693183&width=500',
    srcset: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-team-3.jpg?v=1741693183&width=352 352w, https://jelwo.myshopify.com/cdn/shop/files/jewelry-team-3.jpg?v=1741693183&width=450 450w'
  },
  {
    name: 'Tristin Chineze',
    role: 'Distribution',
    image: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-team-4.jpg?v=1741693183&width=500',
    srcset: 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-team-4.jpg?v=1741693183&width=352 352w, https://jelwo.myshopify.com/cdn/shop/files/jewelry-team-4.jpg?v=1741693183&width=450 450w'
  }
];

interface AboutFeature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const ABOUT_FEATURES: AboutFeature[] = [
  {
    icon: <Truck size={34} strokeWidth={1.4} />,
    title: 'FAST SHIPPING',
    desc: 'Free Shipping starts now! No minimums. No coupon required.'
  },
  {
    icon: <RotateCw size={32} strokeWidth={1.4} />,
    title: 'EASY RETURNS',
    desc: 'Do everything with a good heart and expect nothhing in return'
  },
  {
    icon: <DollarSign size={34} strokeWidth={1.4} />,
    title: '100% MONEY SECURE',
    desc: 'The money you make is a symbol of the value you create.'
  }
];

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigateHome }) => {
  const [activeTesti, setActiveTesti] = useState(0);
  const [isTestiPaused, setIsTestiPaused] = useState(false);

  // Set document title and scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'About us - Jelwo Fine Jewelry';
    return () => {
      document.title = "Jelwo - World's Best Fine Jewelry";
    };
  }, []);

  // Auto-advance testimonial slider every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isTestiPaused) return;
    const interval = setInterval(() => {
      setActiveTesti((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isTestiPaused]);

  const handlePrevTesti = () => {
    setActiveTesti((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNextTesti = () => {
    setActiveTesti((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <div className="about-page-root">
      {/* 1. Breadcrumb Hero Banner Section (HOME - ABOUT US / About us) */}
      <section 
        className="about-breadcrumb-area" 
        aria-label="About Us Breadcrumb Banner"
        style={{ backgroundImage: `url(${ABOUT_BREADCRUMB_BG})` }}
      >
        <img 
          src={ABOUT_BREADCRUMB_BG} 
          alt="Jelwo Fine Jewelry About Banner" 
          className="about-breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="about-breadcrumb-tint" />

        <div className="container">
          <div className="about-breadcrumb-index">
            {/* Breadcrumb Links: HOME - ABOUT US */}
            <ul className="about-breadcrumb-list">
              <li className="about-breadcrumb-item">
                <button 
                  type="button" 
                  className="about-breadcrumb-btn"
                  onClick={onNavigateHome}
                  title="Back to the home page"
                >
                  Home
                </button>
              </li>
              <li className="about-breadcrumb-separator" aria-hidden="true">-</li>
              <li className="about-breadcrumb-item">
                <span className="about-breadcrumb-current">About us</span>
              </li>
            </ul>

            {/* Main Title */}
            <div className="about-breadcrumb-title">
              <h1 className="mr-0">About us</h1>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Our about story" Content Section (s 1 & 2) */}
      <section className="about-story-section" aria-label="Our About Story">
        <div className="container">
          {/* Header Block: SINCE 1982 OUR STORY / Our about story */}
          <div className="about-story-header">
            <span className="about-sub-title">SINCE 1982 OUR STORY</span>
            <h2 className="about-main-title">Our about story</h2>
          </div>

          {/* Hero Craftsmanship Photograph */}
          <div className="about-hero-img-wrap">
            <img 
              src="/images/about/about-story-hero.jpg" 
              alt="Artisan jeweler craftsman setting diamond ring with precision tool at workshop bench" 
              className="about-hero-img"
              loading="lazy"
            />
          </div>

          {/* 3-Column Stats & Milestones Grid */}
          <div className="about-stats-grid">
            {ABOUT_STATS.map((stat, idx) => (
              <div key={idx} className="about-stat-item">
                <h3 className="about-stat-heading">{stat.title}</h3>
                <p className="about-stat-desc">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Testimonials Slider Section  */}
      <section 
        className="about-section3" 
        aria-label="Client Testimonials"
        onMouseEnter={() => setIsTestiPaused(true)}
        onMouseLeave={() => setIsTestiPaused(false)}
      >
        <div className="container">
          <div className="row">
            <div className="col">
              <div 
                className="about-slider swiper-container swiper-initialized swiper-horizontal swiper-backface-hidden" 
                id="about-slider-template--17769951789193__about_section3_BBdwNd"
              >
                <div 
                  className="swiper-wrapper" 
                  id="swiper-wrapper-d5ae9a191788acc8" 
                  aria-live="polite"
                >
                  {TESTIMONIALS.map((testi, idx) => (
                    <div 
                      key={testi.id} 
                      className={`swiper-slide ${idx === activeTesti ? 'swiper-slide-active' : ''}`}
                      role="group" 
                      aria-label={`${idx + 1} / ${TESTIMONIALS.length}`}
                      data-swiper-slide-index={idx}
                    >
                      <div className="testi-content">
                        <div className="testi-img-avtar">
                          <span className="testi-img">
                            <img 
                              src={testi.image} 
                              alt={`${testi.name} avatar`} 
                              width="512" 
                              height="512" 
                              loading="lazy" 
                              className="img-fluid ls-is-cached lazyloaded" 
                            />
                          </span>
                          <span className="testi-det">{testi.tag}</span>
                        </div>
                        <div className="testi-desc">
                          <p>{testi.desc}</p>
                          <span className="testi-name">{testi.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Left and Right Navigation Arrows */}
                <div className="swiper-arrow">
                  <div 
                    className="arrow-prev arrow-prev-template--17769951789193__about_section3_BBdwNd" 
                    tabIndex={0} 
                    role="button" 
                    aria-label="Previous slide" 
                    onClick={handlePrevTesti}
                  >
                    <ArrowLeft size={18} strokeWidth={1.8} />
                  </div>
                  <div 
                    className="arrow-next arrow-next-template--17769951789193__about_section3_BBdwNd" 
                    tabIndex={0} 
                    role="button" 
                    aria-label="Next slide" 
                    onClick={handleNextTesti}
                  >
                    <ArrowRight size={18} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Pagination Bullets */}
                <div className="swiper-pagination swiper-pagination-template--17769951789193__about_section3_BBdwNd swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
                  {TESTIMONIALS.map((_, idx) => (
                    <span 
                      key={idx}
                      className={`swiper-pagination-bullet ${idx === activeTesti ? 'swiper-pagination-bullet-active' : ''}`} 
                      tabIndex={0} 
                      role="button" 
                      aria-label={`Go to slide ${idx + 1}`} 
                      aria-current={idx === activeTesti ? 'true' : undefined}
                      onClick={() => setActiveTesti(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Feature Craftswoman & Philosophy Quotes Section  */}
      <section className="about-craft-section" aria-label="Craftsmanship & Design Philosophy">
        <div className="container">
          {/* Craftswoman Artisan Photograph  */}
          <div className="about-craft-img-wrap">
            <img 
              src="/images/about/about-craftswoman.jpg" 
              alt="Artisan craftswoman intricately hand-beading jewelry headband at atelier workshop"
              className="about-craft-img"
              loading="lazy"
            />
          </div>

          {/* 2-Column Editorial Quotes  */}
          <div className="about-quotes-grid">
            <div className="about-quote-col">
              <h3 className="about-quote-title">
                Fashion is what you’re offered four times a yea by designers fashions fade
              </h3>
              <p className="about-quote-desc">
                In early 1982, founder and creative direct or had the idea to design a bag collection where comfort, fashion, and distinction are key.
              </p>
            </div>
            <div className="about-quote-col">
              <h3 className="about-quote-title">
                I prefer to shock rather than to bore through repetition style is eternal
              </h3>
              <p className="about-quote-desc">
                I have always believed that fashion was not only to make women more beautiful, but also to reassure them, give them confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Meet Our Teams Section  */}
      <section className="about-team" aria-label="Our Team Members">
        <div className="container">
          <div className="our-team">
            <div className="section-capture">
              <div className="section-title">
                <span className="sub-title">Highliy skilled</span>
                <h2 className="mr-0">Meet our teams</h2>
              </div>
            </div>

            <div className="team-wrap">
              <ul className="list-unstyled">
                {TEAM_MEMBERS.map((member, idx) => (
                  <li key={idx} className="team-content">
                    <div className="banner-hover">
                      <img 
                        src={member.image} 
                        srcSet={member.srcset}
                        alt={`${member.name} - ${member.role}`}
                        width={450} 
                        height={580} 
                        loading="lazy"
                        className="img-fluid"
                      />
                    </div>
                    <div className="team-info">
                      <h6 className="mr-0">{member.name}</h6>
                      <span>{member.role}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Trust / Features Badges Section  */}
      <section className="about-features-badges" aria-label="Customer Trust & Guarantees">
        <div className="container">
          <div className="about-features-grid">
            {ABOUT_FEATURES.map((feature, idx) => (
              <div key={idx} className="about-feature-item">
                <div className="about-feature-icon-circle">
                  {feature.icon}
                </div>
                <h4 className="about-feature-title">{feature.title}</h4>
                <p className="about-feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
