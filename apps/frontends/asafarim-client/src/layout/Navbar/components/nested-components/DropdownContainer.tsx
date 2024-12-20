import React from 'react';
import { DropdownContainerProps } from '../../../../interfaces/dropdown-types';

const DropdownContainer: React.FC<DropdownContainerProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="lg:absolute lg:left-0 lg:mt-2 w-full lg:w-48 bg-[var(--bg-primary)] shadow-lg rounded-md">
      {children}
    </div>
  );
};

export default DropdownContainer;