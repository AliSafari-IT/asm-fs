import { INavBase } from "./INavBase";

export interface INavItem extends INavBase {
    onClick?: () => void | undefined;
    subMenu?: INavItem[]
  }