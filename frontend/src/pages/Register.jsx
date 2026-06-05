function Register({ onBackToLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="login-page">
      <section className="login-card register-card" aria-labelledby="register-title">
        <div className="login-header register-header">
          <div className="login-logo" aria-hidden="true">LMS</div>
          <p className="login-kicker">Loan Management System</p>
          <h1 id="register-title">Create account</h1>
          <p className="login-subtitle">Register a staff account to start managing customers, loans, and payments.</p>
        </div>

        <form className="login-form register-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter full name"
              autoComplete="name"
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
            />
          </div>

          <button className="login-button" type="submit">Register</button>
        </form>

        <p className="auth-switch-text">
          Already have an account?{' '}
          <a className="auth-switch-link" href="#login" onClick={onBackToLogin}>
            Back to Login
          </a>
        </p>
      </section>
    </main>
  );
}

export default Register;
