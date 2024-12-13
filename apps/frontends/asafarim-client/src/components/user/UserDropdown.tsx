import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserDropdown: React.FC<{ auth: any }> = ({ auth: { user } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
          <Link
            to="/user-profile"
            className="block px-4 py-2 text-sm  hover:bg-[var(--info-light)] dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Profile
          </Link>
          <Link
            to="/user-account-settings"
            className="block px-4 py-2 text-sm hover:bg-[var(--info-light)] dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Account Settings
          </Link>
          <hr className="my-1 border-gray-200 dark:border-gray-700" />
          <Link
            to="/logout"
            className="block px-4 py-2 text-sm text-[var(--danger-dark)] hover:bg-[var(--danger-light)] dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
