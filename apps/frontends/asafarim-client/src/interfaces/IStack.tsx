export interface IStackItem {
  name: string;
  description: string;
  color: string;
  textColor: string;
}

export interface IStackGroup {
  [key: string]: IStackItem[];
}
