const customerMenuItems = [
  { label: 'Customer Dashboard', icon: '🏠', path: '/customer/dashboard' },
  { label: 'My Loan Status', icon: '📌', path: '/customer/my-loan-status' },
  { label: 'My Applications', icon: '📋', path: '/customer/my-applications' },
  { label: 'Payment History', icon: '💳', path: '/customer/payment-history' },
  { label: 'Apply for Loan', icon: '📝', path: '/customer/apply-loan' },
];

function CustomerSidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar customer-sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon customer-brand-icon">CS</div>
        <div>
          <h5 className="mb-0">Customer Portal</h5>
          <small>Personal loan center</small>
        </div>
      </div>

      <div className="sidebar-menu">
        {customerMenuItems.map((item) => (
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

export default CustomerSidebar;
