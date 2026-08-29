import { useEffect, useState } from "react";
import apiClient from "../../api/axiosConfig";

function MyLoanApplications() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      const customerId = localStorage.getItem("customerId");

      const { data } = await apiClient.get("/loans");

      const myLoans = data.filter(
        (loan) => loan.customerId === customerId
      );

      setLoans(myLoans);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="badge bg-success">
            🟢 APPROVED
          </span>
        );

      case "PENDING":
        return (
          <span className="badge bg-warning text-dark">
            🟡 PENDING
          </span>
        );

      case "REJECTED":
        return (
          <span className="badge bg-danger">
            🔴 REJECTED
          </span>
        );

      default:
        return (
          <span className="badge bg-secondary">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="customer-page">
      <h2 className="mb-4">
        My Loan Applications
      </h2>

      <div className="card shadow-sm">
        <div className="card-body">
          {loans.length === 0 ? (
            <div className="text-center py-4">
              <h5>No loan applications found</h5>
              <p className="text-muted mb-0">
                Apply for a loan to see your applications here.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Term (Months)</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.id}>
                      <td>
                        <strong>
                          ${Number(loan.amount).toLocaleString()}
                        </strong>
                      </td>

                      <td>{loan.termMonths}</td>

                      <td>
                        {getStatusBadge(loan.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyLoanApplications;
