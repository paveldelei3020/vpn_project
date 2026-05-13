import React, { useRef, useEffect } from 'react';
import { useVPN } from './useVPN';
import Updates from './Updates';
import './App.css';

function App() {
  const { 
    currentPage, 
    navigateTo, 
    isMenuOpen, 
    toggleMenu, 
    closeMenu, 
    loadingPlan, 
    handlePlanClick, 
    userData, 
    news, 
    changelog 
  } = useVPN();
  
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, closeMenu]);

  return (
    <div className="app-container">
      {/* Шапка общая для всех страниц */}
      <nav className="navbar">
        <div className="logo" onClick={() => navigateTo('home')} style={{cursor: 'pointer'}}>
          GEN-Z<span>VPN</span>
        </div>
        <div className="nav-actions">
          <button className={`nav-link-btn ${currentPage === 'home' ? 'active' : ''}`} onClick={() => navigateTo('home')}>
            Главная
          </button>
          <button className={`nav-link-btn ${currentPage === 'updates' ? 'active' : ''}`} onClick={() => navigateTo('updates')}>
            Обновления
          </button>
          
          <div className="dropdown-wrapper" ref={menuRef}>
            <button className={`dots-btn ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </button>

            {isMenuOpen && (
              <div className="github-style-menu">
                <div className="menu-header">
                  <div className="user-info-box">
                    <div className="avatar-circle">GZ</div>
                    <div className="user-details">
                      <span className="user-login">{userData.name}</span>
                      <span className="set-status">😊 Set status</span>
                    </div>
                  </div>
                </div>
                <div className="menu-divider"></div>
                <div className="menu-group">
                  <button className="menu-item">👤 Profile</button>
                  <button className="menu-item">⚙️ Settings</button>
                  {/* Кнопка перехода в меню */}
                  <button className="menu-item" onClick={() => navigateTo('updates')}>
                    🚀 Changelog
                  </button>
                </div>
                <div className="menu-divider"></div>
                <div className="menu-section-label">Latest News</div>
                <div className="menu-news-list">
                  {news.map(item => (
                    <div key={item.id} className="news-card">
                      <p>{item.title}</p>
                      <span>{item.date}</span>
                    </div>
                  ))}
                </div>
                <div className="menu-divider"></div>
                <button className="menu-item logout-red">Sign out</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Контент меняется в зависимости от currentPage */}
      <main className="fade-in">
        {currentPage === 'home' ? (
          <>
            <header className="hero">
              <div className="status-label">● Connection: Secure</div>
              <h1>Твой интернет — твои правила</h1>
              <p>Максимальная скорость и полная анонимность для нового поколения.</p>
              <button className="main-buy-btn" onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'})}>
                КУПИТЬ ДОСТУП
              </button>
            </header>

            <section className="pricing-section" id="pricing">
              <h2 className="section-title">Выбери свой тариф</h2>
              <div className="pricing-grid">
                <div className="price-card-v2">
                  <h3 className="card-plan-title">Пробный</h3>
                  <div className="card-price">0 ₽<span>/3 дня</span></div>
                  <button className={`card-btn-outline ${loadingPlan === 'Пробный' ? 'loading' : ''}`} onClick={() => handlePlanClick('Пробный')}>
                    {loadingPlan === 'Пробный' ? 'Загрузка...' : 'Попробовать'}
                  </button>
                </div>
                <div className="price-card-v2 featured">
                  <div className="badge-top pulse">TOP</div>
                  <h3 className="card-plan-title">Годовой</h3>
                  <div className="card-price">199 ₽<span>/мес</span></div>
                  <button className={`card-btn-solid ${loadingPlan === 'Годовой' ? 'loading' : ''}`} onClick={() => handlePlanClick('Годовой')}>
                    {loadingPlan === 'Годовой' ? 'Обработка...' : 'Выбрать план'}
                  </button>
                </div>
                <div className="price-card-v2">
                  <h3 className="card-plan-title">Месячный</h3>
                  <div className="card-price">349 ₽<span>/мес</span></div>
                  <button className={`card-btn-outline ${loadingPlan === 'Месячный' ? 'loading' : ''}`} onClick={() => handlePlanClick('Месячный')}>
                    {loadingPlan === 'Месячный' ? 'Загрузка...' : 'Купить'}
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <Updates changelog={changelog} />
        )}
      </main>

      <footer className="footer">
        <div className="logo-small">GEN-Z<span>VPN</span></div>
        <p>© 2026 GEN-Z VPN. Твой выбор — твоя анонимность.</p>
      </footer>
    </div>
  );
}

export default App;