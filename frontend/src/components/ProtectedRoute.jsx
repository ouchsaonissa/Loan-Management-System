import { useEffect } from 'react';

function ProtectedRoute({ requiredRole, children, redirectToLogin }) {
  const accessToken = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role')?.toUpperCase();
  const normalizedRequiredRole = requiredRole?.toUpperCase();
  const isAllowed = Boolean(accessToken && role === normalizedRequiredRole);

  useEffect(() => {
    if (!isAllowed) {
      redirectToLogin();
    }
  }, [isAllowed, redirectToLogin]);

  if (!isAllowed) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
