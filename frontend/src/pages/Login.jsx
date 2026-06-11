import { useState } from 'react';
import apiClient from '../api/axiosConfig.js';

function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { data } = await apiClient.post('/auth/login', { username, password });
      onLogin(data);
    } catch (loginError) {
      const message = loginError.response?.data?.message || 'Login failed. Please check your username and password.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-header">
          <div className="login-logo" aria-hidden="true">LMS</div>
          <p className="login-kicker">Loan Management System</p>
          <h1 id="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to continue managing customers, loans, and payments.</p>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="login-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-switch-text">
          New to LMS?{' '}
          <a className="auth-switch-link" href="/register" onClick={(event) => {
            event.preventDefault();
            onShowRegister();
          }}>
            Create an account
          </a>
        </p>

        <p className="login-note">
          Demo account: <strong>admin</strong> / <strong>admin123</strong>
        </p>
      </section>
    </main>
  );
}

export default Login;
