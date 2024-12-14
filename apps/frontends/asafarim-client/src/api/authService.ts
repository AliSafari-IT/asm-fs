// src/api/authService.ts
import axios, { AxiosError } from 'axios';
import { handleError } from '../utils/handleError'; // Import the centralized error handler

const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';

const BASE_URL = isDevelopment ? 'https://localhost:5001' : 'https://asafarim.com';

const API_URL = `${BASE_URL}/api/Auth`; // Replace with your actual API URL

export interface UpdateEmailModel {
  userId: string;
  newEmail?: string;
  newUsername?: string;
}

export const updateEmail = async (model: UpdateEmailModel) => {
  try {
    const response = await axios.post(`${API_URL}/update-email`, model);
    return response.data;
  } catch (error) {
    // Use the centralized error handler
    const err = error as AxiosError;
    const message = handleError(err); 
    console.log('Error message when updating email:', message);
    return { message };
  }
};

export const updateUsername = async (model: { userId: string; newUsername: string; email: string }) => {
  try {
    //console.log("model is:", model);
    const response = await axios.post(`${API_URL}/update-username`, model);
    return response.data;
  } catch (error) {
    // Use the centralized error handler
    const err = error as AxiosError;
    const message = handleError(err); 
    console.log('Error message when updating username:', message);
    return { message };
  }
};

export const updatePassword = async (model: { userId: string; currentPassword: string; newPassword: string }) => {
  try {
    const response = await axios.post(`${API_URL}/update-password`, model);
    return response.data;
  } catch (error) {
    // Use the centralized error handler
    const err = error as AxiosError;
    const message = handleError(err); 
    console.log('Error message when updating password:', message);
    return { message };
  }
};

export default { updateEmail, updateUsername, updatePassword };
