import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Страница входа и регистрации (демо-режим, без реальных API).
 * Для интеграции с бэкендом замените alert и console.log на реальные fetch-запросы.
 *
 * Ожидаемые API-эндпоинты:
 * - POST /api/auth/register
 *   Request: { "full_name": "string", "email": "string", "password": "string" }
 *   Response: { "token": "string", "user": { "id": "number", "full_name": "string", "email": "string", "is_admin": "boolean" } }
 * - POST /api/auth/login
 *   Request: { "email": "string", "password": "string" }
 *   Response: { "token": "string", "user": { ... } }
 *
 * После успешного ответа сохраните token и user в localStorage и вызовите navigate('/dashboard').
 */
function LoginSignup() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  // Логин
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Регистрация
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    // Имитация запроса к API
    setTimeout(() => {
      console.log('[Mock] Вход:', { email: loginEmail, password: loginPassword });
      alert('Демо-режим: интеграция с бэкендом будет позже');
      setLoginLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupError('');

    // Валидация
    if (!signupEmail.includes('@')) {
      setSignupError('Введите корректный email');
      return;
    }
    if (signupPassword !== confirmPassword) {
      setSignupError('Пароли не совпадают');
      return;
    }
    if (signupPassword.length < 4) {
      setSignupError('Пароль должен быть не менее 4 символов');
      return;
    }

    setSignupLoading(true);
    setTimeout(() => {
      console.log('[Mock] Регистрация:', { full_name: fullName, email: signupEmail, password: signupPassword });
      alert('Демо-режим: интеграция с бэкендом будет позже');
      setSignupLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="page-wrapper">
      <div className="auth-card">
        <h1 className="logo">ResourceHub</h1>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setLoginError(''); setSignupError(''); }}
          >
            Вход
          </button>
          <button
            className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => { setActiveTab('signup'); setLoginError(''); setSignupError(''); }}
          >
            Регистрация
          </button>
        </div>

        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="field">
              <label>Пароль</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            {loginError && <div className="error-message">{loginError}</div>}
            <button type="submit" className="submit-btn" disabled={loginLoading}>
              {loginLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>
        )}

        {activeTab === 'signup' && (
          <form onSubmit={handleSignup} className="auth-form">
            <div className="field">
              <label>Полное имя</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Алексей Иванов"
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="field">
              <label>Пароль</label>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                placeholder="минимум 4 символа"
              />
            </div>
            <div className="field">
              <label>Подтвердите пароль</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            {signupError && <div className="error-message">{signupError}</div>}
            <button type="submit" className="submit-btn" disabled={signupLoading}>
              {signupLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
            </button>
          </form>
        )}
      </div>

      <div className="illustration" aria-hidden="true">
        <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="120" y="100" width="160" height="20" rx="3" fill="#B0BEC5" />
          <rect x="145" y="125" width="25" height="30" rx="4" fill="#CFD8DC" />
          <rect x="230" y="125" width="25" height="30" rx="4" fill="#CFD8DC" />
          <rect x="160" y="60" width="80" height="40" rx="4" fill="#37474F" />
          <rect x="170" y="65" width="60" height="30" rx="2" fill="#546E7A" />
          <rect x="130" y="120" width="6" height="15" fill="#90A4AE" />
          <rect x="264" y="120" width="6" height="15" fill="#90A4AE" />
          <circle cx="310" cy="80" r="12" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
          <path d="M310 73 L310 80 L315 80" stroke="#607D8B" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

export default LoginSignup;