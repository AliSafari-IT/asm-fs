// E:\asm-fs\apps\frontends\asafarim-client\src\utils/userUtils.ts

import axios, { AxiosError } from 'axios';
const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';
const API_URL = isDevelopment ? 'https://localhost:5001/api/Users/userInfo' : 'https://asafarim.com/api/users/userInfo';
const API_FULLINFO_URL = isDevelopment ? 'https://localhost:5001/api/Users/full-info' : 'https://asafarim.com/api/Users/full-info';
const API_DELETE_URL = isDevelopment ? 'https://localhost:5001/api/aspnetusers' : 'https://asafarim.com/api/aspnetusers';

interface ErrorResponse {
  message: string;
}

export const getUserInfo = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data; // Return the user data from the response
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error('Error fetching user info.');
  }
};


export const getUserFullInfo = async (email: string) => {
  const url = `${API_FULLINFO_URL}/by-email/${email}`;
  console.debug('Fetching user full info from:', url);
  
    try {
    const response = await axios.get(url);
    return response.data; // Returns the combined user data
  } catch (error) {
    console.error('Error fetching user info:', error);
    const err = error as AxiosError;
    throw new Error('Error fetching user info: ' + err.response?.data);
  }
};

// Delete user account API call
export const deleteUserAccount = async (id: string, password: string) => {
  try {
    const response = await axios.delete(`${API_DELETE_URL}/${id}`, {
      data: { password }  // Send password in request body
    });
    console.log('User account deleted successfully.', response);
    return response;
  } catch (error) {
    console.error('Error deleting user account:', error);
    const err = error as AxiosError<ErrorResponse>;
    throw new Error(err.response?.data?.message || 'Error deleting user account.');
  }
};