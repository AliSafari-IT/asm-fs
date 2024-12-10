// E:\asm\apps\dashboard-client\src\components\theme\ToggleTheme.tsx
import React from 'react';
import { WeatherMoonFilled, WeatherSunnyFilled } from '@fluentui/react-icons';
import { useTheme } from '../../hooks/useTheme';

interface ToggleThemeProps {
  className?: string;
  size?: number;
  title?: string;
}

const ToggleTheme: React.FC<ToggleThemeProps> = ({ 
  className = '', 
  size = 20,
  title 
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={title || `Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`p-2 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
        isDark 
          ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-700' 
          : 'text-yellow-500 hover:text-yellow-400 hover:bg-gray-100'
      } ${className}`}
      aria-label={`Toggle ${isDark ? 'light' : 'dark'} mode`}
    >
      {!isDark ? <WeatherSunnyFilled fontSize={size} /> : <WeatherMoonFilled fontSize={size} />}
    </button>
  );
};

export default React.memo(ToggleTheme);
