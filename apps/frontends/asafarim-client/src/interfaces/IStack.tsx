import { ITopic } from "./ITopic";

export interface IStackItem {
  name: string;
  slug?: string;
  description: string;
  color: string;
  textColor: string;
  icon?: React.ReactElement;
  link?: string | string[];
  topics?: ITopic[];
}

export interface IStackGroup {
  [key: string]: IStackItem[];
}
