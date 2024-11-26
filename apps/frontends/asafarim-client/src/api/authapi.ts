import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your actual API URL

export interface RegisterModel {
  email: string;
  password: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export const register = async (model: RegisterModel) => {
  try {
    const response = await axios.post(`${API_URL}/register`, model);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const message = err.response?.data as { message: string };
    console.log("Error message:", message);
    return message;
  }
};

export const login = async (model: LoginModel) => {
  try {
    const response = await axios.post(`${API_URL}/login`, model);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const message = err.response?.data as { message: string };
    console.log("Error message:", message);
    return message;
  }
};
