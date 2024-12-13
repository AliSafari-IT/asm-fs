// E:\asm\apps\dashboard-client\src\components\theme\ToggleTheme.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../hooks/useTheme';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

export const ToggleThemeIcon = ({ theme , size = '1x' }: { theme: string, size?: SizeProp  }) => {

  return <FontAwesomeIcon icon={theme === 'dark' ? faMoon : faSun} size={size}/>;
};

interface ToggleThemeProps {
  className?: string;
  size?: SizeProp;
  title?: string;
}
const ToggleTheme = ({ className , size }: ToggleThemeProps): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div 
      title={theme} 
      onClick={toggleTheme} 
      className={`cursor-pointer text-xl ${theme==='dark' ? 'text-[#64bef1]' : 'text-[#bdb220]'} hover:text-teal-600 transition duration-300 ${className}`}
    >
      <ToggleThemeIcon theme={theme} size={size || '1x'}/>
    </div>
  );
};

export default ToggleTheme;
