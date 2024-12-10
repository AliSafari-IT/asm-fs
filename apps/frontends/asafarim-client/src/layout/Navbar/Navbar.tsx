import React from 'react';
import AsmLogo from './components/AsmLogo';
import UserDropdown from '../../components/user/UserDropdown';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ToggleTheme from '../Theme/ToggleTheme';

const Navbar: React.FC = () => {
  const user = useAuth();

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <AsmLogo
              className="h-10 w-10 mr-3"
              brandName="ASafariM" />
          </div>

          <div className="flex items-center space-x-4">
            <ToggleTheme className="mr-2" />
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <UserDropdown />
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Login
                </Link>
                <Link to="/register" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
