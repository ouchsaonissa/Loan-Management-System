function LoanForm() {
  return (
    <div className="card form-card">
      <div className="card-body">
        <h4 className="mb-1">Loan Form</h4>
        <p className="text-muted">Preview form only. Approval and API logic will be added later.</p>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="loanNumber">Loan number</label>
            <input className="form-control" id="loanNumber" placeholder="LN-1004" />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="customerName">Customer</label>
            <input className="form-control" id="customerName" placeholder="Customer name" />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="amount">Amount</label>
            <input className="form-control" id="amount" placeholder="5000" type="number" />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="interestRate">Interest rate</label>
            <input className="form-control" id="interestRate" placeholder="5.5" type="number" />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="term">Term in months</label>
            <input className="form-control" id="term" placeholder="24" type="number" />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="button">Save preview</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoanForm;
