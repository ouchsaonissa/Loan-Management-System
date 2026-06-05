import { useState } from 'react';

const initialForm = {
  amount: '',
  purpose: '',
  termInMonths: '',
  monthlyIncome: '',
  phoneNumber: '',
  address: '',
};

function ApplyLoan() {
  const [formData, setFormData] = useState(initialForm);
  const [previewMessage, setPreviewMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = `Preview only: ${formData.purpose || 'Loan'} application for $${formData.amount || '0'} over ${formData.termInMonths || '0'} months is ready for future API submission.`;
    setPreviewMessage(message);
    window.alert(message);
  };

  return (
    <div className="customer-page">
      <div className="row g-4">
        <div className="col-12 col-xl-4">
          <div className="card h-100 customer-application-note">
            <div className="card-body">
              <p className="eyebrow text-primary mb-2">New request</p>
              <h2 className="mb-3">Apply for a Loan</h2>
              <p className="text-muted">
                Complete the sample form to preview a customer application. This page does not connect to the backend yet.
              </p>
              <div className="customer-tip-box">
                <strong>Tip:</strong> Use clear loan purpose and accurate income details to help staff review later.
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-8">
          <div className="card form-card">
            <div className="card-body">
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="amount">Loan amount</label>
                  <input
                    className="form-control"
                    id="amount"
                    min="1"
                    name="amount"
                    onChange={handleChange}
                    placeholder="12000"
                    type="number"
                    value={formData.amount}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="purpose">Loan purpose</label>
                  <input
                    className="form-control"
                    id="purpose"
                    name="purpose"
                    onChange={handleChange}
                    placeholder="Home improvement"
                    type="text"
                    value={formData.purpose}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="termInMonths">Term in months</label>
                  <select
                    className="form-select"
                    id="termInMonths"
                    name="termInMonths"
                    onChange={handleChange}
                    value={formData.termInMonths}
                  >
                    <option value="">Choose term</option>
                    <option value="12">12 months</option>
                    <option value="18">18 months</option>
                    <option value="24">24 months</option>
                    <option value="36">36 months</option>
                    <option value="48">48 months</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="monthlyIncome">Monthly income</label>
                  <input
                    className="form-control"
                    id="monthlyIncome"
                    min="1"
                    name="monthlyIncome"
                    onChange={handleChange}
                    placeholder="850"
                    type="number"
                    value={formData.monthlyIncome}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="phoneNumber">Phone number</label>
                  <input
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={handleChange}
                    placeholder="+855 12 345 678"
                    type="tel"
                    value={formData.phoneNumber}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="address">Address</label>
                  <input
                    className="form-control"
                    id="address"
                    name="address"
                    onChange={handleChange}
                    placeholder="Phnom Penh, Cambodia"
                    type="text"
                    value={formData.address}
                  />
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">Submit application</button>
                </div>
              </form>

              {previewMessage && (
                <div className="alert alert-info mt-4 mb-0" role="alert">
                  {previewMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyLoan;
