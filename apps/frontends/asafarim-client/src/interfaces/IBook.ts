import { ISection } from "./ISection";
import { ITopic } from "./ITopic";

export interface IBook {
  id: string;
  title: string;
  icon?: React.ReactElement;
  sections?: ISection[];
  topics?: ITopic[];
};
