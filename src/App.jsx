import React from 'react';
import { useVPN } from './useVPN';
import './App.css';

function App() {
  const { handleBuyClick } = useVPN();

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">GEN-Z<span>VPN</span></div>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={handleBuyClick}>Тарифы</button>
          <button className="btn-primary">Личный кабинет</button>
        </div>
      </nav>

      <header className="hero">
        <div className="status-badge">● Твой узел активен</div>
        <h1>Твой интернет — твои правила</h1>
        <p>Обходи любые фильтры, забудь про лаги и оставайся невидимкой. GEN-Z VPN — это свобода без компромиссов.</p>
        <div className="main-action">
          <button className="buy-button" onClick={handleBuyClick}>
            КУПИТЬ ДОСТУП
            <span>Стань частью поколения свободы</span>
          </button>
        </div>
      </header>

      <section className="how-it-works">
        <h2>Почему GEN-Z?</h2>
        <div className="steps-container">
          <div className="step">
            <span className="step-num">01</span>
            <h4>Шифрование военного уровня</h4>
            <p>Мы используем протоколы WireGuard, которые невозможно взломать перебором. Твой трафик превращается в хаос для провайдера.</p>
          </div>
          <div className="step">
            <span className="step-num">02</span>
            <h4>Никаких следов</h4>
            <p>Наши сервера работают на RAM-дисках. Это значит, что при любой перезагрузке все данные стираются физически.</p>
          </div>
          <div className="step">
            <span className="step-num">03</span>
            <h4>Смарт-роутинг</h4>
            <p>Система сама выбирает кратчайший путь до игровых серверов или стримингов, чтобы пинг был минимальным.</p>
          </div>
        </div>
      </section>

      <section className="pricing" id="categories">
        <h2>Выбери свой план</h2>
        <div className="price-grid">
          <div className="price-card">
            <h3>Пробный</h3>
            <div className="price">0 ₽<span>/3 дня</span></div>
            <ul>
              <li>Все локации</li>
              <li>Скорость до 100 Мбит</li>
            </ul>
            <button className="btn-outline">Попробовать</button>
          </div>
          <div className="price-card featured">
            <div className="popular-tag">Популярно</div>
            <h3>Годовой</h3>
            <div className="price">199 ₽<span>/мес</span></div>
            <ul>
              <li>Безлимитная скорость</li>
              <li>5 устройств сразу</li>
              <li>Приоритетная поддержка</li>
            </ul>
            <button className="btn-primary-alt">Выбрать план</button>
          </div>
          <div className="price-card">
            <h3>Месячный</h3>
            <div className="price">349 ₽<span>/мес</span></div>
            <ul>
              <li>Безлимитная скорость</li>
              <li>Все сервера</li>
            </ul>
            <button className="btn-outline">Купить</button>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="icon">🚀</div>
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
          <p>Мы не храним данные</p>
        </div>
      </section>

      <footer className="footer">
        <div className="logo">GEN-Z<span>VPN</span></div>
        <p>© 2026 Свобода в каждом байте.</p>
      </footer>
    </div>
  );
}

export default App;