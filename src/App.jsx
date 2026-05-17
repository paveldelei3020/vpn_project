import React, { useRef, useEffect, useState } from 'react';
import { useVPN } from './useVPN';
import Updates from './Updates';
import Auth from './Auth'; 
import Profile from './profile'; 
import './App.css';

function App() {
  const { 
    currentPage, 
    navigateTo, 
    isMenuOpen, 
    toggleMenu, 
    closeMenu, 
    loadingPlan, 
    setLoadingPlan,
    news, 
    changelog 
  } = useVPN();
  
  const menuRef = useRef(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userBalance, setUserBalance] = useState(0);

  const fetchBalanceFromDB = async (email) => {
    if (!email) return;
    try {
      const response = await fetch(`http://localhost:5000/get-profile?email=${email}`);
      const data = await response.json();
      if (response.ok) {
        setUserBalance(data.balance);
      }
    } catch (error) {
      console.error('Ошибка сети при получении баланса:', error);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setUserEmail(savedEmail);
      fetchBalanceFromDB(savedEmail);
    }

    const handleBalanceChange = () => fetchBalanceFromDB(localStorage.getItem('userEmail'));
    window.addEventListener('balanceUpdated', handleBalanceChange);
    return () => window.removeEventListener('balanceUpdated', handleBalanceChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    setUserBalance(0);
    navigateTo('home');
    closeMenu();
  };

  const handleAuthSuccess = () => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
    fetchBalanceFromDB(email);
    navigateTo('home');
  };

  const purchasePlan = async (planName, price) => {
    if (!userEmail) {
      alert('Сначала войдите в аккаунт, чтобы приобрести тариф!');
      navigateTo('auth');
      return;
    }

    if (userBalance < price) {
      alert(`Недостаточно средств! Стоимость: ${price} ₽. Ваш баланс в БД: ${userBalance} ₽.`);
      navigateTo('profile');
      return;
    }

    setLoadingPlan(planName);

    try {
      const response = await fetch('http://localhost:5000/update-balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: userEmail, 
          amount: -Number(price),
          planName: planName 
        })
      });

      const data = await response.json();

      if (response.ok) {
        setUserBalance(data.balance);
        alert(`🎉 Успешно! Вы приобрели тариф "${planName}". Списано: ${price} ₽.`);
        
        window.dispatchEvent(new Event('balanceUpdated'));
        window.dispatchEvent(new Event('subscriptionUpdated'));
      } else {
        alert(data.message || 'Ошибка при покупке тарифа');
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка соединения с сервером при оплате');
    } finally {
      setLoadingPlan(null);
    }
  };

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
      <nav className="navbar">
        <div className="logo logo-clickable" onClick={() => navigateTo('home')}>
          GEN-Z<span>VPN</span>
        </div>
        <div className="nav-actions">
          <button className={`nav-link-btn ${currentPage === 'home' ? 'active' : ''}`} onClick={() => navigateTo('home')}>
            Главная
          </button>
          <button className={`nav-link-btn ${currentPage === 'updates' ? 'active' : ''}`} onClick={() => navigateTo('updates')}>
            Обновления
          </button>
          
          {userEmail ? (
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
                        <span className="user-login">{userEmail}</span>
                        <span className="menu-balance">💰 Баланс: {userBalance} ₽</span>
                      </div>
                    </div>
                  </div>
                  <div className="menu-divider"></div>
                  <div className="menu-group">
                    <button className="menu-item" onClick={() => navigateTo('profile')}>👤 Profile</button>
                    <button className="menu-item">⚙️ Settings</button>
                    <button className="menu-item" onClick={() => { navigateTo('updates'); closeMenu(); }}>
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
                  <button className="menu-item logout-red" onClick={handleLogout}>Sign out</button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className={`nav-link-btn ${currentPage === 'auth' ? 'active' : ''} auth-highlight`} 
              onClick={() => navigateTo('auth')}
            >
              Войти
            </button>
          )}
        </div>
      </nav>

      <main className="fade-in">
        
        {currentPage === 'home' && (
          <>
            <header className="hero">
              <div className="status-label">● Connection: Secure</div>
              <h1>Твой internet — твои правила</h1>
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
                  <button 
                    className={`card-btn-outline ${loadingPlan === 'Пробный' ? 'loading' : ''}`} 
                    onClick={() => purchasePlan('Пробный', 0)}
                  >
                    {loadingPlan === 'Пробный' ? 'Загрузка...' : 'Попробовать'}
                  </button>
                </div>

                <div className="price-card-v2 featured">
                  <div className="badge-top pulse">TOP</div>
                  <h3 className="card-plan-title">Годовой</h3>
                  <div className="card-price">199 ₽<span>/мес</span></div>
                  <button 
                    className={`card-btn-solid ${loadingPlan === 'Годовой' ? 'loading' : ''}`} 
                    onClick={() => purchasePlan('Годовой', 199)}
                  >
                    {loadingPlan === 'Годовой' ? 'Обработка...' : 'Выбрать план'}
                  </button>
                </div>

                <div className="price-card-v2">
                  <h3 className="card-plan-title">Месячный</h3>
                  <div className="card-price">349 ₽<span>/мес</span></div>
                  <button 
                    className={`card-btn-outline ${loadingPlan === 'Месячный' ? 'loading' : ''}`} 
                    onClick={() => purchasePlan('Месячный', 349)}
                  >
                    {loadingPlan === 'Месячный' ? 'Загрузка...' : 'Купить'}
                  </button>
                </div>

              </div>
            </section>
          </>
        )}

        {currentPage === 'updates' && (
          <Updates changelog={changelog} />
        )}

        {currentPage === 'auth' && (
          <Auth onAuthSuccess={handleAuthSuccess} />
        )}

        {currentPage === 'profile' && (
          <Profile userEmail={userEmail} navigateTo={navigateTo} />
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