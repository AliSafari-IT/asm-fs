import React from 'react';
import AsmLogo from './components/AsmLogo';
import UserDropdown from '../../components/user/UserDropdown';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import MobileToggleTheme from '../../components/theme/ToggleTheme';
import ToggleTheme from '../Theme/ToggleTheme';

const Navbar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const user = useAuth();
  // Get current view width
  const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
  const isMobile = viewWidth <= 514;
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
            {isMobile ? <MobileToggleTheme /> : <ToggleTheme className="mr-2" />}
            {user ? (
              <div className="flex items-center gap-4">
                <UserDropdown user={user} />
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
