const menuItems = [
  { label: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
  { label: 'Customers', icon: '👥', path: '/admin/customers' },
  { label: 'Customer Form', icon: '📝', path: '/admin/customer-form' },
  { label: 'Loans', icon: '💰', path: '/admin/loans' },
  { label: 'Loan Form', icon: '📄', path: '/admin/loan-form' },
  { label: 'Payments', icon: '💳', path: '/admin/payments' },
  { label: 'Payment Form', icon: '✅', path: '/admin/payment-form' },
];

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">LMS</div>
        <div>
          <h5 className="mb-0">Group 6</h5>
          <small>Loan dashboard</small>
        </div>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            className={`sidebar-link ${activePage === item.label ? 'active' : ''}`}
            key={item.label}
            type="button"
            onClick={() => onNavigate(item.path)}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
