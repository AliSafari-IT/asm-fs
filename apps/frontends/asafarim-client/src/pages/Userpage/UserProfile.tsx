import React, { useState } from 'react';
import AlertContainer from '../../components/AlertContainer';
import { AxiosError } from 'axios';
import authService from '../../api/authService';

const UserProfile: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('email');

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userData = localStorage.getItem('user');
            const userId = userData ? JSON.parse(userData).user.id : null;
            await authService.updateEmail({ userId, newEmail: email });
            console.log('Email updated successfully!');
            setError(null);
        } catch (error) {
            const err = error as AxiosError;
            const errObj = err.response?.data as { message: string };
            console.log("Update email failed:", errObj);
            setError(`Update email failed: ${errObj.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateUsername = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userData = localStorage.getItem('user');
            const userId = userData ? JSON.parse(userData).user.id : null;
            await authService.updateUsername({ userId, newUsername: username });
            console.log('Username updated successfully!');
            setError(null);
        } catch (error) {
            const err = error as AxiosError;
            const errObj = err.response?.data as { message: string };
            console.log("Update username failed:", errObj);
            setError(`Update username failed: ${errObj.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userData = localStorage.getItem('user');
            const userId = userData ? JSON.parse(userData).user.id : null;
            await authService.updatePassword({ userId, currentPassword, newPassword });
            console.log('Password updated successfully!');
            setError(null);
        } catch (error) {
            const err = error as AxiosError;
            const errObj = err.response?.data as { message: string };
            console.log("Update password failed:", errObj);
            setError(`Update password failed: ${errObj.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertContainer theme="info" className="w-1/2 mx-auto my-10 px-4 py-3 rounded relative">
            <div className="flex justify-center space-x-4 mb-4">
                <button onClick={() => setActiveTab('email')} className={`p-2 ${activeTab === 'email' ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white rounded-md`}>Update Email</button>
                <button onClick={() => setActiveTab('username')} className={`p-2 ${activeTab === 'username' ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white rounded-md`}>Update Username</button>
                <button onClick={() => setActiveTab('password')} className={`p-2 ${activeTab === 'password' ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white rounded-md`}>Update Password</button>
            </div>

            {activeTab === 'email' && (
                <form onSubmit={handleUpdateEmail} className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-full max-w-xs">
                        <label htmlFor="email" className="block mb-2 font-bold">New Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter new email"
                            className="p-2 border rounded-md w-full max-w-xs"
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
                        {loading ? 'Updating...' : 'Update Email'}
                    </button>
                </form>
            )}

            {activeTab === 'username' && (
                <form onSubmit={handleUpdateUsername} className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-full max-w-xs">
                        <label htmlFor="username" className="block mb-2 font-bold">New Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter new username"
                            className="p-2 border rounded-md w-full max-w-xs"
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
                        {loading ? 'Updating...' : 'Update Username'}
                    </button>
                </form>
            )}

            {activeTab === 'password' && (
                <form onSubmit={handleUpdatePassword} className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-full max-w-xs">
                        <label htmlFor="currentPassword" className="block mb-2 font-bold">Current Password:</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                            className="p-2 border rounded-md w-full max-w-xs"
                            required
                        />
                    </div>
                    <div className="w-full max-w-xs">
                        <label htmlFor="newPassword" className="block mb-2 font-bold">New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="p-2 border rounded-md w-full max-w-xs"
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            )}

            {error && (
                <div className="max-w-xs w-full p-4 mb-2 danger border border-red-200 rounded-lg shadow text-center">
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}
        </AlertContainer>
    );
};

export default UserProfile;
