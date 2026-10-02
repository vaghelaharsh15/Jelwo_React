import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import './FaqPage.css';

interface FaqPageProps {
  onNavigateHome?: () => void;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqSection {
  id: string;
  title: string;
  category: 'account' | 'policies' | 'payment' | 'terms';
  items: FaqItem[];
}

// Top Breadcrumb banner background ( 1 & other Jelwo pages)
const FAQ_BREADCRUMB_BG = 'https://jelwo.myshopify.com/cdn/shop/files/jewelry-3-breadcrumb.jpg?v=1742473987&width=1920';

// FAQ Sections and Items in Exact Sequence 
const FAQ_SECTIONS: FaqSection[] = [
  {
    id: 'shopping-info',
    title: 'Shopping Information',
    category: 'account',
    items: [
      {
        id: 'contact-you',
        question: 'HOW CAN I CONTACT YOU?',
        answer: 'You can reach our dedicated Client Care team by phone at +00-1234567890 (Monday–Saturday, 9:00 AM – 8:00 PM EST), via email at support@jelwo.com, or through our live concierge chat on the website. For bespoke appointments and bridal consultations, please visit our Store Locations page.'
      },
      {
        id: 'restock-notifications',
        question: 'DO YOU HAVE RESTOCK NOTIFICATIONS?',
        answer: "Yes! If a coveted piece or specific ring size is currently out of stock, simply click the 'Notify Me When Available' button on the product page and enter your email address. You will receive an immediate automated alert as soon as our master artisans finish handcrafting the new batch."
      },
      {
        id: 'care-for-items',
        question: 'HOW DO I CARE FOR MY ITEMS?',
        answer: 'We recommend storing your fine jewelry in its original Jelwo velvet pouch or a lined jewelry box away from direct heat and sunlight. Avoid contact with perfumes, lotions, household chemicals, and salt water. To restore brilliance, gently buff with our complimentary microfiber polishing cloth or clean with lukewarm water, mild soap, and a soft-bristled brush.'
      },
      {
        id: 'know-size',
        question: 'HOW DO I KNOW WHAT SIZE I AM?',
        answer: 'We provide a comprehensive Ring & Bracelet Sizing Guide available on every product page. You can measure an existing comfortable ring against our printable sizing chart or measure your finger circumference with a soft ribbon. Complimentary ring sizers are also available upon request from our customer care team.'
      },
      {
        id: 'gift-card',
        question: 'HOW DO I USE A GIFT CARD?',
        answer: "During checkout, navigate to the Payment section and enter your unique 16-digit gift card code into the 'Gift Card or Discount Code' field, then click 'Apply'. The balance will be automatically deducted from your order total. Any remaining balance will remain on your gift card for future purchases."
      },
      {
        id: 'often-restock',
        question: 'HOW OFTEN DO YOU RESTOCK ITEMS?',
        answer: 'Because our pieces are handcrafted in limited artisanal runs, core signature collections are typically restocked every 3 to 4 weeks. High-jewelry, rare gemstone pieces, and limited-edition seasonal capsules may not be restocked once sold out.'
      },
      {
        id: 'products-made',
        question: 'WHERE ARE YOUR PRODUCTS MADE?',
        answer: 'All Jelwo fine jewelry is designed in our central atelier and ethically handcrafted by certified master jewelers using recycled 18k solid gold, platinum, and conflict-free, ethically sourced diamonds and precious gemstones in accordance with Kimberley Process standards.'
      }
    ]
  },
  {
    id: 'returns-exchanges',
    title: 'Returns and exchanges',
    category: 'policies',
    items: [
      {
        id: 'return-store',
        question: 'CAN I RETURN OR EXCHANGE SOMETHING IN STORE?',
        answer: 'Yes, items purchased online can be returned or exchanged at any authorized Jelwo boutique within 30 days of delivery. Please bring your original order confirmation, certificate of authenticity, and the item unworn in its original presentation packaging.'
      },
      {
        id: 'shipping-label',
        question: 'HOW DO I GET A SHIPPING LABEL?',
        answer: 'To initiate a return or exchange, visit our online Returns Portal or email support@jelwo.com with your order number. Once approved, a prepaid, fully insured shipping label will be generated and emailed to you along with packaging instructions.'
      },
      {
        id: 'defective-item',
        question: 'WHAT DO I DO IF I RECEIVE A DEFECTIVE ITEM?',
        answer: 'Every Jelwo piece undergoes rigorous multi-point inspection before dispatch. In the rare event that your piece arrives damaged or defective, please contact us within 48 hours of delivery with photos of the item. We will arrange an immediate priority replacement or full refund at no cost to you.'
      }
    ]
  },
  {
    id: 'payment-info',
    title: 'Payment information',
    category: 'payment',
    items: [
      {
        id: 'pellentesque',
        question: 'PELLENTESQUE HABITANT MORBI TRISTIQUE SENECTUS ET NETUS?',
        answer: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.'
      },
      {
        id: 'shipping-cost-time',
        question: 'HOW MUCH IS SHIPPING AND HOW LONG WILL IT TAKE?',
        answer: 'We offer complimentary insured standard shipping (3–5 business days) on all orders over $150. Expedited 2-day delivery is available for $25, and Next-Day Priority Overnight delivery is available for $45. All shipments require an adult signature upon delivery for maximum security.'
      },
      {
        id: 'delivery-time',
        question: 'HOW LONG WILL IT TAKE TO GET MY PACKAGE?',
        answer: 'In-stock pieces are processed and dispatched within 1–2 business days. Customized pieces, engravings, and bespoke ring sizings typically require an additional 3–5 business days prior to dispatch. You will receive a tracking link as soon as your courier scans the package.'
      },
      {
        id: 'branding-efficiency',
        question: 'BRANDING IS SIMPLY A MORE EFFICIENT WAY TO SELL THINGS?',
        answer: 'Branding in luxury fine jewelry is about authentic storytelling, timeless craftsmanship, and unwavering trust. At Jelwo, our brand represents an enduring commitment to ethical luxury, heirloom-quality design, and exceptional client relationships that span generations.'
      }
    ]
  }
];

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigateHome }) => {
  // State for which accordion item is currently open (all collapsed by default)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Active category filter or highlight
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleAccordion = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCategoryClick = (categoryKey: string, sectionId?: string) => {
    setActiveCategory(categoryKey);
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        const yOffset = -120;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="faq-page-root">
      {/* 1. Top Breadcrumb Hero Banner Section ( 1) */}
      <section className="faq-breadcrumb-area" aria-label="FAQ Banner">
        <img
          src={FAQ_BREADCRUMB_BG}
          alt="FAQ Breadcrumb Background"
          className="faq-breadcrumb-bg-overlay"
          loading="eager"
        />
        <div className="faq-breadcrumb-tint" />
        <div className="faq-breadcrumb-index">
          <ul className="faq-breadcrumb-list">
            <li className="faq-breadcrumb-item">
              <button
                type="button"
                className="faq-breadcrumb-btn"
                onClick={onNavigateHome}
              >
                Home
              </button>
            </li>
            <li className="faq-breadcrumb-separator" aria-hidden="true">-</li>
            <li className="faq-breadcrumb-item">
              <span className="faq-breadcrumb-current">FAQ'S</span>
            </li>
          </ul>

          <div className="faq-breadcrumb-title">
            <h1>Faq's</h1>
          </div>
        </div>
      </section>

      {/* 2. Main Two-Column FAQ Section (s 1, 2, 3) */}
      <section className="faq-main-section" aria-label="Frequently Asked Questions">
        <div className="faq-container">
          <div className="faq-grid-layout">
            
            {/* Left Sidebar: MOST COMMON / Questions / Navigation */}
            <aside className="faq-sidebar">
              <span className="faq-sidebar-tag">MOST COMMON</span>
              <h2 className="faq-sidebar-title">Questions</h2>

              <ul className="faq-sidebar-menu">
                <li>
                  <button
                    type="button"
                    className={`faq-sidebar-btn ${activeCategory === 'account' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('account', 'shopping-info')}
                  >
                    MY ACCOUNT
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`faq-sidebar-btn ${activeCategory === 'policies' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('policies', 'returns-exchanges')}
                  >
                    COMPANY POLICIES
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`faq-sidebar-btn ${activeCategory === 'payment' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('payment', 'payment-info')}
                  >
                    PAYMENT OPTIONS
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`faq-sidebar-btn ${activeCategory === 'terms' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('terms', 'payment-info')}
                  >
                    TERM AND CONDITIONS
                  </button>
                </li>
              </ul>
            </aside>

            {/* Right Content Area: Sections and Accordion Items */}
            <div className="faq-content-area">
              {FAQ_SECTIONS.map((section) => (
                <div key={section.id} id={section.id} className="faq-group-block">
                  <h3 className="faq-group-title">{section.title}</h3>

                  <div className="faq-accordion-list">
                    {section.items.map((item) => {
                      const isOpen = !!openItems[item.id];
                      return (
                        <div
                          key={item.id}
                          className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
                        >
                          <button
                            type="button"
                            className="faq-question-btn"
                            onClick={() => toggleAccordion(item.id)}
                            aria-expanded={isOpen}
                            aria-controls={`faq-answer-${item.id}`}
                          >
                            <span className="faq-question-text">{item.question}</span>
                            <span className="faq-toggle-icon-wrap" aria-hidden="true">
                              {isOpen ? (
                                <Minus size={18} strokeWidth={2} className="faq-icon-minus" />
                              ) : (
                                <Plus size={18} strokeWidth={2} className="faq-icon-plus" />
                              )}
                            </span>
                          </button>

                          <div
                            id={`faq-answer-${item.id}`}
                            className="faq-answer-drawer"
                            role="region"
                          >
                            <div className="faq-answer-inner">
                              <p className="faq-answer-paragraph">{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
