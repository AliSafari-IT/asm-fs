import React from 'react';

interface FontSizeRadioButtonsProps {
  currentFontSize: string;
  onFontSizeChange: (size: string) => void;
  sizes?: { value: string; viewBox: string; height: string; width: string }[];
}

const FontSizeRadioButtons: React.FC<FontSizeRadioButtonsProps> = ({ 
  currentFontSize, 
  onFontSizeChange, 
  sizes = [
    { value: '14px', viewBox: "0 0 16 16", height: "1em", width: "1em" },
    { value: '16px', viewBox: "0 0 18 18", height: "1.25em", width: "1.25em" },
    { value: '18px', viewBox: "0 0 20 20", height: "1.5em", width: "1.5em" }
  ]
}) => {
  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <label key={size.value} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="fontSize"
            value={size.value}
            checked={currentFontSize === size.value}
            onChange={() => onFontSizeChange(size.value)}
            className="sr-only" // Hide the actual radio button
          />
          <svg 
            stroke={currentFontSize === size.value ? "red" : "currentColor"} 
            fill={currentFontSize === size.value ? "red" : "currentColor"}  
            strokeWidth="0" 
            viewBox={size.viewBox}
            height={size.height} 
            width={size.width} 
            xmlns="http://www.w3.org/2000/svg"
            className={`
              transition-all duration-200 ease-in-out
              ${currentFontSize === size.value 
                ? 'text-blue-500 transform scale-110 hover:text-blue-300' 
                : 'text-gray-500 hover:text-blue-300'}
            `}
          >
            <path fillRule="evenodd" d="M13.62 9.08L12.1 3.66h-.06l-1.5 5.42h3.08zM5.7 10.13S4.68 6.52 4.53 6.02h-.08l-1.13 4.11H5.7zM17.31 14h-2.25l-.95-3.25h-4.07L9.09 14H6.84l-.69-2.33H2.87L2.17 14H0l3.3-9.59h2.5l2.17 6.34L10.86 2h2.52l3.94 12h-.01z"></path>
          </svg>
        </label>
      ))}
    </div>
  );
};

export default FontSizeRadioButtons;