export interface IUserModel {
    id?: string;
    userId?: string;
    isAdmin: boolean;
    email: string;
    fullName: string;
    remark?: string;
    bio?: string;
}