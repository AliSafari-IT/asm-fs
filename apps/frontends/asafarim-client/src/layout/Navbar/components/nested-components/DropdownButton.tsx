import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { DropdownButtonProps } from '../../../../interfaces/dropdown-types';

const DropdownButton: React.FC<DropdownButtonProps> = ({ title, isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-3 py-2 text-[var(--text-primary)] hover:text-[var(--text-secondary)]"
    >
      {title}
      <FontAwesomeIcon icon={faChevronDown} className={`ml-2 transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

export default DropdownButton;