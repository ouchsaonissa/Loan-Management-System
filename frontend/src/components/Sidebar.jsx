const menuItems = [
  { label: 'Dashboard', icon: '📊' },
  { label: 'Customers', icon: '👥' },
  { label: 'Customer Form', icon: '📝' },
  { label: 'Loans', icon: '💰' },
  { label: 'Loan Form', icon: '📄' },
  { label: 'Payments', icon: '💳' },
  { label: 'Payment Form', icon: '✅' },
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
            onClick={() => onNavigate(item.label)}
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

