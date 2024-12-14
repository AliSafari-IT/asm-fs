import { IUser } from "./IUser";

export interface IAuthState {
    user: IUser | null;
    logout: () => void;
    checkAuthState: () => void;
  } 