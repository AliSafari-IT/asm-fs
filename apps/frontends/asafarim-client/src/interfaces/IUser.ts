// IUser.ts
import { IUserRole } from "./IUserRole";

export interface IUser {
    id: string;
    isAdmin: boolean;
    email: string;
    lastName: string;
    firstName: string;
    fullName: string;
    remark?: string;
    isDeleted?: boolean;
    deletedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    bio?: string;
    userName?: string;
    userImage?: string;
    userId?: string;
    userRoles?: IUserRole[];
    userRole?: IUserRole;
    userRoleName?: string;
    userRoleDescription?: string;
}


