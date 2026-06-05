import { useState } from 'react';
import Layout from './components/Layout.jsx';
import CustomerForm from './pages/CustomerForm.jsx';
import Customers from './pages/Customers.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LoanForm from './pages/LoanForm.jsx';
import Loans from './pages/Loans.jsx';
import Login from './pages/Login.jsx';
import PaymentForm from './pages/PaymentForm.jsx';
import Payments from './pages/Payments.jsx';

const pages = {
  Dashboard: <Dashboard />,
  Customers: <Customers />,
  'Customer Form': <CustomerForm />,
  Loans: <Loans />,
  'Loan Form': <LoanForm />,
  Payments: <Payments />,
  'Payment Form': <PaymentForm />,
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage('Dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout activePage={activePage} onLogout={handleLogout} onNavigate={setActivePage}>
      {pages[activePage]}
    </Layout>
  );
}

export default App;
