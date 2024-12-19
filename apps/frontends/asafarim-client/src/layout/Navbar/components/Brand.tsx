// src/layout/Navbar/components/AsmLogo.tsx

import React from "react";
import logo from './logoT.svg'; // Ensure the path is correct

interface BrandProps {
  logoPath?: string;
  to?: string;
  className?: string;
  brandName?: string;
}

const Brand: React.FC<BrandProps> = ({ logoPath, to = "/", className = "", brandName }) => {
  return (
    <div className={`flex items-center shrink-0 ${className}`}>
     <a href={to} target="_self" rel="noopener noreferrer" 
     className="flex items-center gap-0 transition-transform hover:scale-105">
       {logoPath ? (
         <img src={logoPath} alt="Logo" className="h-10 w-10 mr-0 animate-pulse" />
       ) : (
         <img src={logo} alt="Logo" className="h-10 w-10 mr-0 animate-pulse" />
       )}
       {brandName && (
         <span className="text-xl font-bold pr-1 pl-0 py-1 rounded-md text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
           {brandName}
         </span>
       )}
     </a>
    </div>
  );
};

export default Brand;
