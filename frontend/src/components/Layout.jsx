import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

function Layout({ activePage, children, onLogout, onNavigate }) {
  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="main-content">
        <Navbar activePage={activePage} onLogout={onLogout} />
        <section className="content-area">{children}</section>
      </main>
    </div>
  );
}

export default Layout;
