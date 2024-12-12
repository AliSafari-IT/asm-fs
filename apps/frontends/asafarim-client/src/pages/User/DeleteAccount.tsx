import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import useAuth from '@/hooks/useAuth';

const DeleteAccount: React.FC = () => {
    const [isConfirming, setIsConfirming] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        try {
            // TODO: Replace with your actual API endpoint
            const response = await fetch('/api/user/delete-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user?.id,
                    password: password
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to delete account');
            }

            await logout();
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    if (!isConfirming) {
        return (
            <div className="max-w-2xl mx-auto p-6 space-y-6">
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">Delete Account</h1>
                <div className="bg-[var(--bg-warning)] text-[var(--text-warning)] p-4 rounded-lg">
                    <h2 className="font-semibold mb-2">Warning: This action cannot be undone</h2>
                    <p>Deleting your account will:</p>
                    <ul className="list-disc ml-6 mt-2">
                        <li>Permanently remove all your data</li>
                        <li>Delete all your posts and comments</li>
                        <li>Remove your profile information</li>
                    </ul>
                </div>
                <Button
                    onClick={() => setIsConfirming(true)}
                    className="bg-[var(--bg-error)] text-white hover:bg-[var(--bg-error-hover)]"
                >
                    I want to delete my account
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Confirm Account Deletion</h1>
            <div className="space-y-4">
                <p className="text-[var(--text-primary)]">
                    Please enter your password to confirm account deletion:
                </p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded bg-[var(--bg-input)] text-[var(--text-primary)] border-[var(--border-primary)]"
                    placeholder="Enter your password"
                />
                {error && (
                    <p className="text-[var(--text-error)]">{error}</p>
                )}
                <div className="flex space-x-4">
                    <Button
                        onClick={handleDeleteAccount}
                        disabled={!password}
                        className="bg-[var(--bg-error)] text-white hover:bg-[var(--bg-error-hover)]"
                    >
                        Permanently Delete Account
                    </Button>
                    <Button
                        onClick={() => setIsConfirming(false)}
                        className="bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary-hover)]"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
