import { useEffect, useState } from 'react';
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
import './navbar.scss';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const ls = localStorage.getItem('user');
  const user = ls ? JSON.parse(ls).user : null;
  const userEmail = user ? user.email : null;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="nav-container">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <a href="/" className="flex items-center no-underline">
          <img src={logo} alt="logo" className="inline h-8 w-8 mr-1" />
          <span className="brand font-semibold text-xl">ASafariM</span>
        </a>
        <a href="//techdocs.asafarim.com" className="nav-links">Tech Docs</a>
        <a href="/projects" className="nav-links">Projects</a>
        <a href="/about" className="nav-links">About</a>
        {ls && <a href="/dashboard" className="nav-links">Dashboard</a>}
      </div>

      {/* Right side */}
      <div className="hidden sm:flex items-center space-x-4">
        <a href="//techdocs.asafarim.com/Contact" className="nav-links">Contact</a>
        {ls && (
          <div>
            <a href="/user-account-settings" className="nav-links"><IconSettings className="inline-block ml-2 -mb-2" /></a>
            <a href={`/user-profile?email=${encodeURIComponent(userEmail)}`} className="nav-links">User Profile</a>
          </div>
        )}
        <AccountComponent className="-mb-2" />
        <ToggleTheme className="pr-2" />
      </div>

      {/* Hamburger Icon */}
      <div className="menu-toggle sm:hidden pr-5">
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} // X icon when menu is open, hamburger when closed
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden menu-open">
          <ToggleTheme className="mb-3 absolute left-3 top-5" />
          <a href="//techdocs.asafarim.com" className="mobileNavLinkClass">Tech Docs <IconTeaching className="inline-block ml-2 -mb-2" /></a>
          <a href="/projects" className="mobileNavLinkClass">Projects <IconProject className="inline-block ml-2 -mb-2" /></a>
          <a href="/about" className="mobileNavLinkClass">About <IconAbout className="inline-block ml-2 -mb-2" /></a>
          <a href="/contact" className="mobileNavLinkClass">Contact <IconContact className="inline-block ml-2 -mb-2" /></a>
          {ls && <a href="/dashboard" className="mobileNavLinkClass">Dashboard <IconDashboard className="inline-block ml-2 -mb-2" /></a>}
          <AccountComponent isMobile={true} className="mobileNavLinkClass" />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
