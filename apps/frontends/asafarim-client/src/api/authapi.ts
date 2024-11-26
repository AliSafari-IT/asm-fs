import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/api/Auth'; // Replace with your actual API URL

export interface RegisterModel {
  email: string;
  password: string;
}

export interface LoginModel {
  usernameOrEmail: string;
  password: string;
}

export const register = async (model: RegisterModel) => {
  try {
    const response = await axios.post(`${API_URL}/register`, model);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const message = err.response?.data as { message?: string } ?? { message: 'Registration failed! Please check your details.' };
    console.log("Error message when registering:", message);
    throw err.response?.data as { message?: string };
  }
};

export const login = async (model: LoginModel) => {
  try {
    const response = await axios.post(`${API_URL}/login`, model);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const message = err.response?.data as { message?: string } ?? { message: 'Login failed! Please check your credentials.' };
    console.log("Error message when logging in:", message);
    throw err.response?.data as { message?: string };
  }
};
