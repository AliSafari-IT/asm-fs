// src/layout/Navbar/components/AsmLogo.tsx

import React from "react";
import logo from './logoT.svg'; // Ensure the path is correct

interface AsmLogoProps {
  logoPath?: string;
  to?: string;
  className?: string;
  brandName?: string;
}

const AsmLogo: React.FC<AsmLogoProps> = ({ logoPath, to = "/", className = "", brandName }) => {
  return (
    <div className={`flex items-center shrink-0 ${className}  animate-pulse`}>
     <a href={to} target="_self" rel="noopener noreferrer" 
     className="flex items-center gap-0">
       {logoPath ? (
         <img src={logoPath} alt="Logo" className="h-10 w-10 mr-1" />
       ) : (
         <img src={logo} alt="Logo" className="h-10 w-10 mr-1" />
       )}
       {brandName && (
         <span className="text-xl font-bold px-3 py-1 rounded-md hover:bg-gray-700 text-white transition-colors duration-200">
           {brandName}
         </span>
       )}
     </a>
    </div>
  );
};

export default AsmLogo;
