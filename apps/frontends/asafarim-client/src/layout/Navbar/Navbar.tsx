import React from 'react';
import AsmLogo from './components/AsmLogo';

const Navbar: React.FC = () => {

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <AsmLogo
            className="h-10 w-10 mr-3 animate-pulse"
            brandName="ASafariM" />

          <div className="flex items-center">
            <a href="/login" className="text-sm font-semibold mr-4">
              Login
            </a>
            <a href="/register" className="text-sm font-semibold">
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
