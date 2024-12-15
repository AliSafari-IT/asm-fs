import React from 'react';

export type SortOrder = 'asc' | 'desc';

interface SortArrayProps {
  sortOrder: SortOrder;
  onSortChange: (newOrder: SortOrder) => void;
  className?: string;
  label?: string;
}

const SortArray: React.FC<SortArrayProps> = ({ sortOrder, onSortChange, className = '', label = 'Sort' }) => {
  const toggleSort = () => {
    onSortChange(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <button
      onClick={toggleSort}
      className={`inline-flex items-center gap-1 px-2 py-1 text-sm font-medium transition-all duration-300 ease-in-out group ${className}`}
      type="button"
      title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
    >
      {label && <span>{label}</span>}
      <div className="relative w-4 h-4">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="transform transition-all duration-300"
        >
          <g className="transition-all duration-300">
            {/* Bar 1 (shortest) */}
            <rect
              x="4"
              y={sortOrder === 'asc' ? '16' : '4'}
              width="3"
              height="4"
              rx="1"
              className={`transform transition-all duration-300 ${
                sortOrder === 'asc' ? 'opacity-100' : 'opacity-50'
              }`}
            />
            {/* Bar 2 (medium) */}
            <rect
              x="10"
              y={sortOrder === 'asc' ? '12' : '8'}
              width="3"
              height="8"
              rx="1"
              className="opacity-75"
            />
            {/* Bar 3 (tallest) */}
            <rect
              x="16"
              y={sortOrder === 'asc' ? '8' : '12'}
              width="3"
              height="12"
              rx="1"
              className={`transform transition-all duration-300 ${
                sortOrder === 'desc' ? 'opacity-100' : 'opacity-50'
              }`}
            />
          </g>
        </svg>
      </div>
    </button>
  );
};

export default SortArray;
