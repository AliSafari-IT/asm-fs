export interface IUserModel {
    id: string;
    email: string;
    fullName: string;
    bio?: string;
    isAdmin: boolean;
    userName?: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
    isDeleted?: boolean;
    deletedAt?: string;
  }
  