const stats = [
  { label: 'Customers', value: '24', color: 'primary' },
  { label: 'Active Loans', value: '18', color: 'success' },
  { label: 'Pending Reviews', value: '6', color: 'warning' },
  { label: 'Payments This Month', value: '$8,450', color: 'info' },
];

const recentLoans = [
  { customer: 'Sophea Chan', amount: '$5,000', status: 'Approved' },
  { customer: 'Dara Kim', amount: '$2,500', status: 'Pending' },
  { customer: 'Rina Sok', amount: '$7,800', status: 'Completed' },
];

function Dashboard() {
  return (
    <div>
      <div className="welcome-card mb-4">
        <div>
          <p className="eyebrow mb-2">Static sample data</p>
          <h1>Loan Management Dashboard</h1>
          <p className="mb-0">A clean starting point for the React frontend before backend API integration.</p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((stat) => (
          <div className="col-12 col-md-6 col-xl-3" key={stat.label}>
            <div className="card stat-card h-100">
              <div className="card-body">
                <span className={`badge text-bg-${stat.color} mb-3`}>{stat.label}</span>
                <h3>{stat.value}</h3>
                <p className="text-muted mb-0">Sample overview metric</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card table-card">
        <div className="card-body">
          <h5 className="card-title mb-3">Recent loan activity</h5>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLoans.map((loan) => (
                  <tr key={loan.customer}>
                    <td>{loan.customer}</td>
                    <td>{loan.amount}</td>
                    <td><span className="badge rounded-pill text-bg-light border">{loan.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
