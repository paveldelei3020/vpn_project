import React from 'react';
import './App.css'; // Импортируем наш файл

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">SkyVPN</div>
        <div className="nav-links">
          <button className="btn-primary">Личный кабинет</button>
        </div>
      </nav>

      <header style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '3rem' }}>Безопасный VPN для каждого</h1>
        <p style={{ color: '#94a3b8' }}>Защита ваших данных в один клик</p>
      </header>

      <div className="pricing-grid">
        <div className="card">
          <h3>Бесплатный</h3>
          <p className="price">0 ₽</p>
          <button className="btn-primary" style={{ width: '100%' }}>Выбрать</button>
        </div>
        <div className="card">
          <h3>Премиум</h3>
          <p className="price">299 ₽</p>
          <button className="btn-primary" style={{ width: '100%' }}>Купить</button>
        </div>
      </div>
    </div>
  );
}

export default App;