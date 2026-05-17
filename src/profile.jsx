import React, { useState, useEffect } from 'react';
import './profile.css'; 

function Profile({ userEmail, navigateTo }) {
  const [balance, setBalance] = useState(0);
  const [subscription, setSubscription] = useState('Загрузка...');

  const fetchProfileFromDB = async () => {
    if (!userEmail) return;
    try {
      const response = await fetch(`http://localhost:5000/get-profile?email=${userEmail}`);
      const data = await response.json();
      if (response.ok) {
        setBalance(data.balance);
        setSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Ошибка получения профиля:', error);
      setSubscription('Ошибка загрузки');
    }
  };

  useEffect(() => {
    fetchProfileFromDB();

    window.addEventListener('balanceUpdated', fetchProfileFromDB);
    window.addEventListener('subscriptionUpdated', fetchProfileFromDB);

    return () => {
      window.removeEventListener('balanceUpdated', fetchProfileFromDB);
      window.removeEventListener('subscriptionUpdated', fetchProfileFromDB);
    };
  }, [userEmail]);

  const handleAddMoney = async (amount) => {
    try {
      const response = await fetch('http://localhost:5000/update-balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, amount: Number(amount) })
      });
      const data = await response.json();

      if (response.ok) {
        setBalance(data.balance);
        setSubscription(data.subscription);
        
        window.dispatchEvent(new Event('balanceUpdated'));
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Ошибка при соединении с сервером');
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2 className="profile-title">👤 Личный кабинет</h2>
        
        <div className="profile-info-item">
          <strong>Email:</strong> <span className="profile-info-value">{userEmail}</span>
        </div>

        <div className="profile-info-item">
          <strong>Текущий тариф:</strong> <span className="profile-info-value subscription">{subscription}</span>
        </div>

        <div className="profile-info-item">
          <strong>Баланс:</strong> <span className="profile-info-value balance">{balance} ₽</span>
        </div>

        <div className="profile-divider">
          <p className="profile-section-label">⚡ Быстрое пополнение баланса:</p>
          <div className="balance-buttons-group">
            <button className="card-btn-outline" onClick={() => handleAddMoney(100)}>+100 ₽</button>
            <button className="card-btn-outline" onClick={() => handleAddMoney(500)}>+500 ₽</button>
            <button className="card-btn-outline" onClick={() => handleAddMoney(1000)}>+1000 ₽</button>
          </div>
        </div>

        <button className="main-buy-btn profile-action-btn" onClick={() => navigateTo('home')}>
          НА ГЛАВНУЮ К ТАРИФАМ
        </button>
      </div>
    </div>
  );
}

export default Profile;