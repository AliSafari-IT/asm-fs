import React, { useEffect, useState } from 'react';
import AsmLogo from './components/AsmLogo';
import UserDropdown from '../../components/user/UserDropdown';
import { Link } from 'react-router-dom';
import MobileToggleTheme from '../../utils/ToggleTheme';
import ToggleTheme from '../Theme/ToggleTheme';
import { IAuthState } from '@/interfaces/IAuthState';

const Navbar: React.FC<{ children?: React.ReactNode, auth?: IAuthState }> = ({ children, auth }) => {
  // Get current view width
  const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
  const isMobile = viewWidth <= 514;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const themeToggler = isMobile ? <MobileToggleTheme /> : <ToggleTheme />;
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  React.useEffect(() => {
    // Update view width on window resize
    const handleResize = () => {
      setViewWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {children}
            <AsmLogo
              className="h-10 w-10"
              brandName="ASafariM" />
          </div>

          <div className="flex items-center space-x-4">
            {windowWidth > 400 && themeToggler}
            {auth && auth.user ? (
              <div className="flex items-center gap-4">
                <UserDropdown 
                  auth={auth} 
                  themeToggler={windowWidth <= 400 ? themeToggler : undefined} 
                />
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
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
