export interface IStackItem {
  name: string;
  slug?: string;
  description: string;
  color: string;
  textColor: string;
}

export interface IStackGroup {
  [key: string]: IStackItem[];
}
