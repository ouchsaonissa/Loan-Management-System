function Navbar({ activePage, currentUser, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container-fluid px-4">
        <div>
          <span className="navbar-brand mb-0 h1">Loan Management System</span>
          <p className="page-subtitle mb-0">{activePage}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="text-end d-none d-sm-block">
            <p className="user-name mb-0">{currentUser?.fullName || currentUser?.username || 'Admin user'}</p>
            <small className="text-muted">{currentUser?.role || 'ADMIN'}</small>
          </div>
          <button className="btn btn-outline-primary btn-sm" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
