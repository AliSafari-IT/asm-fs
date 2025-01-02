import { SizeProp } from "@fortawesome/fontawesome-svg-core";

export type Theme = 'light' | 'dark';

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ToggleThemeProps {
  className?: string;
  size?: SizeProp;
  title?: string;
  viewWidth?: number;
  mobileView?: boolean;
}