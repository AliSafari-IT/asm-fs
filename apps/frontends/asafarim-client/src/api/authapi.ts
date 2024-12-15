// apps/frontends/asafarim-client/src/api/authapi.ts
// 
import axios, { AxiosError } from 'axios';
import { ILoginModel } from '../interfaces/ILoginModel';
import { IRegisterModel } from '../interfaces/IRegisterModel';
import { IErrorData } from '@/interfaces/IErrorData';
const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';

const BASE_URL = isDevelopment ? 'https://localhost:5001' : 'https://asafarim.com';
const API_Auth_URL = isDevelopment ? BASE_URL+'/api/Auth' : 'https://asafarim.com/api/auth';
const API_URL = isDevelopment ? BASE_URL+'/api' : 'https://asafarim.com/api';
console.log("API_URL is:", API_Auth_URL);
console.log("BASE_URL is:", BASE_URL);
console.log("API_URL is:", API_URL);

export const register = async (model: IRegisterModel) => {
  try {
    const fetchUrl = `${API_Auth_URL}/register`;
    console.log("fetchUrl is:", fetchUrl);
    const response = await axios.post(fetchUrl, model);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (!err.response) {
      throw new Error('Network error occurred');
    }

    const errorData = err.response?.data as IErrorData | undefined;

    if (!errorData) {
      throw new Error('Unknown error occurred');
    }

    if (Array.isArray(errorData)) {
      throw new Error(errorData[0]?.description || 'Registration failed');
    }

    if (errorData.errors && Array.isArray(errorData.errors)) {
      throw new Error(errorData.errors[0]?.description || 'Registration failed');
    }

    throw new Error(errorData.error || errorData.message || 'Registration failed');
  }
};

export const login = async (model: ILoginModel) => {
  try {
    // First, authenticate the user
    const response = await axios.post(`${API_Auth_URL}/login`, model);
    const userData = response.data;
    console.debug("authapi.login - userData is:", userData);
    // Check if the authentication was successful
    if (!userData.token) {
      throw new Error('Login failed! Please check your credentials.');
    }

    try {
      // Try to get additional user info, but don't fail if it's not available
      const userInfoUrl = `${API_URL}/Users/by-email/${model.usernameOrEmail.replace('@', '%40')}`;
      console.log("userInfoUrl is:", userInfoUrl);
      const userInfoResponse = await axios.get(userInfoUrl);
      const fullUserData = userInfoResponse.data;

      // Check if user is deleted
      if (fullUserData.isDeleted) {
        throw new Error('This account has been deleted. Please contact support if you believe this is a mistake.');
      }
      console.log("Full user data:", fullUserData);
      // Merge the authentication data with full user data
      return {
        ...userData,
        user: {
          ...userData.user,
          ...fullUserData
        }
      };
    } catch (userInfoError) {
      // If we can't get additional user info, just return the auth data
      console.warn('Could not fetch additional user info:', userInfoError);
      return userData;
    }
  } catch (error) {
    const err = error as AxiosError;
    if (err.message) {
      throw err.message;
    }
    const errorData = err.response?.data as { error?: string };
    console.log("Error data when logging in:", errorData);
    throw errorData.error || 'Login failed! Please check your credentials.';
  }
};

export const requestAccountReactivation = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/Users/request-reactivation`, { email });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.message) {
      throw err.message;
    }
    const errorData = err.response?.data as { error?: string };
    throw errorData.error || 'Failed to send reactivation request.';
  }
};
