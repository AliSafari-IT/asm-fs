// src/components/NotFound.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSafari, FaHandSparkles as FaFootballBall } from "react-icons/fa";
import HamburgerIcon from "../layout/Navbar/components/HamburgerIcon";
import HamburgerIconX from "../layout/Navbar/components/HamburgerIconX";
import AsmLogo from "../layout/Navbar/components/AsmLogo";

// SVG Figure Components
const FloatingSvg = () => (
  <svg
    className="w-16 h-16 text-blue-400 animate-bounce"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v8m-4-4h8"
    />
  </svg>
);

const FloatingCircle = () => (
  <svg
    className="w-10 h-10 text-green-400 animate-spin-slow"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <circle cx="10" cy="10" r="8" />
  </svg>
);

const NotFound: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="not-found w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      {/* Overlay for Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"></div>
      )}

      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo/Icon */}
        <div className="flex items-center">
          <AsmLogo className="h-10 w-10 mr-3 animate-pulse" brandName="ASafariM" />
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none z-40"
          aria-label="Toggle Menu"
        >
          {/* Hamburger Icon when closed */}
          {!menuOpen ? (
            <HamburgerIcon />
          ) : (
            /* X Icon when open */
            <HamburgerIconX />
          )}
        </button>

        {/* Dropdown Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-t from-indigo-700 via-purple-700 to-pink-700 transform ${menuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 z-40`}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <h2
                                aria-hidden={!menuOpen}
                className="text-3xl font-bold mb-6  animate-parallax  *:hover:text-[var(--info-color)] hover:cursor-pointer">
                ASafariM
              </h2>
              <HamburgerIconX onClick={() => setMenuOpen(false)} className="cursor-pointer" />
            </div>
            <nav>
              <ul>
                <li className="mb-4">
                  <Link
                    to="/"
                    className="block text-xl hover:text-[var(--info-color)] transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/about-asafarim"
                    className="block text-xl hover:text-[var(--info-color)]  transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/contact"
                    className="block text-xl hover:text-[var(--info-color)]  transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
                {/* Add more links as needed */}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col justify-center items-center text-center relative">
        <h1 className="text-7xl font-extrabold mb-4">404</h1>
        <p className="text-xl mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition-colors duration-300"
        >
          Go Back Home
        </Link>

        {/* Animated SVGs */}
        <div className="absolute top-10 left-8">
          <FaSafari className="w-32 h-32 text-yellow-300 animate-spin-slow" />
        </div>
        <div className="absolute top-12 right-12">
          <FaFootballBall className="w-20 h-20 text-red-400 animate-ping" />
        </div>
        <div className="absolute bottom-24 left-20">
          <FloatingCircle />
        </div>
        <div className="absolute bottom-16 right-24">
          <FloatingSvg />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
