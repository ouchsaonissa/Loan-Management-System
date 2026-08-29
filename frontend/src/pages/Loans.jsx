import { useEffect, useState } from "react";
import apiClient, { getApiErrorMessage } from "../api/axiosConfig";

function Loans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [actionLoanId, setActionLoanId] = useState("");
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      setLoading(true);

      const [loansResponse, customersResponse] = await Promise.all([
        apiClient.get("/loans"),
        apiClient.get("/customers"),
      ]);

      const customerById = new Map(
        (Array.isArray(customersResponse.data) ? customersResponse.data : []).map((customer) => [
          customer.id,
          customer,
        ])
      );

      const loansWithCustomerNames = (Array.isArray(loansResponse.data) ? loansResponse.data : []).map((loan) => {
        const customer = customerById.get(loan.customerId);

        return {
          ...loan,
          customer,
          customerName: customer?.fullName || "Unknown Customer",
        };
      });

      setLoans(loansWithCustomerNames);
    } catch (error) {
      console.error("Failed to load loans", error);
      setLoans([]);
    } finally {
      setLoading(false);
    }
  };

  const updateLoanStatus = async (loan, action) => {
    const actionLabel = action === "approve" ? "approve" : "reject";

    if (!window.confirm(`Are you sure you want to ${actionLabel} this loan?`)) {
      return;
    }

    try {
      setActionLoanId(loan.id);
      setFeedback(null);

      await apiClient.put(`/loans/${loan.id}/${action}`);
      setFeedback({
        type: "success",
        message: `Loan ${action === "approve" ? "approved" : "rejected"} successfully.`,
      });
      await loadLoans();
    } catch (error) {
      console.error(error);
      setFeedback({
        type: "danger",
        message: getApiErrorMessage(error, `Failed to ${actionLabel} loan.`),
      });
    } finally {
      setActionLoanId("");
    }
  };

  const formatDate = (value) => (value ? new Date(value).toLocaleString() : "-");

  const getStatusBadgeClass = (status) => {
    if (status === "APPROVED") return "text-bg-success";
    if (status === "REJECTED") return "text-bg-danger";
    if (status === "COMPLETED") return "text-bg-secondary";
    return "text-bg-warning";
  };

  return (
    <div className="card table-card">
      <div className="card-body">

        <h4 className="mb-1">Loan Management</h4>

        <p className="text-muted">
          Review and approve customer loan requests.
        </p>

        {feedback && (
          <div className={`alert alert-${feedback.type}`} role="alert">
            {feedback.message}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-hover align-middle">

            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Amount</th>
                <th>Term</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="5">
                    Loading...
                  </td>
                </tr>
              ) : loans.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    No loans found
                  </td>
                </tr>
              ) : (
                loans.map((loan) => (
                  <tr key={loan.id}>

                    <td>{loan.customerName}</td>

                    <td>
                      ${loan.amount}
                    </td>

                    <td>
                      {loan.termMonths} months
                    </td>

                    <td>
                      <span
                        className={`badge ${getStatusBadgeClass(loan.status)}`}
                      >
                        {loan.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => setSelectedLoan(loan)}
                      >
                        View
                      </button>

                      {loan.status === "PENDING" && (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            disabled={actionLoanId === loan.id}
                            onClick={() => updateLoanStatus(loan, "approve")}
                          >
                            {actionLoanId === loan.id ? "Saving..." : "Approve"}
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            disabled={actionLoanId === loan.id}
                            onClick={() => updateLoanStatus(loan, "reject")}
                          >
                            {actionLoanId === loan.id ? "Saving..." : "Reject"}
                          </button>
                        </>
                      )}
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>

      </div>

      {selectedLoan && (
        <>
          <div className="modal d-block" role="dialog" aria-modal="true" aria-labelledby="loan-details-title">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="loan-details-title">Loan Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedLoan(null)}
                  />
                </div>
                <div className="modal-body">
                  <dl className="row mb-0">
                    <dt className="col-sm-5">Customer Name</dt>
                    <dd className="col-sm-7">{selectedLoan.customerName}</dd>
                    <dt className="col-sm-5">Customer ID</dt>
                    <dd className="col-sm-7 text-break">{selectedLoan.customerId}</dd>
                    <dt className="col-sm-5">Email</dt>
                    <dd className="col-sm-7">{selectedLoan.customer?.email || "-"}</dd>
                    <dt className="col-sm-5">Phone Number</dt>
                    <dd className="col-sm-7">{selectedLoan.customer?.phoneNumber || "-"}</dd>
                    <dt className="col-sm-5">Amount</dt>
                    <dd className="col-sm-7">${selectedLoan.amount}</dd>
                    <dt className="col-sm-5">Term</dt>
                    <dd className="col-sm-7">{selectedLoan.termMonths} months</dd>
                    <dt className="col-sm-5">Status</dt>
                    <dd className="col-sm-7">
                      <span className={`badge ${getStatusBadgeClass(selectedLoan.status)}`}>
                        {selectedLoan.status}
                      </span>
                    </dd>
                    <dt className="col-sm-5">Created Date</dt>
                    <dd className="col-sm-7">{formatDate(selectedLoan.createdAt)}</dd>
                  </dl>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedLoan(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" />
        </>
      )}
    </div>
  );
}

export default Loans;
