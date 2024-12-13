import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import useAuth from '@/hooks/useAuth';
import { CancelSvgIcon } from '@/assets/SvgIcons/CancelSvgIcon';
import { UserInfo } from '@/interfaces/IUserInfo';
import { deleteUserAccount } from '@/utils/userUtils';

const DeleteAccount: React.FC<{ currentUserInfo: UserInfo | null }> = ({ currentUserInfo }) => {
    const [isConfirming, setIsConfirming] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        try {
            setIsConfirming(true);
            setError('');

            if (!currentUserInfo?.id) {
                throw new Error('User ID not found');
            }

            // Delete the account with password
            await deleteUserAccount(currentUserInfo.id, password);

            // Clear user data from localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            // Dispatch auth state change event
            window.dispatchEvent(new Event('authStateChange'));

            // Successfully deleted
            await logout();
            navigate('/');
        } catch (err) {
            console.error('Delete account error:', err);
            setError(err instanceof Error ? err.message : 'An error occurred while deleting the account');
            setTimeout(() => setError(''), 5000);
        } finally {
            setIsConfirming(false);
        }
    };

    if (!isConfirming) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-lg p-6 space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-red-700 dark:text-red-400">Delete Account</h1>
                        <p className="text-red-600 dark:text-red-300">This action cannot be undone.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 border border-red-200 dark:border-red-800/30">
                            <h2 className="font-semibold text-red-700 dark:text-red-400 mb-3">What happens when you delete your account?</h2>
                            <ul className="space-y-2 text-red-600 dark:text-red-300">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>All your personal data will be permanently removed</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Your posts and comments will be deleted</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Your profile information will be erased</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>You will lose access to all your account settings</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-2">
                            <Button
                                onClick={() => setIsConfirming(true)}
                                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white transition-colors duration-200"
                            >
                                I understand, delete my account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-lg p-6 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-red-700 dark:text-red-400">Confirm Account Deletion</h1>
                    <p className="text-red-600 dark:text-red-300">
                        Please enter your password to permanently delete your account
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 border border-red-200 dark:border-red-800/30">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-900 
                                     text-gray-900 dark:text-gray-100 
                                     border-red-200 dark:border-red-800/30
                                     focus:ring-2 focus:ring-red-500 dark:focus:ring-red-600
                                     focus:border-transparent outline-none
                                     placeholder-red-300 dark:placeholder-red-700"
                            placeholder="Enter your password to confirm"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button
                            onClick={handleDeleteAccount}
                            disabled={!password}
                            className={`w-full sm:w-auto ${
                                !password 
                                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
                                    : 'bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600'
                            } text-white transition-colors duration-200`}
                        >
                            Permanently Delete Account
                        </Button>
                        <Button
                            onClick={() => setIsConfirming(false)}
                            className="w-full sm:w-auto border border-gray-300 dark:border-gray-600 
                                     warning hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 
                                     text-gray-800 dark:text-gray-200 transition-colors duration-200
                                     shadow-sm hover:shadow"
                        >
                            <span className="flex items-center justify-center">
                                Cancel <CancelSvgIcon />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
