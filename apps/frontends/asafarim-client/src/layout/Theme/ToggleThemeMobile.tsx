import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { ToggleThemeProps } from "@/interfaces/ToggleThemeProps";
import { useTheme } from "@/contexts/ThemeContext";

export const ToggleThemeMobile = ({
  size = '1x',
  title,
  className,
}: ToggleThemeProps) => {
  const { theme, toggleTheme } = useTheme();
  return <FontAwesomeIcon
    icon={theme === 'dark' ? faMoon : faSun}
    size={size}
    title={title}
    className={className}
    onClick={toggleTheme}
    style={{ cursor: 'pointer' }}    
  />;
};

export default memo(ToggleThemeMobile); 