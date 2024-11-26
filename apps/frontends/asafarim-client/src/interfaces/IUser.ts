import { IBlogPost } from "./IBlogPost";
import { IUserRole } from "./IUserRole";

export interface IUser {
    id: string; // Guid type
    name: string;
    username: string;
    email: string;
    passwordHash?: string;
    createdAt: Date;
    updatedAt: Date;
    blogPosts?: IBlogPost[]; // Assuming BlogPost structure in IBlogPost
    userRoles?: IUserRole[];  // Assuming UserRole structure in IUserRole
}