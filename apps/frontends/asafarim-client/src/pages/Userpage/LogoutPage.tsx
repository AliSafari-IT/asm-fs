// src/pages/LogoutPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem('user');

    // Redirect to the login page
    navigate('/login');
  }, [navigate]);

  return null; // or a loading spinner/message
};

export default LogoutPage;
