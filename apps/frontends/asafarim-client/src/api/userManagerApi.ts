import { IUserModel } from '@/interfaces';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',  // Adjust according to your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Create User
export const createUser = async (userData: IUserModel) => {
    const response = await api.post('/users', userData);
    return response.data;
};

// Fetch Users
export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

// Get User by ID
export const getUserById = async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

// Update User
export const updateUser = async (id: string, userData: { fullName: string, isAdmin: boolean }) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
};

// Delete User
export const deleteUser = async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};
