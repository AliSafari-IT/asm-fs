import { INavBase } from "./INavBase";
import { ITopic } from "./ITopic";

export interface IMenuItem extends INavBase {
  target?: "_blank" | "_self" | "_parent" | "_top";
  subMenu?: IMenuItem[];
  onClick?: () => void | undefined;
  onClose?: () => void | undefined;
  onOpen?: () => void | undefined;
  onToggle?: () => void | undefined;
  onClickOutside?: () => void | undefined;
  onMouseEnter?: () => void | undefined;
  onMouseLeave?: () => void | undefined;
  open?: boolean;
  depth?: number;
  isMobile?: boolean;
  isSidebarOpen?: boolean;
  isReadonly?: boolean;
  isDisabled?: boolean; 
  isForNavbar?: boolean; 
  filepath?: string;
  folderName?: string;
  parentFolder?: string;
  content?: string;
  topics?: ITopic[];
  type?: 'folder' | 'file';
  color?: string;
  textColor?: string;
};
