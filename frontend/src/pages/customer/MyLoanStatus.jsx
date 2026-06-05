const loanStatuses = [
  {
    loanNumber: 'LN-2026-001',
    title: 'Home improvement loan',
    amount: '$12,500.00',
    remainingBalance: '$4,700.00',
    interestRate: '6.5%',
    termInMonths: 36,
    status: 'Approved',
    color: 'success',
  },
  {
    loanNumber: 'LN-2026-004',
    title: 'Small business equipment',
    amount: '$3,000.00',
    remainingBalance: '$3,000.00',
    interestRate: '7.2%',
    termInMonths: 18,
    status: 'Pending',
    color: 'warning',
  },
  {
    loanNumber: 'LN-2025-018',
    title: 'Motorbike loan',
    amount: '$2,200.00',
    remainingBalance: '$0.00',
    interestRate: '6.0%',
    termInMonths: 12,
    status: 'Completed',
    color: 'primary',
  },
  {
    loanNumber: 'LN-2025-012',
    title: 'Personal loan request',
    amount: '$5,000.00',
    remainingBalance: '$0.00',
    interestRate: 'N/A',
    termInMonths: 24,
    status: 'Rejected',
    color: 'danger',
  },
];

function MyLoanStatus() {
  return (
    <div className="customer-page">
      <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-4">
        <div>
          <p className="eyebrow text-primary mb-2">Loan status</p>
          <h2 className="mb-1">My Loan Status</h2>
          <p className="text-muted mb-0">Review every current and past loan with simple status badges.</p>
        </div>
      </div>

      <div className="row g-3">
        {loanStatuses.map((loan) => (
          <div className="col-12 col-xl-6" key={loan.loanNumber}>
            <div className="card h-100 loan-status-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <div>
                    <h5 className="mb-1">{loan.title}</h5>
                    <p className="text-muted mb-0">{loan.loanNumber}</p>
                  </div>
                  <span className={`badge rounded-pill text-bg-${loan.color}`}>{loan.status}</span>
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="customer-detail-box">
                      <span>Loan amount</span>
                      <strong>{loan.amount}</strong>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="customer-detail-box">
                      <span>Remaining balance</span>
                      <strong>{loan.remainingBalance}</strong>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="customer-detail-box">
                      <span>Interest rate</span>
                      <strong>{loan.interestRate}</strong>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="customer-detail-box">
                      <span>Term in months</span>
                      <strong>{loan.termInMonths}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLoanStatus;
