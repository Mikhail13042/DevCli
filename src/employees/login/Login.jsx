import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/action/authActions.js';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ login, password }))
      .unwrap()
      .then(() => navigate('/inventory'))
      .catch(() => {});
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