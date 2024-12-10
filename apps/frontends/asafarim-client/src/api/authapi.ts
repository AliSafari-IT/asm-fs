 // apps/frontends/asafarim-client/src/api/authapi.ts
// 
import axios, { AxiosError } from 'axios';
import { ILoginModel } from '../interfaces/ILoginModel';
import { IRegisterModel } from '../interfaces/IRegisterModel';
const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';


const API_URL = isDevelopment ? 'https://localhost:5001/api/Auth' : 'https://asafarim.com/api/auth';

export const register = async (model: IRegisterModel) => {
  try {
    const fetchUrl = `${API_URL}/register`;
    console.log("fetchUrl is:", fetchUrl);
    const response = await axios.post(fetchUrl, model);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const errorData = err.response?.data as { error?: string, errors?: any[] };
    throw errorData.error || (errorData.errors && errorData.errors[0]?.description) || 'Registration failed';
  }
};

export const login = async (model: ILoginModel) => {
  try {
    const response = await axios.post(`${API_URL}/login`, model);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const errorData = err.response?.data as { error?: string };
    console.log("Error data when logging in:", errorData);
    throw errorData.error || 'Login failed! Please check your credentials.';
  }
};
