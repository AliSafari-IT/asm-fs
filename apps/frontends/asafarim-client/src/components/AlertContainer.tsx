import React from 'react';

interface AlertContainerProps {
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    close?: () => void;
  theme?: 'info' | 'success' | 'warning' | 'danger' | 'none'; // Define the possible themes
  children: React.ReactNode; // Allow children to be passed in
}

const themeStyles: { [key: string]: string } = {
  info: 'border-blue-400 ',
  success: 'border-green-400',
  warning: 'border-yellow-400',
  danger: 'border-red-400',
  none: '',
};

const AlertContainer: React.FC<AlertContainerProps> = ({ theme = 'none', children }) => {

  return (
    <div className={`p-4 border rounded-lg shadow-md ${themeStyles[theme]}`}>
      {children}
    </div>
  );
};

export default AlertContainer;
