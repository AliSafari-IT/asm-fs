import React, { useState, useEffect } from 'react';
import { FaUndo, FaEnvelope, FaUser, FaLock, FaKey } from 'react-icons/fa';
import authService from '../../api/authService';
import Layout from '@/layout/Layout';
import { useNavigate } from 'react-router-dom';

const AccountSettings: React.FC = () => {
    const [email, setEmail] = useState('');
    const [originalUsername, setOriginalUsername] = useState('');
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('email');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData).user;
            setUserId(user.id);
            setEmail(user.email);
            setOriginalUsername(user.userName);
            setUpdatedUsername(user.userName);
        }
    }, []);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.dispatchEvent(new Event('authStateChange'));
                navigate('/login', { replace: true });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleResetEmailUsername = () => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData).user;
            setEmail(user.email);
            setOriginalUsername(user.userName);
            setUpdatedUsername(user.userName);
            setCurrentPassword('');
            setNewPassword('');
        }
    };

    const validateUsername = (newUsername: string) => {
        console.log('Validating username:', newUsername, '\nOriginal username:', originalUsername, '\nCurrent email:', email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(newUsername)) {
            return "Username must be alphanumeric.";
        }
        if (newUsername.trim() === '') {
            console.debug('Validation failed: Username cannot be empty.');
            return "Username cannot be empty.";
        }
        if (newUsername.trim() === originalUsername.trim()) {
            console.debug('Validation failed: Username cannot be the same as the original username.', newUsername, originalUsername);
            return "Username cannot be the same as the original username.";
        }
        if (newUsername.trim() === email.trim()) {
            console.debug('Validation failed: Username cannot be the same as the current email.', newUsername, email);
            return "Username cannot be the same as the current email.";
        }
        if (newUsername.includes('@')) {
            console.debug('Validation failed: Username cannot contain "@".');
            return "Username cannot contain '@'.";
        }
        if (newUsername.length < 3 || newUsername.length > 20) {
            console.debug('Validation failed: Username must be between 3 and 20 characters.');
            return "Username must be between 3 and 20 characters.";
        }
        if (newUsername.includes("-")) {
            console.debug('Validation failed: Username cannot contain dashes.');
            return "Username cannot contain dashes.";
        }
        if (!usernameRegex.test(newUsername)) {
            console.debug('Validation failed: Username must be alphanumeric.');
            return "Username must be alphanumeric.";
        }

        const underscoreCount = (newUsername.match(/_/g) || []).length;
        if ((newUsername.length < 7 && underscoreCount > 1) || (newUsername.length >= 7 && underscoreCount > 2)) {
            console.debug('Validation failed: Too many underscores in username.');
            return "Too many underscores in username.";
        }
        return null;
    };

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const userData = localStorage.getItem('user');
            if (!userData) {
                throw new Error('User data not found in local storage. Please log in.');
            }
            const userId = userData ? JSON.parse(userData).user.id : null;
            const result = await authService.updateEmail({ userId, newEmail: email });
            setSuccessMessage(result.message);
            // Update local storage
            const user = JSON.parse(userData).user;
            user.email = email;
            user.normalizedEmail = email.toUpperCase();
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            setError(error as string || 'Failed to update email: (Error 500: Internal Server Error)');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateUsername = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateUsername(updatedUsername);
        if (validationError) {
            alert(validationError);
            return;
        }
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        const updatedUser = {
            newUsername: updatedUsername,
            email,
            userId
        };

        try {
            const response = await authService.updateUsername(updatedUser);
            setLoading(false);
            if (response.error) {
                setError(response.error);
            } else {
                setSuccessMessage(response.message);
                setOriginalUsername(updatedUsername);
                // Reset form fields
                setUpdatedUsername('');
                setCurrentPassword('');
                setNewPassword('');
            }
        } catch (error) {
            setLoading(false);
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const userData = localStorage.getItem('user');
            const userId = userData ? JSON.parse(userData).user.id : null;
            const result = await authService.updatePassword({ userId, currentPassword, newPassword });
            setSuccessMessage(result.message);
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            setError(error as string || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const tabButtonClass = (isActive: boolean) => `
        flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 w-full sm:w-auto
        ${isActive
            ? 'bg-info/10 text-info dark:bg-info-dark/20 dark:text-info-light border-l-4 border-info dark:border-info-light'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'}
    `;

    const inputClass = `
        w-full p-3 rounded-lg
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        focus:ring-2 focus:ring-info/20 dark:focus:ring-info-light/20
        focus:border-info dark:focus:border-info-light
        text-gray-900 dark:text-gray-100
        placeholder-gray-500 dark:placeholder-gray-400
        transition-all duration-300
        pl-12
    `;

    const buttonClass = `
        w-full sm:w-auto px-8 py-3 rounded-lg
        bg-gradient-to-r from-info to-info-dark
        dark:from-info-dark dark:to-info
        text-white font-medium
        transition-all duration-300
        hover:shadow-lg hover:scale-[1.02]
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:scale-100 disabled:hover:shadow-none
    `;

    return (
        <Layout header={
            <div className="text-center bg-gradient-to-r from-info/5 to-info-dark/5 dark:from-info-dark/5 dark:to-info/5 p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Account Settings</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account preferences and security settings</p>
            </div>
        }>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-8">
                    {/* Sidebar Navigation */}
                    <nav className="space-y-2 gap-8 rounded-xl shadow-sm p-6 border-r-8 border-focus">
                        <button
                            onClick={() => { setActiveTab('email'); handleResetEmailUsername(); }}
                            className={tabButtonClass(activeTab === 'email')}
                            disabled={loading}
                        >
                            <FaEnvelope className="text-xl" />
                            <span>Email Settings</span>
                        </button>
                        <button
                            onClick={() => { setActiveTab('username'); handleResetEmailUsername(); }}
                            className={tabButtonClass(activeTab === 'username')}
                            disabled={loading}
                        >
                            <FaUser className="text-xl" />
                            <span>Username</span>
                        </button>
                        <button
                            onClick={() => { setActiveTab('password'); handleResetEmailUsername(); }}
                            className={tabButtonClass(activeTab === 'password')}
                            disabled={loading}
                        >
                            <FaKey className="text-xl" />
                            <span>Password</span>
                        </button>
                    </nav>

                    {/* Main Content */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border-l-8 border-focus">
                        {activeTab === 'email' && (
                            <form onSubmit={handleUpdateEmail} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <FaUndo
                                            onClick={handleResetEmailUsername}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-info dark:text-info-light cursor-pointer hover:scale-110 transition-transform"
                                            title="Reset to original"
                                        />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className={inputClass}
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className={buttonClass}>
                                    {loading ? 'Updating...' : 'Update Email'}
                                </button>
                            </form>
                        )}

                        {activeTab === 'username' && (
                            <form onSubmit={handleUpdateUsername} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <FaUndo
                                            onClick={handleResetEmailUsername}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-focus dark:text-focus-light cursor-pointer hover:scale-110 transition-transform"
                                            title="Reset to original"
                                        />
                                        <input
                                            type="text"
                                            value={updatedUsername}
                                            onChange={(e) => setUpdatedUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            className={inputClass}
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className={buttonClass}>
                                    {loading ? 'Updating...' : 'Update Username'}
                                </button>
                            </form>
                        )}

                        {activeTab === 'password' && (
                            <form onSubmit={handleUpdatePassword} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Enter current password"
                                            className={inputClass}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password"
                                            className={inputClass}
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className={buttonClass}>
                                    {loading ? 'Updating...' : 'Update Password'}
                                </button>
                            </form>
                        )}

                        {/* Messages */}
                        <div className="mt-6 space-y-4">
                            {successMessage && (
                                <div className="p-4 rounded-lg bg-success/10 dark:bg-success-dark/10 border border-success/20 dark:border-success-dark/20">
                                    <p className="text-sm font-medium text-success-dark dark:text-success-light flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {successMessage}
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="p-4 rounded-lg bg-danger/10 dark:bg-danger-dark/10 border border-danger/20 dark:border-danger-dark/20">
                                    <p className="text-sm font-medium text-danger-dark dark:text-danger-light flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        {error}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AccountSettings;
