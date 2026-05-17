import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.includes('@')) {
      setError('Введите корректный email');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    const endpoint = isLogin ? '/login' : '/register';

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Что-то пошло не так');
      } else {
        setSuccess(data.message);
        if (isLogin) {
          localStorage.setItem('userEmail', data.user.email);
          setTimeout(() => onAuthSuccess(), 1500);
        } else {
          setTimeout(() => setIsLogin(true), 1500);
        }
      }
    } catch (err) {
      setError('Не удалось связаться с сервером. Проверь, запущен ли бэкенд.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</h2>
        <p className="auth-subtitle">GEN-Z VPN — Твой личный щит в сети</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@genz.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <button type="submit" className="auth-btn">
            {isLogin ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
          {isLogin ? 'Еще нет аккаунта? Зарегистрируйся' : 'Уже есть аккаунт? Войди'}
        </button>
      </div>
    </div>
  );
};

export default Auth;