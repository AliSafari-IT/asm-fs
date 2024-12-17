// src/pages/LogoutPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();
  const previousLocation = localStorage.getItem('returnTo');

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authStateChange'));

    // Get and clear the returnTo value before navigating
    const returnPath = previousLocation;
    localStorage.removeItem('returnTo');
    
    // Redirect to the previous page or home if no previous location
    navigate(returnPath || '/', { replace: true });
  }, [navigate, previousLocation]);

  return null; // or a loading spinner/message
};

export default LogoutPage;
