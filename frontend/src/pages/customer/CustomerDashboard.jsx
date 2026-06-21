import { useEffect, useState } from "react";
import apiClient from "../../api/axiosConfig";

function CustomerDashboard({ onNavigate }) {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const fullName =
    localStorage.getItem("fullName") || "Customer";

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      const customerId = localStorage.getItem("userId");

      const { data } = await apiClient.get("/loans");

      const myLoans = data.filter(
        (loan) => loan.customerId === customerId
      );

      setStats({
        total: myLoans.length,
        approved: myLoans.filter(
          (loan) => loan.status === "APPROVED"
        ).length,
        pending: myLoans.filter(
          (loan) => loan.status === "PENDING"
        ).length,
        rejected: myLoans.filter(
          (loan) => loan.status === "REJECTED"
        ).length,
      });
    } catch (error) {
      console.error("Failed to load loans", error);
    }
  };

  return (
    <div className="customer-page">
      <div className="welcome-card customer-welcome mb-4">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <p className="eyebrow mb-2">
              Welcome, {fullName}
            </p>

            <h1>Customer Loan Dashboard</h1>

            <p>
              View your loan applications and track
              approval status.
            </p>
          </div>

          <div className="col-lg-4 text-lg-end">
            <button
              className="btn btn-light"
              onClick={() =>
                onNavigate("Apply for Loan")
              }
            >
              Apply for Loan
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1>{stats.total}</h1>
              <p className="mb-0">
                Total Applications
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-start border-success border-4">
            <div className="card-body">
              <h1 className="text-success">
                {stats.approved}
              </h1>
              <p className="mb-0">
                🟢 Approved
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-start border-warning border-4">
            <div className="card-body">
              <h1 className="text-warning">
                {stats.pending}
              </h1>
              <p className="mb-0">
                🟡 Pending
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-start border-danger border-4">
            <div className="card-body">
              <h1 className="text-danger">
                {stats.rejected}
              </h1>
              <p className="mb-0">
                🔴 Rejected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;