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
      const userId = localStorage.getItem("userId");

      const { data } = await apiClient.get("/loans");

      const myLoans = data.filter(
        (loan) => loan.customerId === userId
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
      console.error(error);
    }
  };

  return (
    <div className="customer-page">

      <div className="welcome-card customer-welcome mb-4">
        <div className="row align-items-center">

          <div className="col-lg-8">
            <p className="eyebrow mb-2">
              Welcome back, {fullName}
            </p>

            <h1>Customer Loan Dashboard</h1>

            <p>
              View all your loan applications and
              track approval status.
            </p>
          </div>

          <div className="col-lg-4 text-lg-end">
            <button
              className="btn btn-light"
              onClick={() =>
                onNavigate("Apply for Loan")
              }
            >
              Apply for New Loan
            </button>
          </div>

        </div>
      </div>

      <div className="row g-3">

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h3>{stats.total}</h3>
              <p>Total Loans</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h3>{stats.approved}</h3>
              <p>Approved</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h3>{stats.rejected}</h3>
              <p>Rejected</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default CustomerDashboard;