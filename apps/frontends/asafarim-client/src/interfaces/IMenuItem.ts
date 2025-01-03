import { INavBase } from "./INavBase";
import { ITopic } from "./ITopic";

export interface IMenuItem extends INavBase {
  target?: "_blank" | "_self" | "_parent" | "_top";
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
  subMenu?: IMenuItem[];
  filepath?: string;
  folderName?: string;
  content?: string;
  topics?: ITopic[];
  type?: 'folder' | 'file';
  isExpanded?: boolean
};
