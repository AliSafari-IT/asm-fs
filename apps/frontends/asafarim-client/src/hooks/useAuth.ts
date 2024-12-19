import { IAuthState } from "@/interfaces/IAuthState";
import { IUser } from "@/interfaces/IUser";
import { useEffect, useState, useCallback } from "react";

function useAuth(): IAuthState {
    const [user, setUser] = useState<IUser | null>(() => {
      const userData = localStorage.getItem('user');
      //Log userData to console, and Parse the user data from localStorage
      console.log('useAuth(): User data from localStorage:', userData ? JSON.parse(userData).user : null);
      return userData ? JSON.parse(userData).user : null;
    });
  
    const checkAuthState = useCallback(() => {
      const userData = localStorage.getItem('user');
      setUser(userData ? JSON.parse(userData).user : null);
    }, []);

    const logout = useCallback(() => {
      localStorage.removeItem('user');
      setUser(null);
      window.dispatchEvent(new Event('authStateChange'));
    }, []);
  
    useEffect(() => {
      // Initial check
      checkAuthState();

      // Listen for storage events (for cross-tab synchronization)
      window.addEventListener('storage', checkAuthState);
      
      // Create a custom event for auth state changes
      window.addEventListener('authStateChange', checkAuthState);
  
      return () => {
        window.removeEventListener('storage', checkAuthState);
        window.removeEventListener('authStateChange', checkAuthState);
      };
    }, [checkAuthState]);

    useEffect(() => {
      // Check if user is deleted
      if (user?.isDeleted) {
        localStorage.removeItem('user');
        setUser(null);
      }
    }, [user]);

    
  
    return { user, logout, checkAuthState };
  }
  

  export default useAuth;