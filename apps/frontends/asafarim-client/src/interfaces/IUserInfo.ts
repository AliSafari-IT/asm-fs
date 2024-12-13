export interface UserInfo {
  id?: string;
  fullName?: string;
  createdAt?: string;
  updatedAt?: string;
  isAdmin?: boolean;
  isDeleted?: boolean;
  deletedAt?: string;
  userId?: string;
  userName?: string;
  email?: string;
  bio?: string;
}

export default UserInfo;  