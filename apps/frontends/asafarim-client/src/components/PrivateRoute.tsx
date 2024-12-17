import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

interface PrivateRouteProps {
  children: JSX.Element;
  requireAdmin?: boolean;
}

const PrivateRoute = ({ children, requireAdmin = false }: PrivateRouteProps) => {
  const auth = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    // If user is deleted, log them out and redirect to login
    if (auth?.user?.isDeleted) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('authStateChange'));
      navigate('/login');
    }
  }, [auth?.user?.isDeleted, navigate]);

  // If user is not authenticated, redirect to login
  if (!auth?.user) {

    return <Navigate to="/login" />;
  }

  // If user is deleted, don't render anything while the useEffect handles the logout
  if (auth.user.isDeleted) {
    return null;
  }

  // For admin-only routes, check if user is admin
  if (requireAdmin && !auth.user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
