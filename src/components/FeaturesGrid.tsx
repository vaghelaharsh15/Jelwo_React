import { type ReactNode } from 'react';
import { 
  Sparkles, 
  Layers, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Compass, 
  ArrowUpRight 
} from 'lucide-react';
import './FeaturesGrid.css';

interface FeatureItem {
  id: string;
  icon: ReactNode;
  tag: string;
  title: string;
  description: string;
  badgeColor: string;
}

export const FeaturesGrid = () => {
  const features: FeatureItem[] = [
    {
      id: 'glass',
      icon: <Layers size={22} className="feat-icon-violet" />,
      tag: 'Aesthetic Engine',
      title: 'Sub-Pixel Glassmorphism',
      description: 'Sophisticated multi-layered specular highlights with GPU-accelerated backdrop filters and OKLCH color spaces.',
      badgeColor: 'rgba(139, 92, 246, 0.2)'
    },
    {
      id: 'reactive',
      icon: <Zap size={22} className="feat-icon-cyan" />,
      tag: 'State Pipeline',
      title: 'Predictive Reactive Engine',
      description: 'Instant state dispatch with sub-millisecond propagation and zero extraneous re-renders across the component tree.',
      badgeColor: 'rgba(6, 182, 212, 0.2)'
    },
    {
      id: 'bundling',
      icon: <Cpu size={22} className="feat-icon-rose" />,
      tag: 'Build Tooling',
      title: 'Instant Vite HMR',
      description: 'Near-instantaneous hot module replacement powered by Vite 6 and native ES modules for seamless developer velocity.',
      badgeColor: 'rgba(244, 63, 94, 0.2)'
    },
    {
      id: 'types',
      icon: <ShieldCheck size={22} className="feat-icon-emerald" />,
      tag: 'Type Safety',
      title: 'Strict TypeScript Contracts',
      description: 'End-to-end compile-time verification preventing runtime anomalies and ensuring bulletproof reliability.',
      badgeColor: 'rgba(16, 185, 129, 0.2)'
    },
    {
      id: 'motion',
      icon: <Sparkles size={22} className="feat-icon-amber" />,
      tag: 'Fluid Motion',
      title: 'Natural Spring Physics',
      description: 'Choreographed CSS micro-animations that make interactive elements feel organic, responsive, and alive.',
      badgeColor: 'rgba(245, 158, 11, 0.2)'
    },
    {
      id: 'a11y',
      icon: <Compass size={22} className="feat-icon-cyan" />,
      tag: 'Accessibility',
      title: 'Inclusive Design System',
      description: 'Engineered with WCAG AAA contrast ratios, semantic HTML landmarks, and automatic reduced-motion fallbacks.',
      badgeColor: 'rgba(6, 182, 212, 0.2)'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <Zap size={14} />
            <span>Core Architecture</span>
          </div>
          <h2 className="section-title">
            Engineered for <span className="gradient-text">Absolute Velocity</span>
          </h2>
          <p className="section-subtitle">
            Every layer in Jelwo is optimized to balance aesthetic excellence, 
            instantaneous responsiveness, and clean maintainable code.
          </p>
        </div>

        {/* 6-Grid of Capabilities */}
        <div className="features-grid">
          {features.map((feat) => (
            <div key={feat.id} className="feature-card glass-panel">
              <div className="feature-top">
                <div className="feature-icon-box">
                  {feat.icon}
                  <div className="feature-icon-glow" />
                </div>
                <span 
                  className="feature-tag-pill" 
                  style={{ backgroundColor: feat.badgeColor }}
                >
                  {feat.tag}
                </span>
              </div>

              <h3 className="feature-card-title">{feat.title}</h3>
              <p className="feature-card-desc">{feat.description}</p>

              <div className="feature-bottom-row">
                <span className="feature-link">
                  <span>Explore Architecture</span>
                  <ArrowUpRight size={16} className="feature-link-icon" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
