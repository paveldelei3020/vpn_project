import React from 'react';
import './Updates.css';

const Updates = ({ changelog }) => {
  
  const dbUpdate = {
    version: '2.0.0',
    date: 'Май 2026',
    type: 'VPN',
    title: 'Интеграция с PostgreSQL и запуск Авторизации',
    description: 'Полноценный переход на full-stack архитектуру. Проект подключен к СУБД, реализована валидация и безопасное управление сессиями.',
    changes: [
      'Подключена реляционная база данных PostgreSQL через Node.js сервер',
      'Реализована рабочая форма регистрации и входа с валидацией email и длины пароля',
      'Настроена автоматизация: создание триал-подписки в БД при регистрации нового юзера'
    ]
  };

  const allUpdates = [dbUpdate, ...changelog];

  return (
    <section className="updates-container" id="updates">
      <div className="updates-header">
        <h2 className="section-title">Журнал обновлений</h2>
        <p>Следи за развитием GEN-Z VPN в реальном времени</p>
      </div>

      <div className="timeline">
        {allUpdates.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot-wrapper">
              <div className={`timeline-dot ${item.type === 'VPN' ? 'neon-blue' : 'neon-purple'}`}></div>
              <div className="timeline-line"></div>
            </div>
            
            <div className="timeline-content">
              <div className="update-meta">
                <span className="update-version">v{item.version}</span>
                <span className="update-date">{item.date}</span>
                <span className={`update-tag ${item.type === 'VPN' ? 'tag-vpn' : 'tag-site'}`}>\
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