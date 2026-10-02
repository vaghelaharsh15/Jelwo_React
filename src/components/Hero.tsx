import { 
  Sparkles, 
  ArrowRight, 
  Code2, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  Activity, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import './Hero.css';

export const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Hero Content */}
        <div className="hero-content">
          {/* Release Badge */}
          <div className="badge-pill hero-badge">
            <span className="badge-dot" />
            <Sparkles size={14} />
            <span>Next-Gen UI Engine • Jelwo 1.0</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            Where vision turns into <br />
            <span className="gradient-text">hyper-fluid reality.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Jelwo gives modern developers and creators the speed, reactive power, 
            and rich glassmorphism aesthetics required to build memorable digital products.
          </p>

          {/* Call to Actions */}
          <div className="hero-actions">
            <a href="#studio" className="btn-primary">
              <span>Open Studio Lab</span>
              <ArrowRight size={18} />
            </a>
            <a href="#features" className="btn-secondary">
              <Code2 size={18} />
              <span>Explore Features</span>
            </a>
          </div>

          {/* Quick Highlight Metrics */}
          <div className="hero-metrics-strip">
            <div className="metric-item">
              <CheckCircle2 size={16} className="metric-icon" />
              <span>Sub-millisecond State Dispatch</span>
            </div>
            <div className="metric-item">
              <CheckCircle2 size={16} className="metric-icon" />
              <span>Pure Vanilla CSS Design Tokens</span>
            </div>
            <div className="metric-item">
              <CheckCircle2 size={16} className="metric-icon" />
              <span>Zero-Config Reactive Setup</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Floating Glass Preview Card */}
        <div className="hero-preview-wrapper">
          {/* Ambient Glows */}
          <div className="ambient-glow glow-top" />
          <div className="ambient-glow glow-bottom" />

          {/* Main Glass Workspace Card */}
          <div className="hero-dashboard-card glass-panel">
            {/* Card Header Bar */}
            <div className="card-header-bar">
              <div className="window-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="window-title">
                <Cpu size={14} />
                <span>jelwo-core://runtime-monitor</span>
              </div>
              <div className="window-status">
                <span className="status-indicator-live" />
                <span>ACTIVE</span>
              </div>
            </div>

            {/* Performance Visualizer */}
            <div className="dashboard-body">
              <div className="metric-row">
                <div className="mini-stat-card">
                  <div className="mini-stat-label">
                    <Zap size={14} className="icon-cyan" />
                    <span>Framerate</span>
                  </div>
                  <div className="mini-stat-value">60.0 <span className="stat-unit">FPS</span></div>
                  <div className="mini-progress-bar">
                    <div className="mini-progress-fill" style={{ width: '96%' }} />
                  </div>
                </div>

                <div className="mini-stat-card">
                  <div className="mini-stat-label">
                    <Activity size={14} className="icon-violet" />
                    <span>State Latency</span>
                  </div>
                  <div className="mini-stat-value">0.38 <span className="stat-unit">ms</span></div>
                  <div className="mini-progress-bar">
                    <div className="mini-progress-fill violet" style={{ width: '88%' }} />
                  </div>
                </div>
              </div>

              {/* Dynamic Animated Chart / Wave */}
              <div className="interactive-chart-preview">
                <div className="chart-header">
                  <span className="chart-title">Real-Time Throughput</span>
                  <span className="chart-badge">
                    <TrendingUp size={12} /> +34.8%
                  </span>
                </div>
                <div className="visual-bars">
                  <div className="bar" style={{ height: '40%' }} />
                  <div className="bar" style={{ height: '65%' }} />
                  <div className="bar" style={{ height: '55%' }} />
                  <div className="bar" style={{ height: '80%' }} />
                  <div className="bar" style={{ height: '70%' }} />
                  <div className="bar" style={{ height: '95%' }} />
                  <div className="bar" style={{ height: '85%' }} />
                  <div className="bar active" style={{ height: '100%' }} />
                  <div className="bar" style={{ height: '75%' }} />
                  <div className="bar" style={{ height: '90%' }} />
                </div>
              </div>

              {/* Code Snippet Preview */}
              <div className="code-snippet-box">
                <div className="code-line">
                  <span className="code-keyword">import</span> {'{'} createJelwo {'}'} <span className="code-keyword">from</span> <span className="code-string">'@jelwo/core'</span>;
                </div>
                <div className="code-line">
                  <span className="code-keyword">const</span> app = <span className="code-func">createJelwo</span>({'{'} reactive: <span className="code-bool">true</span>, glass: <span className="code-string">'ultra'</span> {'}'});
                </div>
              </div>
            </div>

            {/* Floating Accessory Badges */}
            <div className="floating-badge badge-top-right">
              <ShieldCheck size={16} className="icon-emerald" />
              <div>
                <div className="floating-badge-title">Type Safe</div>
                <div className="floating-badge-sub">Strict TS Mode</div>
              </div>
            </div>

            <div className="floating-badge badge-bottom-left">
              <Sparkles size={16} className="icon-cyan" />
              <div>
                <div className="floating-badge-title">Zero Bloat</div>
                <div className="floating-badge-sub">Native CSS Tokens</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
