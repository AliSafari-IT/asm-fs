import React, { useState, useMemo, useEffect } from 'react';
import UserDropdown from '../../components/user/UserDropdown';
import { Link } from 'react-router-dom';
import { IAuthState } from '@/interfaces/IAuthState';
import NavItemComponent from './NavItemComponent';
import Brand from './components/Brand';
import ThemeToggler from '@/layout/Theme/ToggleTheme';
import { useTheme } from '@/contexts/ThemeContext';
import useNavItems from '@/hooks/useNavItems';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

const Navbar: React.FC<{ children?: React.ReactNode, auth?: IAuthState }> = ({ children, auth }) => {
  const [viewWidth, setViewWidth] = useState(window.innerWidth);
  const themeContext = useTheme();
  const navItems = useNavItems();  // Move hook call to component level

  const togglerProps = useMemo(() => ({
    themeContext,
    size: '1x' as SizeProp,
    title: 'Toggle Theme',
    viewWidth,
  }), [themeContext, viewWidth]);

  useEffect(() => {
    const handleResize = () => setViewWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar font-josefin sticky top-0 z-50 h-16">
      <div className="topbar-container flex items-center md:space-x-4 justify-stretch">
        <div className="left-container ml-4">
          <Brand
            className="brand-asafarim"
            brandName="ASafariM"
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <div className="navbar-tree-container">
            {navItems.map((item, index) => (
              item?.isForNavbar &&
              <NavItemComponent
                key={index}
                topbarNavData={[item]}
                className="inline-block"
              />
            ))}
          </div>
        </div>

        <div className="right-container ml-4">
          {auth && auth.user ? (
            <div className="ml-4">
              <UserDropdown
                auth={auth}
                themeToggler={viewWidth < 401 && (<ThemeToggler {...togglerProps} />)}
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
          {viewWidth > 400 && (
            <ThemeToggler {...togglerProps} />
          )}
        </div>
      </div>
      {children}
    </nav>
  );
};

export default Navbar;
