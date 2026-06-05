const payments = [
  { id: 1, loan: 'LN-1001', amount: '$350', date: '2026-06-01', status: 'PAID' },
  { id: 2, loan: 'LN-1002', amount: '$225', date: '2026-06-05', status: 'UNPAID' },
  { id: 3, loan: 'LN-1003', amount: '$410', date: '2026-05-28', status: 'PAID' },
];

function Payments() {
  return (
    <div className="card table-card">
      <div className="card-body">
        <h4 className="mb-1">Payments</h4>
        <p className="text-muted">Sample payment records for UI planning.</p>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Loan</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.loan}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.date}</td>
                  <td><span className="badge text-bg-light border">{payment.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments;
