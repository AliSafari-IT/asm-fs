import { Disclosure, } from '@headlessui/react';

import React, { useState } from 'react';
import { navItems } from './navItems'; // Import the navItems list
import { Link } from 'react-router-dom';
import logo from './logoT.svg';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  const handleDropdownToggle = (parentId: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));
  };

  const renderNavItems = (aligned: 'left' | 'right') => {
    return navItems
      .filter((item) => item.aligned === aligned)
      .map((item) => {
        const childItems = navItems.filter((child) => child.parentId === item.id);
        const hasChildren = childItems.length > 0;

        return (
          <div key={item.id} className="relative group">
            {/* Render parent link */}
            <Link
              to={item.to || '#'}
              className="nav-link flex items-center gap-2 px-4 py-2 hover:bg-[var(--bg-primary-hover)]"
              onClick={() => hasChildren && handleDropdownToggle(item.id)}
            >
              {item.icon && <span className="icon">{item.icon}</span>}
              {item.title}
              {hasChildren && <span className="dropdown-icon">▼</span>}
            </Link>

            {/* Render child items in a dropdown */}
            {hasChildren && openDropdowns[item.id] && (
              <div className="dropdown-menu absolute left-0 mt-1 w-full bg-[var(--bg-primary)] shadow-[var(--box-shadow-light)] rounded-lg">
                {childItems.map((child) => (
                  <Link
                    key={child.id}
                    to={child.to || '#'}
                    className="dropdown-item block px-4 py-2 hover:bg-[var(--bg-primary-hover)]"
                  >
                    {child.icon && <span className="icon">{child.icon}</span>}
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      });
  };

  return (
    <Disclosure as="nav"  className="navbar bg-[var(--background-color)] p-4 shadow-[var(--box-shadow-light)] text-[var(--text-color)]">
       {/* Logo */}
       <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
        <span className="text-xl font-semibold">ASafariM</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex gap-4">
        <div className="nav-group-left flex gap-4">{renderNavItems('left')}</div>
        <div className="nav-group-right flex gap-4">{renderNavItems('right')}</div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="sm:hidden flex items-center"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-2 mt-4">
          <div className="nav-group-left">{renderNavItems('left')}</div>
          <div className="nav-group-right">{renderNavItems('right')}</div>
        </div>
      )}
    </Disclosure>
  );
};

export default Navbar;