import React from 'react';

export const CancelSvgIcon: React.FC = () => {
    return (
        <svg
            className="w-5 h-5 inline-block ml-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
};

export default CancelSvgIcon;