export interface IUserModel {
  id: string;                  // Unique identifier for the user
  email: string;               // Email address of the user
  fullName: string;            // Full name of the user
  bio?: string;                // Optional biography of the user
  isAdmin: boolean;            // Admin status of the user
  userName?: string;           // Optional username
  userId?: string;             // Optional user ID for external mapping
  createdAt?: string;          // Timestamp when the user was created
  updatedAt?: string;          // Timestamp when the user was last updated
  isDeleted?: boolean;         // Indicates whether the user is soft-deleted
  deletedAt?: string;          // Timestamp when the user was soft-deleted
  profilePicture?: string;     // Optional profile picture URL
  createdBy?: string;          // Optional ID of the user who created this user
  updatedBy?: string;          // Optional ID of the user who last updated this user
  deletedBy?: string;          // Optional ID of the user who deleted this user
  isActive?: boolean;          // Indicates if the user is active
  dateOfBirth?: string;        // Optional date of birth
}
