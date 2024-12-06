// src/layout/Navbar/components/AsmLogo.tsx

import React from "react";
import logo from './logoT.svg'; // Ensure the path is correct

interface AsmLogoProps {
  logoPath?: string;
  className?: string;
  brandName?: string;
}

const AsmLogo: React.FC<AsmLogoProps> = ({ logoPath, className = "", brandName }) => {
  return (
    <div className={`flex items-center shrink-0 ${className}  animate-pulse`}>
      {logoPath ? (
        <img src={logoPath} alt="Logo" className="h-8 w-8" />
      ) : (
        <img src={logo} alt="Logo" className="h-8 w-8" />
      )}
      {brandName && (
        <span className="text-xl font-semibold tracking-wide ml-2">
          {brandName}
        </span>
      )}
    </div>
  );
};

export default AsmLogo;
