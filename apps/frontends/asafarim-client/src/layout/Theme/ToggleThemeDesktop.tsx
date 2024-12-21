// E:\asm\apps\dashboard-client\src\components\theme\ToggleTheme.tsx
import React from 'react';
import { ToggleThemeProps } from '@/interfaces/ToggleThemeProps';
import { useTheme } from '@/contexts/ThemeContext';
import { Star24Regular, WeatherMoonFilled, WeatherSunnyFilled } from '@fluentui/react-icons';

const ToggleThemeDesktop: React.FC<ToggleThemeProps> = ({
  className = '',
  size = 20,
  title,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // Convert FontAwesome size to pixel number
  const getPixelSize = (size: string | number): number => {
    if (typeof size === 'number') return size;
    const sizeMap: { [key: string]: number } = {
      'xs': 12,
      'sm': 14,
      '1x': 16,
      'lg': 18,
      '2x': 24,
      '3x': 32,
      '4x': 48,
      '5x': 64,
      '6x': 80,
      '7x': 96,
      '8x': 112,
      '9x': 128,
      '10x': 144,
    };
    return sizeMap[size] || 20;
  };

  const pixelSize = getPixelSize(size);

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes twinkle {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(0.8); }
      }
      @keyframes cloud-float {
        0% { transform: translateX(0); }
        100% { transform: translateX(20px); }
      }
      .star-1 { animation: twinkle 2s ease-in-out infinite; }
      .star-2 { animation: twinkle 2.5s ease-in-out infinite 0.3s; }
      .star-3 { animation: twinkle 1.8s ease-in-out infinite 0.5s; }
      .float-icon { animation: float 3s ease-in-out infinite; }
      .cloud { animation: cloud-float 3s ease-in-out infinite alternate; }
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
      className={`${className} group relative h-12 w-20 rounded-xl p-1.5 transition-all duration-500  z-50 
        ${isDark 
          ? 'bg-gradient-to-b from-gray-900 via-blue-900 to-blue-800' 
          : 'bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100'
        }`}
      aria-label={`Toggle ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Scene Container */}
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        {/* Stars (visible in dark mode) */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
          <Star24Regular className="star-1 absolute left-2 top-1 h-2 w-2 text-white" />
          <Star24Regular className="star-2 absolute left-6 top-3 h-1.5 w-1.5 text-white" />
          <Star24Regular className="star-3 absolute right-3 top-2 h-2 w-2 text-white" />
        </div>

        {/* Clouds (visible in light mode) */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${!isDark ? 'opacity-100' : 'opacity-0'}`}>
          <div className="cloud absolute left-1 top-2 h-2 w-4 rounded-full bg-white/80" />
          <div className="cloud absolute right-2 top-4 h-1.5 w-3 rounded-full bg-white/80" />
        </div>

        {/* Main Icon */}
        <div className={`float-icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-all duration-500
          ${isDark ? 'text-blue-200' : 'text-yellow-400'}`}
        >
          {isDark ? (
            <WeatherMoonFilled fontSize={pixelSize + 4} className="drop-shadow-lg" />
          ) : (
            <WeatherSunnyFilled fontSize={pixelSize + 4} className="drop-shadow-lg" />
          )}
        </div>

        {/* Reflection/Glow Effect */}
        <div className={`absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 transform rounded-full blur-sm transition-all duration-500
          ${isDark 
            ? 'bg-blue-400/30' 
            : 'bg-yellow-400/30'
          }`}
        />
      </div>
    </button>
  );
};

export default React.memo(ToggleThemeDesktop);
