// E:\asm\apps\dashboard-client\src\layout\Navbar\Navbar.tsx

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from './logoT.svg';
import {
  PersonCircle24Regular as IconAbout,
  PhoneVibrate24Regular as IconContact,
  Teaching24Regular as IconTeaching,
  Board24Regular as IconDashboard,
  ProjectionScreenText24Regular as IconProject,
  Settings24Regular as IconSettings
} from '@fluentui/react-icons';
import ToggleTheme from '../../components/theme/ToggleTheme';
import AccountComponent from '../../components/user/AccountComponent';
import './Navbar.scss';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const user = localStorage.getItem('user');
  const userJsonEmail = user ? JSON.parse(user).user.email : null;
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    console.log(window.innerWidth + 'x' + window.innerHeight);
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });


  const navLinkClass = (path: string) =>
    `hidden sm:inline-block px-3 py-2 rounded-md ${isActive(path)
      ? 'font-bold'
      : 'hover:underline'
    }`;

  const mobileNavLinkClass = (path: string) =>
    `block  px-3 py-1 text-sm rounded-md ${isActive(path)
      ? 'buttonActive font-bold'
      : ''
    }`;

  return (
    <nav className={`navbar `}>
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <a
          href="/"
          className="flex items-center text-blue-300 no-underline hover:text-teal-600 hover:underline"
        >
          <div className="navbar__logo">
            <img src={logo} alt="Brand Logo" className="inline h-8 w-8 mr-2" />
          </div>

          <span className="font-semibold text-xl">ASafariM</span>
        </a>
        <a href="//techdocs.asafarim.com" className={navLinkClass('/techdocs')}>
          Tech Docs
        </a>
        <a href="/projects" className={navLinkClass('/projects')}>
          Projects
        </a>
        <a href="/about" className={navLinkClass('/about')}>
          About
        </a>
        {user && (
          <a href="/dashboard" className={navLinkClass('/dashboard')}>
            Dashboard
          </a>
        )}
      </div>

      {/* Right side */}
      <div className="hidden sm:flex items-center space-x-4">
        <a href="//techdocs.asafarim.com/Contact" className={navLinkClass('/contact')}>
          Contact
        </a>

        {user && (
          <div>
            <a href="/user-account-settings" className={navLinkClass('/user-account-settings')}>
              <IconSettings className="inline-block ml-2 -mb-2" />
            </a>
            <a
              href={`/user-profile?email=${encodeURIComponent(userJsonEmail)}`}
              className={navLinkClass('/user-profile')}
            >
              User Profile
            </a>
          </div>

        )}
        <AccountComponent className="-mb-2" />
        <ToggleTheme className="pr-2" />
      </div>

      {/* Hamburger Icon */}
      <div className="sm:hidden pr-5">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          <svg
            className="w-6 h-6 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                menuOpen
                  ? 'M6 18L18 6M6 6l12 12' // X icon when menu is open
                  : 'M4 6h16M4 12h16M4 18h16' // Hamburger icon when menu is closed
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden">
          <ToggleTheme className="mb-3 absolute left-3 top-5  " />
          <a href="//techdocs.asafarim.com" className={`${mobileNavLinkClass('/techdocs')} block right-3 top-10`}>
            <span>Tech Docs</span>
            <IconTeaching className="inline-block ml-2 -mb-2" />
          </a>
          <a href="/projects" className={mobileNavLinkClass('/projects')}>
            <span> Projects</span>
            <IconProject className="inline-block ml-2 -mb-2" />
          </a>
          <a href="/about" className={mobileNavLinkClass('/about')}>
            <span>About</span>
            <IconAbout className="inline-block ml-2 -mb-2" />
          </a>
          <a href="/contact" className={mobileNavLinkClass('/contact')}>
            <span>Contact</span>
            <IconContact className="inline-block ml-2 -mb-2" />
          </a>

          {user && (
            <a href="/dashboard" className={mobileNavLinkClass('/dashboard')}>
              <span>Dashboard</span>
              <IconDashboard className="inline-block ml-2 -mb-2" />
            </a>
          )}

          {/* Use the AccountComponent for mobile */}
          <AccountComponent isMobile={true} className={mobileNavLinkClass(user ? '/login' : '/logout')} />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
