export interface INavBase {
  id: string;
  title?: string;
  name?: string;
  label?: string;
  description?: string;
  to?: string;
  icon?: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;  
}