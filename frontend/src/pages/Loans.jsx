import { useEffect, useState } from "react";
import apiClient from "../api/axiosConfig";

function Loans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

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

      const customerNameById = new Map(
        (Array.isArray(customersResponse.data) ? customersResponse.data : []).map((customer) => [
          customer.id,
          customer.fullName,
        ])
      );

      const loansWithCustomerNames = (Array.isArray(loansResponse.data) ? loansResponse.data : []).map((loan) => ({
        ...loan,
        customerName: customerNameById.get(loan.customerId) || "Unknown Customer",
      }));

      setLoans(loansWithCustomerNames);
    } catch (error) {
      console.error("Failed to load loans", error);
      setLoans([]);
    } finally {
      setLoading(false);
    }
  };

  const approveLoan = async (id) => {
    try {
      await apiClient.put(`/loans/${id}/approve`);
      loadLoans();
    } catch (error) {
      console.error(error);
      alert("Failed to approve loan");
    }
  };

  const rejectLoan = async (id) => {
    try {
      await apiClient.put(`/loans/${id}/reject`);
      loadLoans();
    } catch (error) {
      console.error(error);
      alert("Failed to reject loan");
    }
  };

  return (
    <div className="card table-card">
      <div className="card-body">

        <h4 className="mb-1">Loan Management</h4>

        <p className="text-muted">
          Review and approve customer loan requests.
        </p>

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
                        className={`badge ${
                          loan.status === "APPROVED"
                            ? "text-bg-success"
                            : loan.status === "REJECTED"
                            ? "text-bg-danger"
                            : "text-bg-warning"
                        }`}
                      >
                        {loan.status}
                      </span>
                    </td>

                    <td>
                      {loan.status === "PENDING" && (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() =>
                              approveLoan(loan.id)
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              rejectLoan(loan.id)
                            }
                          >
                            Reject
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
    </div>
  );
}

export default Loans;