import { INavItem } from "./INavItem";

export interface IChapter {
  id: string;
  name?: string;
  label?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  to?: string;
  description?: string;
  icon?: React.ReactElement;
  docs?: INavItem[];
};


