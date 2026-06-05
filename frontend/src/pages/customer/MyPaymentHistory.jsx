const payments = [
  { paymentDate: 'May 20, 2026', loanNumber: 'LN-2026-001', amount: '$350.00', status: 'Paid', color: 'success' },
  { paymentDate: 'April 20, 2026', loanNumber: 'LN-2026-001', amount: '$350.00', status: 'Paid', color: 'success' },
  { paymentDate: 'March 20, 2026', loanNumber: 'LN-2026-001', amount: '$350.00', status: 'Paid', color: 'success' },
  { paymentDate: 'February 20, 2026', loanNumber: 'LN-2026-001', amount: '$350.00', status: 'Late', color: 'danger' },
];

function MyPaymentHistory() {
  return (
    <div className="customer-page">
      <div className="row g-3 mb-4">
        <div className="col-12 col-xl-8">
          <div>
            <p className="eyebrow text-primary mb-2">Payments</p>
            <h2 className="mb-1">My Payment History</h2>
            <p className="text-muted mb-0">Review recent payments and your next scheduled due date.</p>
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="card next-payment-card h-100">
            <div className="card-body">
              <p className="eyebrow text-primary mb-2">Next payment due</p>
              <h4 className="mb-1">$350.00</h4>
              <p className="text-muted mb-0">June 20, 2026 • LN-2026-001</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card table-card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle customer-table">
              <thead>
                <tr>
                  <th>Payment Date</th>
                  <th>Loan Number</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={`${payment.paymentDate}-${payment.loanNumber}`}>
                    <td>{payment.paymentDate}</td>
                    <td className="fw-bold">{payment.loanNumber}</td>
                    <td>{payment.amount}</td>
                    <td>
                      <span className={`badge rounded-pill text-bg-${payment.color}`}>{payment.status}</span>
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

export default MyPaymentHistory;
