import { INavBase } from "./INavBase";
import { ITopic } from "./ITopic";

export interface INavItem extends INavBase {
    onClick?: () => void | undefined;
    subMenu?: INavItem[],
    topics?: ITopic[],
    filepath?: string
  }