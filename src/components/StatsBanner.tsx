import { TrendingUp, Cpu, Users, Clock } from 'lucide-react';
import './StatsBanner.css';

export const StatsBanner = () => {
  const stats = [
    {
      id: 'speed',
      value: '10x',
      label: 'Rapid Prototyping',
      sub: 'Zero setup boilerplate',
      icon: <TrendingUp size={20} className="stat-icon-cyan" />
    },
    {
      id: 'latency',
      value: '< 0.4ms',
      label: 'Dispatch Latency',
      sub: 'Predictive local caching',
      icon: <Clock size={20} className="stat-icon-violet" />
    },
    {
      id: 'uptime',
      value: '99.99%',
      label: 'Engine Reliability',
      sub: 'Strict type verification',
      icon: <Cpu size={20} className="stat-icon-emerald" />
    },
    {
      id: 'scale',
      value: '140k+',
      label: 'Active Workflows',
      sub: 'Adopted worldwide',
      icon: <Users size={20} className="stat-icon-amber" />
    }
  ];

  return (
    <section id="stats" className="stats-section">
      <div className="container">
        <div className="stats-glass-container glass-panel">
          <div className="stats-grid">
            {stats.map((item) => (
              <div key={item.id} className="stat-box">
                <div className="stat-box-icon-row">
                  {item.icon}
                  <span className="stat-accent-glow" />
                </div>
                <div className="stat-big-number gradient-text">{item.value}</div>
                <div className="stat-main-label">{item.label}</div>
                <div className="stat-sub-label">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
