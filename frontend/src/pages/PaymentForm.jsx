function PaymentForm() {
  return (
    <div className="card form-card">
      <div className="card-body">
        <h4 className="mb-1">Payment Form</h4>
        <p className="text-muted">Preview form only. Payment API logic will be added later.</p>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="loanId">Loan number</label>
            <input className="form-control" id="loanId" placeholder="LN-1001" />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="paymentAmount">Amount</label>
            <input className="form-control" id="paymentAmount" placeholder="350" type="number" />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="paymentDate">Payment date</label>
            <input className="form-control" id="paymentDate" type="date" />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="paymentStatus">Status</label>
            <select className="form-select" id="paymentStatus" defaultValue="PAID">
              <option>PAID</option>
              <option>UNPAID</option>
              <option>LATE</option>
            </select>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="button">Save preview</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
