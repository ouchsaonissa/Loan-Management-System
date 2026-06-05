function Login({ onLogin }) {
  return (
    <div className="login-page">
      <div className="login-card shadow-lg">
        <div className="text-center mb-4">
          <div className="login-logo mx-auto">LMS</div>
          <h2 className="mt-3 mb-1">Welcome back</h2>
          <p className="text-muted mb-0">Sign in to view the sample dashboard.</p>
        </div>

        <form onSubmit={onLogin}>
          <div className="mb-3">
            <label className="form-label" htmlFor="username">Username</label>
            <input className="form-control" id="username" type="text" defaultValue="admin" />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-control" id="password" type="password" defaultValue="admin123" />
          </div>
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>

        <div className="alert alert-light border mt-4 mb-0 small">
          Demo account: <strong>admin</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}

export default Login;
