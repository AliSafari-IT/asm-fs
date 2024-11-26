import axios, { AxiosError } from 'axios';
const API_URL = 'http://localhost:5000/api/Auth'; // Replace with your actual API URL


export interface UpdateEmailModel {
  userId: string;
  newEmail: string;
}

export interface UpdateUsernameModel {
  userId: string;
  newUsername: string;
}

export interface UpdatePasswordModel {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export const updateEmail = async (model: UpdateEmailModel) => {
  try {
    const response = await axios.post(`${API_URL}/update-email`, model);
    return response.data;
  }catch (error) {
    const err = error as AxiosError;
    const message = err.response?.data as { message: string };
    console.log("Error message when updating email:", message);
    return message;
  }
};

export const updateUsername = async (model: UpdateUsernameModel) => {
  try {
    const response = await axios.post(`${API_URL}/update-username`, model);
    return response.data;
  }catch (error) {
    const err = error as AxiosError;
    const message = err.response?.data as { message: string };
    console.log("Error message when updating username:", message);
    return message;
  }
};

export const updatePassword = async (model: UpdatePasswordModel) => {
  try {
    const response = await axios.post(`${API_URL}/update-password`, model);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const message = err.response?.data as { message: string };
    console.log("Error message when updating password:", message);
    return message;
  }
};

export default { updateEmail, updateUsername, updatePassword };
