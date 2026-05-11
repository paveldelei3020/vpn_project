import React from 'react';
import './App.css';


function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">GEN-Z<span>VPN</span></div>
        <div className="nav-actions">
          <button className="btn-ghost">Тарифы</button>
          <button className="btn-primary">Личный кабинет</button>
        </div>
      </nav>

      <main className="hero">
        <div className="status-badge">● Система защищена</div>
        <h1>Твоя анонимность — наш приоритет</h1>
        <p>Шифрование военного уровня и 0% логов. Подключайся в один клик.</p>
        
        <div className="main-action">
          <div className="power-button">
            <div className="power-icon">🔌</div>
          </div>
          <p>Нажми, чтобы защитить соединение</p>
        </div>
      </main>

      <section className="features">
        <div className="feature-card">
          <div className="icon">⚡</div>
          <h3>Ultra Speed</h3>
          <p>До 10 Гбит/с без задержек</p>
        </div>
        <div className="feature-card">
          <div className="icon">🌍</div>
          <h3>50+ Стран</h3>
          <p>Любой контент доступен</p>
        </div>
        <div className="feature-card">
          <div className="icon">🔒</div>
          <h3>No Logs</h3>
          <p>Мы не храним ваши данные</p>
        </div>
      </section>
    </div>
  );
}

export default App;