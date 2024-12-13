import { INavBase } from "./INavBase";
import { ITopic } from "./ITopic";

export interface INavItem extends INavBase {
    content?: string;
    onClick?: () => void | undefined;
    subMenu?: INavItem[],
    topics?: ITopic[],
    filepath?: string
  }