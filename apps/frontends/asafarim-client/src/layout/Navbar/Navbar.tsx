import React, { useState, useMemo, useEffect } from 'react';
import UserDropdown from '../../components/user/UserDropdown';
import { Link } from 'react-router-dom';
import { IAuthState } from '@/interfaces/IAuthState';
import Brand from './components/Brand';
import ThemeToggler from '@/layout/Theme/ToggleTheme';
import { useTheme } from '@/contexts/ThemeContext';
import useNavItems from '@/hooks/useNavItems';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import ResponsiveDropdownMenu from './components/ResponsiveDropdownMenu';
import ChangeLogsDropdown from './ChangeLogsDropdown';

const Navbar: React.FC<{ children?: React.ReactNode, auth?: IAuthState }> = ({ children, auth }) => {
  const [viewWidth, setViewWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const themeContext = useTheme();
  const navItems = useNavItems();

  const togglerProps = useMemo(() => ({
    themeContext,
    size: '1x' as SizeProp,
    title: 'Toggle Theme',
    className: 'text-[var(--text-primary)] transition-all duration-200 ease-in-out ml-2', 
    mobileView: isMenuOpen,
    viewWidth,
  }), [isMenuOpen, themeContext, viewWidth]);

  useEffect(() => {
    const handleResize = () => {
      setViewWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="flex items-center justify-between w-full lg:w-auto">
        <Brand
          logoPath={import.meta.env.VITE_PUBLIC_URL + 'logoT.svg'}
          to="/"
          className="brand-asafarim"
          brandName="ASafariM"
        />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--hover-bg)] focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row w-full lg:w-auto lg:items-center lg:justify-between lg:flex-grow transition-all duration-300 ease-in-out`}>
        <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 py-2 lg:py-0">
          {navItems
            .filter(item => item?.isForNavbar)
            .map((item, index) => (
              <ResponsiveDropdownMenu
                key={index}
                topbarNavData={[item]}
                className="block"
              />
            ))}
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 py-2 lg:py-0">
          {auth?.user ? (
            <UserDropdown
              auth={auth}
              mobileView={isMenuOpen}
              themeToggler={viewWidth < 401 && (<ThemeToggler {...togglerProps} />)}
            />
          ) : (
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
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
            </div>
          )}
          {viewWidth > 400 && (
            <ThemeToggler {...togglerProps} />
          )}
          <ChangeLogsDropdown mobileView={isMenuOpen} />
        </div>
      </div>
      {children}
    </nav>
  );
};

export default Navbar;
