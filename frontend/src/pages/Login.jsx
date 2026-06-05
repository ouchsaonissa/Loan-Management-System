function Login({ onLogin }) {
  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-header">
          <div className="login-logo" aria-hidden="true">LMS</div>
          <p className="login-kicker">Loan Management System</p>
          <h1 id="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to continue managing customers, loans, and payments.</p>
        </div>

        <form className="login-form" onSubmit={onLogin}>
          <div className="login-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username"
              autoComplete="username"
              defaultValue="admin"
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
              defaultValue="admin123"
            />
          </div>

          <button className="login-button" type="submit">Login</button>
        </form>

        <p className="login-note">
          Demo account: <strong>admin</strong> / <strong>admin123</strong>
        </p>
      </section>
    </main>
  );
}

export default Login;
