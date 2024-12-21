import { IMenuItem } from '@/interfaces/IMenuItem';

export interface DropdownProps {
  topbarNavData: IMenuItem[];
  className?: string;
}

export interface MenuItemProps {
  item: IMenuItem;
  isActive: boolean;
  onMenuClick: (menuId: string) => void;
  onClose: () => void;
}

export interface SubMenuProps {
  items: IMenuItem[];
  parentId: string;
  onMenuClick: (menuId: string) => void;
  onClose: () => void;
}

export interface DropdownButtonProps {
  title: string;
  isOpen: boolean;
  onClick: () => void;
}

export interface DropdownContainerProps {
  isOpen: boolean;
  children: React.ReactNode;
}