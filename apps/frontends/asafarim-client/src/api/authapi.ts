// apps/frontends/asafarim-client/src/api/authapi.ts
// 
import axios, { AxiosError } from 'axios';
import { ILoginModel } from '../interfaces/ILoginModel';
import { IRegisterModel } from '../interfaces/IRegisterModel';
import { IErrorData } from '@/interfaces/IErrorData';
const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';

const API_URL = isDevelopment ? 'https://localhost:5001/api/Auth' : 'https://asafarim.com/api/auth';
const BASE_URL = isDevelopment ? 'https://localhost:5001' : 'https://asafarim.com';

export const register = async (model: IRegisterModel) => {
  try {
    const fetchUrl = `${API_URL}/register`;
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
    const response = await axios.post(`${API_URL}/login`, model);
    const userData = response.data;

    try {
      // Try to get additional user info, but don't fail if it's not available
      const userInfoResponse = await axios.get(`${BASE_URL}/Users/by-email/${model.usernameOrEmail}`);
      const fullUserData = userInfoResponse.data;

      // Check if user is deleted
      if (fullUserData.isDeleted) {
        throw new Error('This account has been deleted. Please contact support if you believe this is a mistake.');
      }

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
    const response = await axios.post(`${BASE_URL}/Users/request-reactivation`, { email });
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
