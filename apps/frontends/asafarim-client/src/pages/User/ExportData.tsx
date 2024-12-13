import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import useAuth from '@/hooks/useAuth';
import { UserInfo } from '@/interfaces/IUserInfo';

const ExportData: React.FC<{ currentUserInfo: UserInfo | null }> = ({ currentUserInfo }) => {
    const [isExporting, setIsExporting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { user } = useAuth();

    const handleExportData = async () => {
        try {
            if (!currentUserInfo) {
                setError('No user data available to export');
                return;
            }

            setIsExporting(true);
            setError('');
            setSuccessMessage(null);

            // Create a Blob from the JSON data
            const blob = new Blob([JSON.stringify(currentUserInfo, null, 2)], { type: 'application/json' });

            // Create a timestamp for the filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `${user?.fullname || 'user'}-data-${timestamp}.json`;

            // Create a download link and trigger the download
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
            setSuccessMessage('Data exported successfully');

            // Clear success message after 5 seconds
            setTimeout(() => setSuccessMessage(null), 5000);
        } catch (err) {
            console.error('Export failed:', err);
            setError(err instanceof Error ? err.message : 'An error occurred while exporting data');

            // Clear error message after 5 seconds
            setTimeout(() => setError(''), 5000);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">Export Your Data</h1>
                {(successMessage || error) && (
                    <div className={`px-4 py-2 rounded-lg ${successMessage ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}`}>
                        {successMessage || error}
                    </div>
                )}
            </div>

            <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                <h2 className="font-semibold mb-2 text-[var(--text-primary)]">What's included in your export?</h2>
                <ul className="list-disc ml-6 text-[var(--text-secondary)]">
                    <li>Profile information</li>
                    <li>Account settings</li>
                    <li>Posts and comments</li>
                    <li>Activity history</li>
                </ul>
            </div>

            <div className="space-y-4">
                <Button
                    onClick={handleExportData}
                    disabled={isExporting || !currentUserInfo}
                    className={`w-full sm:w-auto ${!currentUserInfo
                            ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700'
                            : 'bg-[var(--bg-primary)] hover:bg-[var(--bg-primary-hover)]'
                        } text-white transition-colors duration-200`}
                >
                    {isExporting ? 'Exporting...' : 'Export My Data'}
                </Button>

                <p className="text-sm text-[var(--text-secondary)]">
                    {!currentUserInfo
                        ? 'Loading user data...'
                        : 'Your data will be exported as a JSON file. Click the button above to start the download.'}
                </p>
            </div>
        </div>
    );
};

export default ExportData;
