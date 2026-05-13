import React from 'react';
import './Updates.css';

const Updates = ({ changelog }) => {
  return (
    <section className="updates-container" id="updates">
      <div className="updates-header">
        <h2 className="section-title">Журнал обновлений</h2>
        <p>Следи за развитием GEN-Z VPN в реальном времени</p>
      </div>

      <div className="timeline">
        {changelog.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot-wrapper">
              <div className={`timeline-dot ${item.type === 'VPN' ? 'neon-blue' : 'neon-purple'}`}></div>
              <div className="timeline-line"></div>
            </div>
            
            <div className="timeline-content">
              <div className="update-meta">
                <span className="update-version">v{item.version}</span>
                <span className="update-date">{item.date}</span>
                <span className={`update-tag ${item.type === 'VPN' ? 'tag-vpn' : 'tag-site'}`}>
                  {item.type}
                </span>
              </div>
              <h3 className="update-title">{item.title}</h3>
              <p className="update-desc">{item.description}</p>
              <ul className="update-changes">
                {item.changes.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Updates;