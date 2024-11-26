import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="text-gray-800 dark:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/tasks" className="text-gray-800 dark:text-white px-3 py-2 rounded-md text-sm font-medium">Tasks</Link>
          </div>
          <div className="flex items-center">
            <button onClick={toggleDarkMode} className="text-gray-800 dark:text-white px-3 py-2 rounded-md text-sm font-medium">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <Link to="/login" className="text-gray-800 dark:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
            <Link to="/register" className="text-gray-800 dark:text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
            {/* Conditionally render UserProfile and Logout buttons */}
            {/* <Link to="/profile" className="text-gray-800 dark:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
            <button className="text-gray-800 dark:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
