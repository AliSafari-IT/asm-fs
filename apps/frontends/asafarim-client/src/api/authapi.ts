// apps/frontends/asafarim-client/src/api/authapi.ts
// 
import axios, { AxiosError } from 'axios';
import { ILoginModel } from '../interfaces/ILoginModel';
import { IRegisterModel } from '../interfaces/IRegisterModel';

const API_URL = 'http://localhost:5000/api/Auth'; // Replace with your actual API URL
export const register = async (model: IRegisterModel) => {
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

export const login = async (model: ILoginModel) => {
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
