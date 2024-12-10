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

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      .animate-spin-slow {
        animation: spin-slow 8s linear infinite;
      }
      .animate-bounce-slow {
        animation: bounce-slow 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={title || `Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`group relative inline-flex h-9 w-16 items-center justify-center rounded-full 
        transition-all duration-300 ease-in-out
        ${isDark 
          ? 'bg-gray-700 hover:bg-gray-600' 
          : 'bg-blue-100 hover:bg-blue-200'
        }`}
      aria-label={`Toggle ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className={`absolute left-1 flex h-7 w-7 transform items-center justify-center rounded-full 
        transition-all duration-500 ease-in-out
        ${isDark
          ? 'translate-x-7 bg-blue-500 text-white'
          : 'translate-x-0 bg-amber-400 text-gray-900'
        }
        group-hover:scale-110 group-active:scale-95`}
      >
        {!isDark ? (
          <WeatherSunnyFilled fontSize={size - 4} className="animate-spin-slow" />
        ) : (
          <WeatherMoonFilled fontSize={size - 4} className="animate-bounce-slow" />
        )}
      </span>
      <span className={`absolute inset-0 rounded-full transition-opacity duration-300
        ${isDark
          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20'
          : 'bg-gradient-to-r from-amber-400/20 to-orange-400/20'
        }`}
      />
    </button>
  );
};

export default React.memo(ToggleTheme);
