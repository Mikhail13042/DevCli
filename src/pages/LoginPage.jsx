import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accounts } from '../services/accounts.js';

export default function LoginPage({ onLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = accounts.find(
      (acc) => acc.login === login.trim() && acc.password === password
    );

    if (user) {
      onLogin(user);
      navigate('/inventory');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Welcome</h1>
        <p className="subtitle">Login to get started!</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              placeholder="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">Login</button>
          <p className="error">{error}</p>
        </form>

        <div className="login-footer">
          Тестовые аккаунты: admin / 123, user / 456
        </div>
      </div>
    </div>
  );
}
