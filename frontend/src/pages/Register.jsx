import { useState } from 'react';
import apiClient from '../api/axiosConfig.js';

const CUSTOMER_ROLE = 'CUSTOMER';

function Register({ onBackToLogin, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please confirm your password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await apiClient.post('/auth/register', {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: CUSTOMER_ROLE,
      });

      onRegisterSuccess(data);
    } catch (registerError) {
        console.log(registerError.response);
        const message =
        registerError.response?.data?.message ||
        JSON.stringify(registerError.response?.data) ||
        registerError.message;

  setError(message);
  
}
  };

  return (
    <main className="login-page">
      <section className="login-card register-card" aria-labelledby="register-title">
        <div className="login-header register-header">
          <div className="login-logo" aria-hidden="true">LMS</div>
          <p className="login-kicker">Loan Management System</p>
          <h1 id="register-title">Create your customer account</h1>
          <p className="login-subtitle">Create your customer account to apply for loans and track your applications.</p>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form className="login-form register-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter full name"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="registerUsername">Username</label>
            <input
              id="registerUsername"
              name="username"
              type="text"
              placeholder="Choose username"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="registerPassword">Password</label>
            <input
              id="registerPassword"
              name="password"
              type="password"
              placeholder="Create password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className="login-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="auth-switch-text">
          Already have an account?{' '}
          <a className="auth-switch-link" href="/login" onClick={(event) => {
            event.preventDefault();
            onBackToLogin();
          }}>
            Back to Login
          </a>
        </p>
      </section>
    </main>
  );
}

export default Register;
