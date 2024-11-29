import axios from 'axios';
import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';
// E:\asm\apps\dashboard-client\src\api\userService.ts
// in development mode use https://localhost:5001/api/Users
// in production mode use https://asafarim.com/api/users
const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';
const API_URL = isDevelopment ? 'https://localhost:5001/api/Users' : 'https://asafarim.com/api/users';

// Get all users
export const getUsers = async (): Promise<IUser[]> => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Get a single user by ID
export const getUserById = async (id: string): Promise<IUser> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new user
export const createUser = async (user: IUserModel): Promise<IUser> => {
    console.log( "createUser", user);
  const response = await axios.post(`${API_URL}`, user);
  return response.data;
};

// Update an existing user
export const updateUser = async (id: string, user: IUserModel): Promise<IUser> => {
    console.log( "updateUser", user);

  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

// Delete a user
export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`).then(() => console.log("Deleted user: " + id));
};
