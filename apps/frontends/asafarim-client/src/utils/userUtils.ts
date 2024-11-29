// E:\asm-fs\apps\frontends\asafarim-client\src\utils/userUtils.ts

import axios from 'axios';
const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';
const API_URL = isDevelopment ? 'https://localhost:5001/api/Users/userInfo' : 'https://asafarim.com/api/users/userInfo';
const API_FULLINFO_URL = isDevelopment ? 'https://localhost:5001/api/Users/full-info' : 'https://asafarim.com/api/Users/full-info';

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
  try {
    const response = await axios.get(`${API_FULLINFO_URL}/${email}`);
    return response.data; // Returns the combined user data
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error('Error fetching user info.');
  }
};