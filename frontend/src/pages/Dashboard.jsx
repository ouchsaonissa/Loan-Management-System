import { useEffect, useMemo, useState } from "react";
import apiClient from "../api/axiosConfig";

const getStatusBadgeClass = (status) => {
  if (status === "APPROVED") {
    return "badge bg-success";
  }

  if (status === "REJECTED") {
    return "badge bg-danger";
  }

  return "badge bg-warning text-dark";
};

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [customersResponse, loansResponse] = await Promise.all([
        apiClient.get("/customers"),
        apiClient.get("/loans"),
      ]);

      setCustomers(customersResponse.data);
      setLoans(loansResponse.data);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
      setError("Unable to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(
    () => [
      {
        label: "Total Customers",
        value: customers.length,
        color: "primary",
      },
      {
        label: "Total Loans",
        value: loans.length,
        color: "info",
      },
      {
        label: "Pending Loans",
        value: loans.filter((loan) => loan.status === "PENDING").length,
        color: "warning",
      },
      {
        label: "Approved Loans",
        value: loans.filter((loan) => loan.status === "APPROVED").length,
        color: "success",
      },
    ],
    [customers, loans]
  );

  return (
    <div>
      <div className="welcome-card mb-4">
        <div>
          <p className="eyebrow mb-2">Live admin overview</p>
          <h1>Loan Management Dashboard</h1>
          <p className="mb-0">
            Monitor registered customers and loan applications using real backend data.
          </p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row g-3 mb-4">
        {stats.map((stat) => (
          <div className="col-12 col-md-6 col-xl-3" key={stat.label}>
            <div className="card stat-card h-100">
              <div className="card-body">
                <span className={`badge text-bg-${stat.color} mb-3`}>
                  {stat.label}
                </span>
                <h3>{loading ? "..." : stat.value}</h3>
                <p className="text-muted mb-0">Live API metric</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card table-card">
        <div className="card-body">
          <h5 className="card-title mb-3">Recent Loan Applications</h5>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Amount</th>
                  <th>Term (Months)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4">Loading dashboard data...</td>
                  </tr>
                ) : loans.length === 0 ? (
                  <tr>
                    <td colSpan="4">No loan applications found.</td>
                  </tr>
                ) : (
                  loans.map((loan) => (
                    <tr key={loan.id}>
                      <td>{loan.customerId}</td>
                      <td>${loan.amount}</td>
                      <td>{loan.termMonths}</td>
                      <td>
                        <span className={getStatusBadgeClass(loan.status)}>
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
