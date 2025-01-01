import { IAuthState } from '@/interfaces/IAuthState';
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserDropdown: React.FC<{ auth: IAuthState, themeToggler?: React.ReactNode, mobileView: boolean }> = ({ auth, themeToggler, mobileView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  console.log(auth);
  const user = auth?.user;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-[var(--text-info)] hover:text-[var(--info)] focus:outline-none transition-colors duration-200"
      >
        <div className="w-8 h-8 rounded-full bg-[var(--info)] text-[var(--text-primary)] flex items-center justify-center">
          {`${user.userName?.charAt(0).toUpperCase()}`}
        </div>
        <span className="text-sm font-medium text-[var(--text-warning)]">{user.userName}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`${mobileView ? "absolute left-0 z-50" : "absolute right-0 z-50"} mt-2 w-48 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-md shadow-lg overflow-hidden z-10 ${isOpen ? 'block' : 'hidden'}`}>
          {themeToggler && <div className="px-4 py-2 flex justify-between items-center">
             {themeToggler}
          </div>}
          <Link
            to="/user-profile"
            className="block px-4 py-2 text-sm  hover:bg-[var(--info-light)] dark:hover:bg-gray-700 transition-colors duration-200"
            title='User Profile'
          >
            User Profile
          </Link>
          <Link
            to="/user-account-settings"
            className="block px-4 py-2 text-sm  hover:bg-[var(--info-light)] dark:hover:bg-gray-700 transition-colors duration-200"
            title='Account Settings'
          >
            Account Settings
          </Link>
          <hr className="my-1 border-gray-200 dark:border-gray-700" />
          <Link
            to="/logout"
            className="block px-4 py-2 text-sm text-[var(--danger-dark)] bg-[var(--danger-light)] hover:text-[var(--danger-dark)] hover:font-extrabold transition-colors duration-200"
            title='Logout'
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
