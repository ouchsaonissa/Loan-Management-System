const menuItems = [
  {
    label: "Customer Dashboard",
    icon: "🏠",
  },
  {
    label: "My Applications",
    icon: "📋",
  },
  {
    label: "Apply for Loan",
    icon: "📝",
  },
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
