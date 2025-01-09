// IUserRole.ts
import { IUser } from "./IUser";
import { IRoleEnum } from "./IRole";

export interface IUserRole {
    userId: string; // Guid type as a string
    user?: IUser;  // Optional user reference
    roleId: string; // Guid type as a string
    role?: IRoleEnum; // Optional role reference
}