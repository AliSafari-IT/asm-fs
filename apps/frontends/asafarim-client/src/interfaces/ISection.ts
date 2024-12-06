import { IChapter } from "./IChapter";
import { INavBase } from "./INavBase";

export interface ISection extends INavBase {
  chapters?: IChapter[];
};
