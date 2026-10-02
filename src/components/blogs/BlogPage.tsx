import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS, BLOG_BREADCRUMB_BG } from '../../data/blogData';
import './BlogPage.css';

interface BlogPageProps {
  onNavigateHome?: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigateHome }) => {
  // Set document title and scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'News & Blog - Jelwo Fine Jewelry';
    return () => {
      document.title = "Jelwo - World's Best Fine Jewelry";
    };
  }, []);

  return (
    <div className="blog-page-root">
      {/* 1. Breadcrumb Hero Banner Section (HOME - NEWS / News) */}
      <section 
        className="blog-breadcrumb-area" 
        aria-label="Blog Breadcrumb Banner"
        style={{ backgroundImage: `url(${BLOG_BREADCRUMB_BG})` }}
      >
        <img 
          src={BLOG_BREADCRUMB_BG} 
          alt="Jelwo Fine Jewelry Blog Banner" 
          className="blog-breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="blog-breadcrumb-tint" />

        <div className="container">
          <div className="blog-breadcrumb-index">
            {/* Breadcrumb Links: HOME - NEWS */}
            <ul className="blog-breadcrumb-list">
              <li className="blog-breadcrumb-item">
                <button 
                  type="button" 
                  className="blog-breadcrumb-btn"
                  onClick={onNavigateHome}
                  title="Back to the home page"
                >
                  Home
                </button>
              </li>
              <li className="blog-breadcrumb-separator" aria-hidden="true">-</li>
              <li className="blog-breadcrumb-item">
                <span className="blog-breadcrumb-current">News</span>
              </li>
            </ul>

            {/* Main Title */}
            <div className="blog-breadcrumb-title">
              <h1 className="mr-0">News</h1>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Blog Grid Section (Preserves User's HTML Structure & Sequence) */}
      <section className="blog-article-section" aria-label="Jelwo Jewelry News Articles">
        <div className="container">
          <div className="blog-wrap without-sidebar">
            <div className="sidebar-wrapper blog-article">
              <ul className="list-unstyled single-blog-area grid-3">
                {BLOG_POSTS.map((post) => (
                  <li key={post.id} className="blog-slider">
                    <div className="blog-block">
                      {/* Date and Author Meta: 10, MAR 2025 | BY ANDREW JOHNS */}
                      <span className="date-time">
                        <span className="date">{post.dateDay}</span>,
                        <span className="time">{post.dateMonth}</span>
                        <span className="year">{post.dateYear}</span>
                        <span className="separator">|</span>
                        <span className="author">By {post.author}</span>
                      </span>

                      {/* Card Image with 66.875% Ratio */}
                      <a 
                        href={post.url} 
                        className="blog-img ratio" 
                        style={{ '--ratio-percent': '66.875%' } as React.CSSProperties}
                        title={post.fullTitle}
                        onClick={(e) => e.preventDefault()}
                      >
                        <img 
                          src={post.imageSrc} 
                          alt={post.imageAlt} 
                          srcSet={post.srcSet}
                          width={1600} 
                          height={1070} 
                          loading="lazy" 
                          className="ls-is-cached lazyloaded"
                        />
                        <span className="icon" aria-hidden="true">
                          <ArrowRight size={21} strokeWidth={1.9} />
                        </span>
                      </a>

                      {/* Content Area Below Image */}
                      <div className="blog-post-content">
                        <div className="title-block">
                          <a 
                            href={post.url} 
                            className="blog-title"
                            title={post.fullTitle}
                            onClick={(e) => e.preventDefault()}
                          >
                            {post.title}
                          </a>
                          <p className="mr-0 blog-desc">
                            {post.desc}
                          </p>
                          <a 
                            href={post.url} 
                            className="read-more"
                            onClick={(e) => e.preventDefault()}
                          >
                            Read article
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
