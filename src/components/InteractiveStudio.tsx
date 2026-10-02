import { useState, useEffect } from 'react';
import { 
  Sliders, 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Sparkles, 
  RefreshCw,
  Eye,
  Layout,
  Gauge
} from 'lucide-react';
import './InteractiveStudio.css';

type ActiveTab = 'tokens' | 'streamer' | 'matrix';

interface LogEntry {
  id: string;
  time: string;
  event: string;
  payload: string;
}

export const InteractiveStudio = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('tokens');

  // Token Engine State
  const [blur, setBlur] = useState<number>(18);
  const [radius, setRadius] = useState<number>(20);
  const [glow, setGlow] = useState<number>(65);
  const [accentColor, setAccentColor] = useState<string>('#8b5cf6');

  // Streamer State
  const [dispatchCount, setDispatchCount] = useState<number>(128);
  const [isAutoStreaming, setIsAutoStreaming] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', time: '12:20:04', event: 'INIT_ENGINE', payload: '{ ready: true, fps: 60 }' },
    { id: '2', time: '12:20:05', event: 'STORE_HYDRATE', payload: '{ state: "valid", cache: "hot" }' },
    { id: '3', time: '12:20:07', event: 'GLASS_SHADER_LINK', payload: '{ blend: "hardware-oklch" }' },
  ]);

  // Matrix State
  const [selectedCard, setSelectedCard] = useState<'analytics' | 'user' | 'action'>('analytics');
  const [copied, setCopied] = useState<boolean>(false);

  // Auto-stream effect
  useEffect(() => {
    let interval: any;
    if (isAutoStreaming) {
      interval = setInterval(() => {
        setDispatchCount(prev => prev + 1);
        const now = new Date().toTimeString().split(' ')[0];
        const events = ['PULSE_HEARTBEAT', 'DIFF_DISPATCH', 'RENDER_FRAME', 'SUBSCRIPTION_EMIT'];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        
        setLogs(prev => [
          {
            id: Math.random().toString(36).substring(2, 7),
            time: now,
            event: randomEvent,
            payload: `{ delta: "+${(Math.random() * 2).toFixed(2)}ms" }`
          },
          ...prev.slice(0, 5)
        ]);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isAutoStreaming]);

  const handleManualDispatch = () => {
    setDispatchCount(prev => prev + 1);
    const now = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [
      {
        id: Math.random().toString(36).substring(2, 7),
        time: now,
        event: 'MANUAL_DISPATCH',
        payload: `{ total: ${dispatchCount + 1}, type: "USER_INTERACTION" }`
      },
      ...prev.slice(0, 5)
    ]);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleSnippet = `// Jelwo Dynamic Component Specification
const JelwoCard = styled.div\`
  backdrop-filter: blur(${blur}px);
  border-radius: ${radius}px;
  box-shadow: 0 0 ${glow}px rgba(139, 92, 246, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.12);
\`;`;

  return (
    <section id="studio" className="studio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <Sparkles size={14} />
            <span>Live Interactive Playground</span>
          </div>
          <h2 className="section-title">
            Experience the <span className="gradient-text">Jelwo Engine</span> Live
          </h2>
          <p className="section-subtitle">
            Interact with live runtime controls, adjust dynamic CSS tokens, 
            test reactive state dispatch, and inspect generated components in real time.
          </p>

          {/* Mode Tabs */}
          <div className="studio-tabs">
            <button
              type="button"
              className={`studio-tab-btn ${activeTab === 'tokens' ? 'active' : ''}`}
              onClick={() => setActiveTab('tokens')}
            >
              <Sliders size={16} />
              <span>Token & Glass Engine</span>
            </button>
            <button
              type="button"
              className={`studio-tab-btn ${activeTab === 'streamer' ? 'active' : ''}`}
              onClick={() => setActiveTab('streamer')}
            >
              <Terminal size={16} />
              <span>Reactive Streamer</span>
            </button>
            <button
              type="button"
              className={`studio-tab-btn ${activeTab === 'matrix' ? 'active' : ''}`}
              onClick={() => setActiveTab('matrix')}
            >
              <Layout size={16} />
              <span>Component Matrix</span>
            </button>
          </div>
        </div>

        {/* Studio Content Container */}
        <div className="studio-workspace glass-panel">
          {/* TAB 1: TOKENS & GLASS ENGINE */}
          {activeTab === 'tokens' && (
            <div className="tokens-layout">
              {/* Controls Column */}
              <div className="controls-column">
                <h3 className="column-title">
                  <Sliders size={18} className="icon-accent" />
                  <span>Design Token Variables</span>
                </h3>

                {/* Accent Picker */}
                <div className="control-group">
                  <label className="control-label">Accent Spectrum Hue</label>
                  <div className="color-presets">
                    {[
                      { name: 'Violet', color: '#8b5cf6' },
                      { name: 'Cyan', color: '#06b6d4' },
                      { name: 'Rose', color: '#f43f5e' },
                      { name: 'Emerald', color: '#10b981' },
                      { name: 'Amber', color: '#f59e0b' }
                    ].map(item => (
                      <button
                        key={item.color}
                        type="button"
                        className={`color-chip ${accentColor === item.color ? 'selected' : ''}`}
                        style={{ backgroundColor: item.color }}
                        onClick={() => setAccentColor(item.color)}
                        aria-label={`Select ${item.name} accent`}
                      />
                    ))}
                  </div>
                </div>

                {/* Blur Slider */}
                <div className="control-group">
                  <div className="slider-label-row">
                    <label className="control-label">Glass Blur Strength</label>
                    <span className="slider-value">{blur}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="36"
                    value={blur}
                    onChange={(e) => setBlur(Number(e.target.value))}
                    className="styled-range"
                  />
                </div>

                {/* Border Radius Slider */}
                <div className="control-group">
                  <div className="slider-label-row">
                    <label className="control-label">Corner Radius</label>
                    <span className="slider-value">{radius}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="40"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="styled-range"
                  />
                </div>

                {/* Glow Slider */}
                <div className="control-group">
                  <div className="slider-label-row">
                    <label className="control-label">Glow Atmospheric Spread</label>
                    <span className="slider-value">{glow}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={glow}
                    onChange={(e) => setGlow(Number(e.target.value))}
                    className="styled-range"
                  />
                </div>
              </div>

              {/* Dynamic Live Preview Target */}
              <div className="preview-column">
                <div className="preview-label">
                  <Eye size={16} />
                  <span>Real-Time Computed Output</span>
                </div>

                <div 
                  className="interactive-target-card"
                  style={{
                    backdropFilter: `blur(${blur}px)`,
                    WebkitBackdropFilter: `blur(${blur}px)`,
                    borderRadius: `${radius}px`,
                    boxShadow: `0 20px 50px -10px rgba(0,0,0,0.6), 0 0 ${glow}px ${accentColor}44`,
                    borderColor: `${accentColor}55`,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                >
                  <div className="target-card-header">
                    <div className="target-pill" style={{ backgroundColor: `${accentColor}22`, color: accentColor, borderColor: `${accentColor}55` }}>
                      Dynamic Token Active
                    </div>
                    <span className="target-id">#jelwo-preview</span>
                  </div>

                  <h4 className="target-title">Fluid Reactive Specimen</h4>
                  <p className="target-desc">
                    Notice how adjusting the sliders dynamically updates this card's blur,
                    corner radius, and peripheral glow with zero layout thrashing.
                  </p>

                  <div className="target-footer">
                    <div className="target-stat">
                      <span className="stat-num">{blur}px</span>
                      <span className="stat-sub">Blur</span>
                    </div>
                    <div className="target-stat">
                      <span className="stat-num">{radius}px</span>
                      <span className="stat-sub">Radius</span>
                    </div>
                    <div className="target-stat">
                      <span className="stat-num">{glow}%</span>
                      <span className="stat-sub">Glow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REACTIVE STREAMER */}
          {activeTab === 'streamer' && (
            <div className="streamer-layout">
              {/* Telemetry Actions */}
              <div className="streamer-sidebar">
                <h3 className="column-title">
                  <Gauge size={18} className="icon-cyan" />
                  <span>Telemetry Controller</span>
                </h3>

                <div className="telemetry-counter-box">
                  <span className="telemetry-counter-label">Events Dispatched</span>
                  <span className="telemetry-counter-val gradient-text">{dispatchCount}</span>
                  <span className="telemetry-counter-sub">Average latency: 0.24ms</span>
                </div>

                <div className="streamer-actions">
                  <button
                    type="button"
                    className="btn-primary streamer-btn"
                    onClick={handleManualDispatch}
                  >
                    <RefreshCw size={16} />
                    <span>Dispatch Event</span>
                  </button>

                  <button
                    type="button"
                    className={`btn-secondary streamer-btn ${isAutoStreaming ? 'streaming-active' : ''}`}
                    onClick={() => setIsAutoStreaming(!isAutoStreaming)}
                  >
                    {isAutoStreaming ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isAutoStreaming ? 'Pause Stream' : 'Start Auto Pulse'}</span>
                  </button>
                </div>
              </div>

              {/* Console Output Window */}
              <div className="console-window">
                <div className="console-header">
                  <div className="window-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <span className="console-title">telemetry-stream://jelwo-v1</span>
                  <span className="badge-live-pulse">
                    <span className="badge-dot" /> LIVE
                  </span>
                </div>

                <div className="console-logs">
                  {logs.map((log) => (
                    <div key={log.id} className="log-row">
                      <span className="log-time">[{log.time}]</span>
                      <span className="log-event">{log.event}</span>
                      <span className="log-payload">{log.payload}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPONENT MATRIX */}
          {activeTab === 'matrix' && (
            <div className="matrix-layout">
              <div className="matrix-selector-strip">
                <button
                  type="button"
                  className={`matrix-tab ${selectedCard === 'analytics' ? 'active' : ''}`}
                  onClick={() => setSelectedCard('analytics')}
                >
                  Analytics Metric Card
                </button>
                <button
                  type="button"
                  className={`matrix-tab ${selectedCard === 'user' ? 'active' : ''}`}
                  onClick={() => setSelectedCard('user')}
                >
                  Live Session Card
                </button>
                <button
                  type="button"
                  className={`matrix-tab ${selectedCard === 'action' ? 'active' : ''}`}
                  onClick={() => setSelectedCard('action')}
                >
                  Action Modal Card
                </button>
              </div>

              <div className="matrix-preview-grid">
                {/* Visual Card Display */}
                <div className="matrix-card-wrapper">
                  {selectedCard === 'analytics' && (
                    <div className="matrix-specimen-card glass-panel">
                      <div className="specimen-header">
                        <span className="specimen-tag">Analytics Hub</span>
                        <span className="specimen-meta">Updated just now</span>
                      </div>
                      <div className="specimen-value">98.4%</div>
                      <p className="specimen-desc">Continuous deployment stability across active nodes.</p>
                      <div className="specimen-badge">Optimal Health</div>
                    </div>
                  )}

                  {selectedCard === 'user' && (
                    <div className="matrix-specimen-card glass-panel">
                      <div className="specimen-header">
                        <span className="specimen-tag">Active Collaborator</span>
                        <span className="badge-dot" />
                      </div>
                      <div className="specimen-avatar-row">
                        <div className="specimen-avatar">JD</div>
                        <div>
                          <div className="specimen-name">Jelwo Developer</div>
                          <div className="specimen-role">Workspace Architect</div>
                        </div>
                      </div>
                      <p className="specimen-desc">Editing <code>src/engine/runtime.ts</code></p>
                    </div>
                  )}

                  {selectedCard === 'action' && (
                    <div className="matrix-specimen-card glass-panel">
                      <div className="specimen-header">
                        <span className="specimen-tag">Action Modal</span>
                      </div>
                      <h4 className="specimen-title">Deploy to Production</h4>
                      <p className="specimen-desc">Trigger instantaneous global edge distribution.</p>
                      <div className="specimen-action-row">
                        <button type="button" className="btn-primary btn-sm">Confirm Deploy</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Code Export Box */}
                <div className="matrix-code-box">
                  <div className="matrix-code-header">
                    <span>Generated CSS Module</span>
                    <button
                      type="button"
                      className="btn-copy"
                      onClick={() => handleCopyCode(sampleSnippet)}
                    >
                      {copied ? <Check size={14} className="icon-emerald" /> : <Copy size={14} />}
                      <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="code-display">
                    <code>{sampleSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
