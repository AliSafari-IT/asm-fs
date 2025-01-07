import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import useAuth from '@/hooks/useAuth';
import { UserInfo } from '@/interfaces/IUserInfo';

const ExportData: React.FC<{ currentUserInfo: UserInfo | null }> = ({ currentUserInfo }) => {
    const [isExporting, setIsExporting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        console.log('ExportData Component Mounted');
    }, []);

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
            const filename = `${user?.fullName || 'user'}-data-${timestamp}.json`;

            // Create a download link and trigger the download
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            setSuccessMessage(`Data prepared successfully as ${filename}`);

            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);

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
        <div className="w-full max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Export Your Data</h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Download a copy of your personal data</p>
                        </div>
                        {(successMessage || error) && (
                            <div className={`px-4 py-2 rounded-md text-sm ${
                                successMessage 
                                    ? 'bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800/50' 
                                    : 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50'
                            }`}>
                                {successMessage || error}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">What's included in your export?</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-center">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Profile information
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Account settings
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Posts and comments
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Activity history
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button
                            onClick={handleExportData}
                            disabled={isExporting || !currentUserInfo}
                            className={`px-4 py-2 rounded-md ${
                                !currentUserInfo
                                    ? 'bg-info text-info cursor-not-allowed'
                                    : 'bg-info text-info shadow-sm hover:shadow'
                            } transition duration-200`}
                        >
                            {isExporting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Exporting...
                                </span>
                            ) : 'Export My Data'}
                        </Button>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {!currentUserInfo
                                ? 'Loading user data...'
                                : 'Your data will be exported as a JSON file'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportData;
