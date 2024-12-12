import axios from 'axios';
import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';

// in development mode use https://localhost:5001/api/Users
// in production mode use https://asafarim.com/api/users
const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';
const BASE_URL = isDevelopment ? 'https://localhost:5001/api' : 'https://asafarim.com/api';
const USERS_URL = `${BASE_URL}/Users`;
const USER_INFO_URL = `${BASE_URL}/Users/userInfo`;
const USER_FULLINFO_URL = `${BASE_URL}/Users/full-info`;

// Get all users
export const getUsers = async (): Promise<IUser[]> => {
  const response = await axios.get(USERS_URL);
  return response.data;
};

// Get a single user by ID
export const getUserById = async (id: string): Promise<IUser> => {
  const response = await axios.get(`${USER_INFO_URL}/${id}`);
  return response.data;
};

// Get user's full information including the correct ID from AspNetUsers
export const getUserFullInfo = async (email: string): Promise<IUser> => {
  // First, get the AspNetUsers ID for this email
  const response = await axios.get(`${USERS_URL}/by-email/${email}`);
  const aspNetUser = response.data;

  // Then get the full user info using the AspNetUsers ID
  const userResponse = await axios.get(`${USERS_URL}/${aspNetUser.id}`);
  return userResponse.data;
};

// Create a new user
export const createUser = async (user: IUserModel): Promise<IUser> => {
  console.log("createUser", user);
  const response = await axios.post(USERS_URL, user);
  return response.data;
};

// Update an existing user
export const updateUser = async (id: string, user: IUserModel): Promise<IUser> => {
  console.log("updateUser - Original ID:", id);
  console.log("updateUser - User data:", user);
  const targetUserUrl = `${USERS_URL}/by-email/${user.email}`;
  console.log("updateUserUrl:", targetUserUrl);
  try {
    // First, get the AspNetUsers ID for this email
    const idResponse = await axios.get(targetUserUrl);
    const aspNetUserId = idResponse.data.id;
    console.log("Found AspNetUsers ID:", aspNetUserId, "idResponse:", idResponse);

    // Then update the user info using the AspNetUsers ID
    const updateUserUrl = `${USERS_URL}/${aspNetUserId}`;
    console.log("updateUserUrl:", updateUserUrl);

    const response = await axios.put(updateUserUrl, {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      isAdmin: user.isAdmin,
      isDeleted: false,
      updatedAt: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${USER_INFO_URL}/${id}`).then(() => console.log("Deleted user: " + id));
};
