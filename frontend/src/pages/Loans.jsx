const loans = [
  { number: 'LN-1001', customer: 'Sophea Chan', amount: '$5,000', term: '24 months', status: 'APPROVED' },
  { number: 'LN-1002', customer: 'Dara Kim', amount: '$2,500', term: '12 months', status: 'PENDING' },
  { number: 'LN-1003', customer: 'Rina Sok', amount: '$7,800', term: '36 months', status: 'COMPLETED' },
];

function Loans() {
  return (
    <div className="card table-card">
      <div className="card-body">
        <h4 className="mb-1">Loans</h4>
        <p className="text-muted">Static loan list for the first frontend setup.</p>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Loan Number</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Term</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.number}>
                  <td>{loan.number}</td>
                  <td>{loan.customer}</td>
                  <td>{loan.amount}</td>
                  <td>{loan.term}</td>
                  <td><span className="badge text-bg-secondary">{loan.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Loans;
