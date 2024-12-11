import React from 'react';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ href, children, className = '' }) => {
  const baseClasses = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <button className={combinedClasses}>
        <a href={href}>{children}</a>
      </button>
    );
  }

  return (
    <button className={combinedClasses}>
      {children}
    </button>
  );
};

export default Button;
