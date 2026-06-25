import { useEffect, useState } from 'react';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
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

const adminRoutes = {
  '/admin/dashboard': { title: 'Dashboard', page: <Dashboard /> },
  '/admin/customers': { title: 'Customers', page: <Customers /> },
  '/admin/customer-form': { title: 'Customer Form', page: <CustomerForm /> },
  '/admin/loans': { title: 'Loans', page: <Loans /> },
  '/admin/loan-form': { title: 'Loan Form', page: <LoanForm /> },
  '/admin/payments': { title: 'Payments', page: <Payments /> },
  '/admin/payment-form': { title: 'Payment Form', page: <PaymentForm /> },
};

const customerRoutes = {
  '/customer/dashboard': {
    title: 'Customer Dashboard',
    page: CustomerDashboard,
  },

  '/customer/my-applications': {
    title: 'My Applications',
    page: MyLoanApplications,
  },

  '/customer/apply-loan': {
    title: 'Apply for Loan',
    page: ApplyLoan,
  },
};

const customerLabelPaths = Object.fromEntries(
  Object.entries(customerRoutes).map(([path, route]) => [route.title, path]),
);

function getCurrentUser() {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    username: localStorage.getItem('username'),
    fullName: localStorage.getItem('fullName'),
    role: localStorage.getItem('role')?.toUpperCase(),
    userId: localStorage.getItem('userId'),
  };
}

function isAdminRole(role) {
  return role === 'ADMIN';
}

function isCustomerRole(role) {
  return role === 'CUSTOMER';
}

function getDashboardPath(role) {
  if (isAdminRole(role)) {
    return '/admin/dashboard';
  }

  if (isCustomerRole(role)) {
    return '/customer/dashboard';
  }

  return '/login';
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/login');
  const [currentUser, setCurrentUser] = useState(getCurrentUser);

  const navigateTo = (path, replace = false) => {
    if (window.location.pathname !== path) {
      if (replace) {
        window.history.replaceState({}, '', path);
      } else {
        window.history.pushState({}, '', path);
      }
    }

    setCurrentPath(path);
  };

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname || '/login');
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const { accessToken, role } = currentUser;
    const isLoggedIn = Boolean(accessToken && role);

    if (!isLoggedIn) {
      if (currentPath !== '/login' && currentPath !== '/register') {
        navigateTo('/login', true);
      }
      return;
    }

    if (currentPath === '/' || currentPath === '/login' || currentPath === '/register') {
      navigateTo(getDashboardPath(role), true);
      return;
    }

    if (currentPath.startsWith('/admin') && !isAdminRole(role)) {
      navigateTo('/login', true);
      return;
    }

    if (currentPath.startsWith('/customer') && !isCustomerRole(role)) {
      navigateTo('/login', true);
      return;
    }

    if (!adminRoutes[currentPath] && !customerRoutes[currentPath]) {
      navigateTo(getDashboardPath(role), true);
    }
  }, [currentPath, currentUser]);

  const handleLogin = (loginData) => {
    const userData = {
      accessToken: loginData.accessToken,
      refreshToken: loginData.refreshToken,
      username: loginData.username,
      fullName: loginData.fullName,
      role: loginData.role?.toUpperCase(),
      userId: loginData.userId,
    };

    setCurrentUser(userData);
    navigateTo(getDashboardPath(userData.role), true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(getCurrentUser());
    navigateTo('/login', true);
  };

  const handleCustomerNavigate = (pageLabelOrPath) => {
    navigateTo(customerLabelPaths[pageLabelOrPath] || pageLabelOrPath);
  };

  if (currentPath === '/register' && !currentUser.accessToken) {
    return (
      <Register
       onBackToLogin={() => navigateTo('/login')}
       onRegisterSuccess={() => navigateTo('/login')}
/>
    );
  }

  if (!currentUser.accessToken || currentPath === '/login') {
    return <Login onLogin={handleLogin} onShowRegister={() => navigateTo('/register')} />;
  }

  const customerRoute = customerRoutes[currentPath];

  if (customerRoute) {
    const CustomerPage = customerRoute.page;

    return (
      <ProtectedRoute requiredRole="CUSTOMER" redirectToLogin={() => navigateTo('/login', true)}>
        <CustomerLayout
          activePage={customerRoute.title}
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigate={handleCustomerNavigate}
        >
          <CustomerPage onNavigate={handleCustomerNavigate} />
        </CustomerLayout>
      </ProtectedRoute>
    );
  }

  const adminRoute = adminRoutes[currentPath] || adminRoutes['/admin/dashboard'];

  return (
    <ProtectedRoute requiredRole="ADMIN" redirectToLogin={() => navigateTo('/login', true)}>
      <Layout
        activePage={adminRoute.title}
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={navigateTo}
      >
        {adminRoute.page}
      </Layout>
    </ProtectedRoute>
  );
}

export default App;
