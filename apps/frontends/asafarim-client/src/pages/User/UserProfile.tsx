import React, { useEffect, useState } from 'react';
import { getUserFullInfo } from '../../utils/userUtils'; 
import UserInfo from '../../interfaces/IUserInfo';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If user is not authenticated, redirect to home
        if (!user?.email) {
            navigate('/');
            return;
        }

        const fetchUserInfo = async () => {
            try {
                const data = await getUserFullInfo(user.email);
                setUserInfo(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch user information:', err);
                setError('Failed to fetch user information.');
                setUserInfo(null);
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [user?.email, navigate]);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {userInfo ? (
                <div className="space-y-6">
                    <div className="flex items-center justify-between pb-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">User Profile</h2>
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold">
                                {userInfo.userName?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Personal Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                                    <p className="mt-1 text-gray-800 dark:text-gray-200">{userInfo.fullName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Username</label>
                                    <p className="mt-1 text-gray-800 dark:text-gray-200">{userInfo.userName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                                    <p className="mt-1 text-gray-800 dark:text-gray-200">{userInfo.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Account Details Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Account Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">User ID</label>
                                    <p className="mt-1 text-sm text-gray-800 dark:text-gray-200 font-mono">{userInfo.userId}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Created At</label>
                                    {userInfo.createdAt !== undefined ? (
                                        <p className="mt-1 text-gray-800 dark:text-gray-200">
                                            {new Date(userInfo.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    ) : (
                                        <p className="mt-1 text-gray-800 dark:text-gray-200">Unknown</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                                    {userInfo.updatedAt !== undefined ? (
                                        <p className="mt-1 text-gray-800 dark:text-gray-200">
                                            {new Date(userInfo.updatedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    ) : (
                                        <p className="mt-1 text-gray-800 dark:text-gray-200">Unknown</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Account Status Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:col-span-2">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Account Status</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Admin Status</label>
                                    <div className="mt-1 flex items-center">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${userInfo.isAdmin ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                            {userInfo.isAdmin ? 'Admin' : 'Regular User'}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Account Status</label>
                                    <div className="mt-1 flex items-center">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${userInfo.isDeleted ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'}`}>
                                            {userInfo.isDeleted ? 'Deleted' : 'Active'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        {loading ? (
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
                        ) : error ? (
                            <div className="text-red-600 dark:text-red-400">{error}</div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">Loading user information...</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
