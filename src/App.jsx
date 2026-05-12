import React from 'react';
import { useVPN } from './useVPN';
import './App.css';

function App() {
  const { isProfileOpen, toggleProfile, handleBuyClick, userData } = useVPN();

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">GEN-Z<span>VPN</span></div>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={handleBuyClick}>Тарифы</button>
          <button className="btn-primary" onClick={toggleProfile}>Личный кабинет</button>
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
            <p>Протоколы WireGuard, которые невозможно взломать. Твой трафик — твоя тайна.</p>
          </div>
          <div className="step">
            <span className="step-num">02</span>
            <h4>Никаких следов</h4>
            <p>Сервера на RAM-дисках удаляют все данные при каждой перезагрузке.</p>
          </div>
          <div className="step">
            <span className="step-num">03</span>
            <h4>Смарт-роутинг</h4>
            <p>Автоматический подбор узла для минимального пинга в играх и кино.</p>
          </div>
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <h2 className="pricing-title">Выбери свой тариф</h2>
        
        <div className="pricing-grid">
          {/* Пробный тариф */}
          <div className="price-card fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="plan-name">Пробный</h3>
            <div className="price-tag">0 ₽<span>/3 дня</span></div>
            <ul className="features-list">
              <li>Все локации</li>
              <li>Скорость до 100 Мбит</li>
            </ul>
            <button className="btn-outline">Попробовать</button>
          </div>
          
          {/* Годовой тариф (Центральный) */}
          <div className="price-card featured fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="top-badge pulse">TOP</div>
            <h3 className="plan-name">Годовой</h3>
            <div className="price-tag">199 ₽<span>/мес</span></div>
            <ul className="features-list">
              <li>Безлимитная скорость</li>
              <li>5 устройств сразу</li>
              <li>Приоритетный пинг</li>
            </ul>
            <button className="btn-solid">Выбрать план</button>
          </div>
          
          {/* Месячный тариф */}
          <div className="price-card fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="plan-name">Месячный</h3>
            <div className="price-tag">349 ₽<span>/мес</span></div>
            <ul className="features-list">
              <li>Безлимитная скорость</li>
              <li>Все сервера</li>
            </ul>
            <button className="btn-outline">Купить</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="logo">GEN-Z<span>VPN</span></div>
        <p>© 2026 Свобода в каждом байте.</p>
      </footer>

      {isProfileOpen && (
        <div className="modal-overlay" onClick={toggleProfile}>
          <div className="profile-modal" onClick={e => e.stopPropagation()}>
            <div className="profile-header">
              <div className="avatar">👤</div>
              <h3>{userData.name}</h3>
              <p className="user-status">{userData.status}</p>
              <button className="close-btn" onClick={toggleProfile}>&times;</button>
            </div>
            <div className="profile-body">
              <div className="info-item">
                <span>Email:</span>
                <p>{userData.email}</p>
              </div>
              <div className="info-item">
                <span>Баланс:</span>
                <p className="highlight">{userData.balance}</p>
              </div>
              <div className="info-item">
                <span>Подписка:</span>
                <p>{userData.daysLeft} дн.</p>
              </div>
            </div>
            <div className="profile-footer">
              <button className="btn-primary-alt">Пополнить</button>
              <button className="btn-ghost" style={{marginTop: '10px'}}>Выйти</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;