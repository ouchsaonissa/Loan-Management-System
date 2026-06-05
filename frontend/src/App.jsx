import { useState } from 'react';
import Layout from './components/Layout.jsx';
import CustomerLayout from './components/customer/CustomerLayout.jsx';
import CustomerForm from './pages/CustomerForm.jsx';
import Customers from './pages/Customers.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LoanForm from './pages/LoanForm.jsx';
import Loans from './pages/Loans.jsx';
import Login from './pages/Login.jsx';
import PaymentForm from './pages/PaymentForm.jsx';
import Payments from './pages/Payments.jsx';
import Register from './pages/Register.jsx';
import ApplyLoan from './pages/customer/ApplyLoan.jsx';
import CustomerDashboard from './pages/customer/CustomerDashboard.jsx';
import MyLoanApplications from './pages/customer/MyLoanApplications.jsx';
import MyLoanStatus from './pages/customer/MyLoanStatus.jsx';
import MyPaymentHistory from './pages/customer/MyPaymentHistory.jsx';

const adminPages = {
  Dashboard: <Dashboard />,
  Customers: <Customers />,
  'Customer Form': <CustomerForm />,
  Loans: <Loans />,
  'Loan Form': <LoanForm />,
  Payments: <Payments />,
  'Payment Form': <PaymentForm />,
};

const customerPages = {
  'Customer Dashboard': CustomerDashboard,
  'My Loan Status': MyLoanStatus,
  'My Applications': MyLoanApplications,
  'Payment History': MyPaymentHistory,
  'Apply for Loan': ApplyLoan,
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');
  const [showRegister, setShowRegister] = useState(() => window.location.hash === '#register');

  const handleLogin = (event) => {
    event.preventDefault();
    setShowRegister(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage('Dashboard');
  };

  const showCustomerPortal = () => {
    setActivePage('Customer Dashboard');
  };

  const showAdminDashboard = () => {
    setActivePage('Dashboard');
  };

  const showRegisterPage = () => {
    window.location.hash = 'register';
    setShowRegister(true);
  };

  const showLoginPage = () => {
    window.location.hash = 'login';
    setShowRegister(false);
  };

  if (!isLoggedIn) {
    return showRegister ? (
      <Register onBackToLogin={showLoginPage} />
    ) : (
      <Login onLogin={handleLogin} onShowRegister={showRegisterPage} />
    );
  }

  const CustomerPage = customerPages[activePage];

  if (CustomerPage) {
    return (
      <CustomerLayout
        activePage={activePage}
        onBackToAdmin={showAdminDashboard}
        onLogout={handleLogout}
        onNavigate={setActivePage}
      >
        <CustomerPage onNavigate={setActivePage} />
      </CustomerLayout>
    );
  }

  return (
    <Layout
      activePage={activePage}
      onCustomerPortal={showCustomerPortal}
      onLogout={handleLogout}
      onNavigate={setActivePage}
    >
      {adminPages[activePage]}
    </Layout>
  );
}

export default App;
