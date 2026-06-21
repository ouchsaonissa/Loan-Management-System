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

      setCustomers(Array.isArray(customersResponse.data) ? customersResponse.data : []);
      setLoans(Array.isArray(loansResponse.data) ? loansResponse.data : []);
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
        label: "Customers",
        value: customers.length,
        color: "primary",
      },
      {
        label: "Active Loans",
        value: loans.filter((loan) => loan.status === "APPROVED").length,
        color: "success",
      },
      {
        label: "Pending Reviews",
        value: loans.filter((loan) => loan.status === "PENDING").length,
        color: "warning",
      },
      {
        label: "Rejected Loans",
        value: loans.filter((loan) => loan.status === "REJECTED").length,
        color: "danger",
      },
    ],
    [customers, loans]
  );

  const recentLoans = useMemo(
    () =>
      [...loans]
        .sort((firstLoan, secondLoan) => new Date(secondLoan.createdAt) - new Date(firstLoan.createdAt))
        .slice(0, 5),
    [loans]
  );

  const hasDashboardData = customers.length > 0 || loans.length > 0;

  const formatCurrency = (value) => {
    const amount = Number(value ?? 0);

    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const formatDate = (value) => {
    if (!value) {
      return "-";
    }

    return new Date(value).toLocaleString();
  };

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
                  <th>Term</th>
                  <th>Status</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5">Loading dashboard data...</td>
                  </tr>
                ) : !hasDashboardData ? (
                  <tr>
                    <td colSpan="5">No dashboard data available</td>
                  </tr>
                ) : recentLoans.length === 0 ? (
                  <tr>
                    <td colSpan="5">No recent loan activity</td>
                  </tr>
                ) : (
                  recentLoans.map((loan) => (
                    <tr key={loan.id}>
                      <td>{loan.customerId}</td>
                      <td>{formatCurrency(loan.amount)}</td>
                      <td>{loan.termMonths} months</td>
                      <td>
                        <span className={getStatusBadgeClass(loan.status)}>
                          {loan.status}
                        </span>
                      </td>
                      <td>{formatDate(loan.createdAt)}</td>
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
