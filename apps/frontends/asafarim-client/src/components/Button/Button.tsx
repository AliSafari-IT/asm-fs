import React from 'react';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ href, children, onClick, className = '', disabled = false, style }) => {
  const baseClasses = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <button className={combinedClasses} style={style} disabled={disabled}>
        <a href={href}>{children}</a>
      </button>
    );
  }

  return (
    <button className={combinedClasses} onClick={onClick} style={style} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
