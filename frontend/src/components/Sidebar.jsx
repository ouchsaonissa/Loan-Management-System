const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: "📊",
  },
  {
    label: "Customers",
    path: "/admin/customers",
    icon: "👥",
  },
  {
    label: "Loans",
    path: "/admin/loans",
    icon: "💰",
  },
  {
    label: "Payments",
    path: "/admin/payments",
    icon: "💳",
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
            key={item.label}
            type="button"
            className={`sidebar-link ${
              activePage === item.label ? "active" : ""
            }`}
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