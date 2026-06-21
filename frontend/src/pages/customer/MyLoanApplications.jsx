import { useEffect, useState } from "react";
import apiClient from "../../api/axiosConfig";

function MyLoanApplications() {
  const [loans, setLoans] = useState([]);

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

      setLoans(myLoans);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="customer-page">

      <h2 className="mb-4">
        My Loan Applications
      </h2>

      <div className="card">
        <div className="card-body">

          <table className="table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Term</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>${loan.amount}</td>
                  <td>{loan.termMonths}</td>
                  <td>{loan.status}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default MyLoanApplications;