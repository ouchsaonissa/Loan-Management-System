import { useState } from "react";
import apiClient from "../../api/axiosConfig.js";

const initialForm = {
  customerId: localStorage.getItem("userId") || "",
  amount: "",
  termMonths: "",
};

function ApplyLoan() {
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const payload = {
        customerId: localStorage.getItem("userId"),
        amount: Number(formData.amount),
        termMonths: Number(formData.termMonths),
      };

      const { data } = await apiClient.post("/loans", payload);

      setMessage(
        `Loan created successfully. Status: ${data.status}`
      );

      setFormData({
        customerId: localStorage.getItem("userId") || "",
        amount: "",
        termMonths: "",
      });

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Failed to create loan"
      );
    }
  };

  return (
    <div className="customer-page">
      <div className="row g-4">
        <div className="col-12 col-xl-4">
          <div className="card h-100 customer-application-note">
            <div className="card-body">
              <p className="eyebrow text-primary mb-2">
                New Request
              </p>

              <h2 className="mb-3">
                Apply for a Loan
              </h2>

              <p className="text-muted">
                Submit a loan request to the backend.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-8">
          <div className="card form-card">
            <div className="card-body">

              <form
                className="row g-3"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="form-label">
                    Customer ID
                  </label>

                  <input
                    className="form-control"
                    value={formData.customerId}
                    readOnly
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Loan Amount
                  </label>

                  <input
                    className="form-control"
                    type="number"
                    min="1"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Term (Months)
                  </label>

                  <select
                    className="form-select"
                    name="termMonths"
                    value={formData.termMonths}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Term
                    </option>

                    <option value="12">
                      12 Months
                    </option>

                    <option value="24">
                      24 Months
                    </option>

                    <option value="36">
                      36 Months
                    </option>

                    <option value="48">
                      48 Months
                    </option>
                  </select>
                </div>

                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    type="submit"
                  >
                    Submit Loan
                  </button>
                </div>
              </form>

              {message && (
                <div className="alert alert-info mt-4">
                  {message}
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