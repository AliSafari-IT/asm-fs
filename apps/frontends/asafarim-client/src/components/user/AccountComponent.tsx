// E:\asm\apps\dashboard-client\src\components\user\AccountComponent.tsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  PersonAccounts24Filled as IconLogin, 
  SignOut24Regular as IconLogout 
} from '@fluentui/react-icons';

interface AccountComponentProps {
  isMobile?: boolean; // Add a prop to differentiate between mobile and desktop
  className?: string;
}

const AccountComponent: React.FC<AccountComponentProps> = ({ isMobile = false, className }) => {
  const location = useLocation();
  const user = localStorage.getItem('user');
  const isActive = (path: string) => location.pathname === path;

  if (isMobile) {
    // Mobile view rendering
    return (
      <>
        {user ? (
          <a
            href="/logout"
            className={`block px-4 py-2   ${className}`}
          >
            <span>Logout</span>
            <IconLogout className="inline-block ml-2 -mb-2" />
          </a>
        ) : (
          <a
            href="/login"
            className={`block px-4 py-2   ${className}`}
          >
            <span>Login</span>
            <IconLogin className="inline-block ml-2 -mb-2" />
          </a>
        )}
      </>
    );
  }

  // Desktop view rendering
  return (
    <>
      {user ? (
        <a
          href="/logout"
          className={`hidden sm:inline-block px-3 py-2 rounded-md text-blue-300 no-underline hover:text-red-600 hover:underline ${className}`}
        >
          <IconLogout />
        </a>
      ) : (
        <a
          href="/login"
          className={`hidden sm:inline-block px-3 py-2 rounded-md text-blue-300 pr-2 bg-transparent ${isActive('/login')
            ? 'bg-blue-500 font-bold'
            : 'text-blue-300 hover:text-teal-600 hover:underline'
          } ${className}`}
        >
          <IconLogin />
        </a>
      )}
    </>
  );
};

export default AccountComponent;
