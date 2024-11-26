import React from "react";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 relative">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-500 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-2 text-lg text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition duration-300"
      >
        Go back home
      </Link>

      {/* Animated SVGs */}
      <div className="absolute top-20 left-10">
        <FloatingSvg />
      </div>
      <div className="absolute top-10 right-10">
        <FloatingCircle />
      </div>
      <div className="absolute bottom-20 left-16">
        <FloatingCircle />
      </div>
      <div className="absolute bottom-12 right-20">
        <FloatingSvg />
      </div>
    </div>
  );
};

export default NotFound;
