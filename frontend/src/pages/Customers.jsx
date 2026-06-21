import { useEffect, useState } from "react";
import apiClient, { getApiErrorMessage } from "../api/axiosConfig";

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

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await apiClient.get("/customers");
      console.log("Customers API response", data);
      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load customers", error);
      setError(getApiErrorMessage(error, "Unable to load customers. Please try again later."));
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card table-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-1">Customers</h4>
            <p className="text-muted mb-0">Live customer records from the backend API.</p>
          </div>
          <span className="badge text-bg-primary">Live API</span>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Job</th>
                <th>Monthly Income</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9">Loading customers...</td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan="9">No customers found</td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.fullName}</td>
                    <td>{customer.gender}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.address}</td>
                    <td>{customer.job}</td>
                    <td>{formatCurrency(customer.monthlyIncome)}</td>
                    <td>{formatDate(customer.createdAt)}</td>
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

export default Customers;
