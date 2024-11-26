// src/components/Loading/Loading.tsx

import React from 'react';
import './Loading.css';

interface LoadingProps {
  size?: number; // Size of the loading icon, optional
  color?: string; // Color of the loading icon, optional
  isMobile?: boolean; // Indicates if the view is mobile
  isSidebarOpen?: boolean; // Indicates if the sidebar is open
}

const Loading: React.FC<LoadingProps> = ({ size = 40, color = "#0056b3", isMobile = false, isSidebarOpen = false }) => {
  // Determine styles based on mobile view and sidebar state
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: isMobile ? '100vw' : '100%',
    height: isMobile ? '100vh' : '100%',
    position: isMobile ? 'fixed' : 'relative',
    top: 0,
    left: 0,
    zIndex: isSidebarOpen ? 1000 : 1,
    backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
  };

  return (
    <div className="loading-container" style={containerStyles}>
      <svg
        className="loading-icon"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="10"
          stroke={color}
          fill="none"
          strokeDasharray="200"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Loading;
