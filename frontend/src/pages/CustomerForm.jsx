function CustomerForm() {
  return (
    <div className="card form-card">
      <div className="card-body">
        <h4 className="mb-1">Customer Form</h4>
        <p className="text-muted">Preview form only. Backend save logic will be added later.</p>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="firstName">First name</label>
            <input className="form-control" id="firstName" placeholder="Sophea" />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="lastName">Last name</label>
            <input className="form-control" id="lastName" placeholder="Chan" />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="email">Email</label>
            <input className="form-control" id="email" placeholder="customer@example.com" type="email" />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="phone">Phone number</label>
            <input className="form-control" id="phone" placeholder="012 345 678" />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="address">Address</label>
            <textarea className="form-control" id="address" placeholder="Customer address" rows="3" />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="button">Save preview</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerForm;
