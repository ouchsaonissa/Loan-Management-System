import CustomerSidebar from './CustomerSidebar.jsx';

function CustomerLayout({ activePage, children, currentUser, onLogout, onNavigate }) {
  return (
    <div className="app-shell customer-shell">
      <CustomerSidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="main-content">
        <nav className="navbar navbar-expand-lg app-navbar customer-navbar">
          <div className="container-fluid px-4">
            <div>
              <span className="navbar-brand mb-0 h1">Customer Loan Center</span>
              <p className="page-subtitle mb-0">{activePage}</p>
            </div>
            <div className="d-flex align-items-center gap-2 gap-md-3">
              <div className="text-end d-none d-md-block">
                <p className="user-name mb-0">{currentUser?.fullName || currentUser?.username || 'Customer user'}</p>
                <small className="text-muted">Customer account</small>
              </div>
              <button className="btn btn-primary btn-sm" type="button" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
        <section className="content-area">{children}</section>
      </main>
    </div>
  );
}

export default CustomerLayout;
