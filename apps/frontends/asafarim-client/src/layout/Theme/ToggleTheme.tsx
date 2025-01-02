import React from 'react';
import { ToggleThemeProps } from '@/interfaces/ToggleThemeProps';
import ToggleThemeDesktop from './ToggleThemeDesktop';
import ToggleThemeMobile from './ToggleThemeMobile';

const ThemeToggler: React.FC<Omit<ToggleThemeProps, 'themeContext'>> = ({
  className = '',
  size = '1x',
  title = 'Toggle Theme',
  viewWidth = 0,
  mobileView = false,
}) => {
  return (
    mobileView ?
      (<ToggleThemeMobile size={size} title={title} className={className} viewWidth={viewWidth} />) :
      (<ToggleThemeDesktop className={className} size={size} title={title} viewWidth={viewWidth} />)
  );
};

export default ThemeToggler;