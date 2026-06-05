const applications = [
  { loanNumber: 'LN-2026-004', amount: '$3,000.00', purpose: 'Small business equipment', date: 'June 02, 2026', status: 'Pending', color: 'warning' },
  { loanNumber: 'LN-2026-001', amount: '$12,500.00', purpose: 'Home improvement', date: 'March 14, 2026', status: 'Approved', color: 'success' },
  { loanNumber: 'LN-2025-018', amount: '$2,200.00', purpose: 'Motorbike purchase', date: 'October 09, 2025', status: 'Approved', color: 'success' },
  { loanNumber: 'LN-2025-012', amount: '$5,000.00', purpose: 'Personal expenses', date: 'August 21, 2025', status: 'Rejected', color: 'danger' },
];

function MyLoanApplications() {
  return (
    <div className="customer-page">
      <div className="mb-4">
        <p className="eyebrow text-primary mb-2">Applications</p>
        <h2 className="mb-1">My Loan Applications</h2>
        <p className="text-muted mb-0">Static application history for the customer portal preview.</p>
      </div>

      <div className="card table-card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle customer-table">
              <thead>
                <tr>
                  <th>Loan Number</th>
                  <th>Amount</th>
                  <th>Purpose</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.loanNumber}>
                    <td className="fw-bold">{application.loanNumber}</td>
                    <td>{application.amount}</td>
                    <td>{application.purpose}</td>
                    <td>{application.date}</td>
                    <td>
                      <span className={`badge rounded-pill text-bg-${application.color}`}>{application.status}</span>
                    </td>
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

export default MyLoanApplications;
