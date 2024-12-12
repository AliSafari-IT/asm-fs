import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import useAuth from '@/hooks/useAuth';

const ExportData: React.FC = () => {
    const [isExporting, setIsExporting] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const handleExportData = async () => {
        try {
            setIsExporting(true);
            setError('');

            // TODO: Replace with your actual API endpoint
            const response = await fetch('/api/user/export-data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to export data');
            }

            const data = await response.json();
            
            // Create a Blob from the JSON data
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            
            // Create a timestamp for the filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `${user?.username || 'user'}-data-${timestamp}.json`;
            
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
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while exporting data');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Export Your Data</h1>
            
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
                {error && (
                    <p className="text-[var(--text-error)]">{error}</p>
                )}
                
                <Button
                    onClick={handleExportData}
                    disabled={isExporting}
                    className="bg-[var(--bg-primary)] text-white hover:bg-[var(--bg-primary-hover)]"
                >
                    {isExporting ? 'Exporting...' : 'Export My Data'}
                </Button>
                
                <p className="text-sm text-[var(--text-secondary)]">
                    Your data will be exported as a JSON file. The process might take a few moments depending on the amount of data.
                </p>
            </div>
        </div>
    );
};

export default ExportData;
