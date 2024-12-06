// src/components/user/AccountComponent.tsx

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  PersonAccounts24Filled as IconLogin, 
  SignOut24Regular as IconLogout 
} from '@fluentui/react-icons';

interface AccountComponentProps {
  isMobile?: boolean; // Prop to differentiate between mobile and desktop
  className?: string;
}

const AccountComponent: React.FC<AccountComponentProps> = ({ isMobile = false, className = "" }) => {
  const location = useLocation();
  const user = localStorage.getItem('user');
  const isActive = (path: string) => location.pathname === path;

  if (isMobile) {
    // Mobile view rendering
    return (
      <>
        {user ? (
          <Link
            to="/logout"
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md ${className}`}
            aria-label="Logout"
          >
            <IconLogout className="w-5 h-5 mr-2" />
            <span>Logout</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md ${className}`}
            aria-label="Login"
          >
            <IconLogin className="w-5 h-5 mr-2" />
            <span>Login</span>
          </Link>
        )}
      </>
    );
  }

  // Desktop view rendering
  return (
    <>
      {user ? (
        <Link
          to="/logout"
          className={`flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors duration-200 ${isActive('/logout') ? 'bg-gray-200 font-semibold' : ''} ${className}`}
          aria-label="Logout"
        >
          <IconLogout className="w-5 h-5 mr-1" />
          <span>Logout</span>
        </Link>
      ) : (
        <Link
          to="/login"
          className={`flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-200 ${isActive('/login') ? 'bg-gray-200 font-semibold' : ''} ${className}`}
          aria-label="Login"
        >
          <IconLogin className="w-5 h-5 mr-1" />
          <span>Login</span>
        </Link>
      )}
    </>
  );
};

export default AccountComponent;
