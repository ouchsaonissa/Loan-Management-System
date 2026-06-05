const loanStats = [
  { label: 'Approved loans', value: 2, color: 'success', note: 'Ready or already disbursed' },
  { label: 'Rejected loans', value: 1, color: 'danger', note: 'Can be reviewed before reapplying' },
  { label: 'Pending loans', value: 1, color: 'warning', note: 'Waiting for staff decision' },
];

function CustomerDashboard({ onNavigate }) {
  return (
    <div className="customer-page">
      <div className="welcome-card customer-welcome mb-4">
        <div className="row align-items-center g-3">
          <div className="col-lg-8">
            <p className="eyebrow mb-2">Welcome back, Sreynich</p>
            <h1>Your personal loan overview</h1>
            <p className="mb-0">
              Track your current loan, application progress, and upcoming payments in one simple customer view.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end">
            <button className="btn btn-light customer-hero-button" type="button" onClick={() => onNavigate('Apply for Loan')}>
              Apply for new loan
            </button>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-xl-6">
          <div className="card h-100 customer-highlight-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <p className="eyebrow text-primary mb-2">Current loan status</p>
                  <h4 className="mb-2">Home improvement loan</h4>
                  <p className="text-muted mb-3">Loan No. LN-2026-001 • Approved and active</p>
                </div>
                <span className="badge rounded-pill text-bg-success">Approved</span>
              </div>
              <div className="customer-progress mb-3">
                <div style={{ width: '62%' }} />
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>$7,800 paid</span>
                <span>$4,700 remaining</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="card h-100 customer-highlight-card">
            <div className="card-body">
              <p className="eyebrow text-primary mb-2">Next payment due</p>
              <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                <div>
                  <h4 className="mb-1">$350.00</h4>
                  <p className="text-muted mb-0">Due on June 20, 2026 for LN-2026-001</p>
                </div>
                <span className="badge rounded-pill text-bg-info">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {loanStats.map((stat) => (
          <div className="col-12 col-md-4" key={stat.label}>
            <div className="card stat-card h-100 customer-stat-card">
              <div className="card-body">
                <span className={`badge text-bg-${stat.color} mb-3`}>{stat.label}</span>
                <h3>{stat.value}</h3>
                <p className="text-muted mb-0">{stat.note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;
