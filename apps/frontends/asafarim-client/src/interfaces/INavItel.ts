export interface INavItem {
    id: string;
    title: string;
    icon?: React.ReactElement;
    parentId?: string;
    to?: string;
    aligned: 'left' | 'right' | 'inherited';
  }