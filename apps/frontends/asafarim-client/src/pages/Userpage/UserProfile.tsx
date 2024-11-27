import React, { useState, useEffect } from 'react';
import { FaUndo } from 'react-icons/fa';  // Import the reset icon from react-icons
import AlertContainer from '../../components/AlertContainer';
import authService from '../../api/authService';

const UserProfile: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // New state for success message
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('email');

    // Fetch user data from localStorage
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData).user;
            setEmail(user.email);  // Assuming user object contains 'email'
            setUsername(user.userName);  // Assuming user object contains 'username'
        }
    }, []); // Empty dependency array ensures it only runs once when the component is mounted.

    // Reset email and username to original values from localStorage
    const handleResetEmailUsername = () => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData).user;
            setEmail(user.email);  // Reset email to original value
            setUsername(user.userName);  // Reset username to original value
        }
    };

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);  // Reset success message

        try {
            const userData = localStorage.getItem('user');
            const userId = userData ? JSON.parse(userData).user.id : null;
            const result = await authService.updateEmail({ userId, newEmail: email });
            setSuccessMessage(result.message);
        } catch (error) {
            setError(error as string || 'Failed to update email: (Error 500: Internal Server Error)');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateUsername = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);  // Reset success message

        try {
            const userData = localStorage.getItem('user');
            const userId = userData ? JSON.parse(userData).user.id : null;
            const result = await authService.updateUsername({ userId, newUsername: username, email });
            setSuccessMessage(result.message);
        } catch (error) {
            setError(error as string || 'Failed to update username');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);  // Reset success message

        try {
            const userData = localStorage.getItem('user');
            const userId = userData ? JSON.parse(userData).user.id : null;
            const result = await authService.updatePassword({ userId, currentPassword, newPassword });
            setSuccessMessage(result.message);
        } catch (error) {
            setError(error as string || 'Failed to update password');
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
                    <div className="w-full max-w-xs relative">
                        <label htmlFor="email" className="block mb-2 font-bold text-indigo-400">Current Email:
                            <FaUndo onClick={handleResetEmailUsername} className="absolute left-3 top-10 transform -translate-y-1/2 cursor-pointer" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter new email"
                                className="p-2 border rounded-md w-full max-w-xs ml-8"
                                required
                            />
                        </label>
                    </div>
                    <button type="submit" disabled={loading} className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
                        {loading ? 'Updating...' : 'Update Email'}
                    </button>
                </form>
            )}

            {activeTab === 'username' && (
                <form onSubmit={handleUpdateUsername} className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-full max-w-xs relative">
                        <label htmlFor="username" className="block mb-2 font-bold text-indigo-400">Current Username:
                            <FaUndo onClick={handleResetEmailUsername} className="absolute left-3 top-10 transform -translate-y-1/2 cursor-pointer" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter new username"
                                className="p-2 border rounded-md w-full max-w-xs ml-8"
                                required
                            />
                        </label>
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

            {/* Success Message */}
            {successMessage && (
                <div className=" w-full p-2 m-4 text-green-800 border border-green-200 rounded-lg shadow text-center bg-green-50">
                    <p className="text-sm font-medium">{successMessage}</p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="max-w-xs w-full p-4 mb-2 danger border border-red-200 rounded-lg shadow text-center">
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}
        </AlertContainer>
    );
};

export default UserProfile;
