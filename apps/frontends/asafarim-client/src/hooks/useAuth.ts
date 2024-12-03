import { useEffect, useState } from "react";

function useAuth() {
    const [user, setUser] = useState(() => {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData).user : null;
    });
  
    useEffect(() => {
      const handleStorageChange = () => {
        const userData = localStorage.getItem('user');
        setUser(userData ? JSON.parse(userData).user : null);
      };
  
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
  
    return user;
  }
  
  export default useAuth;