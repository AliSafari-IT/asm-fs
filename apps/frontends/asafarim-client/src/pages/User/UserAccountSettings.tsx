import React, { useEffect, useState } from 'react';
import { getUserFullInfo } from '../../utils/userUtils';
import UserInfo from '../../interfaces/IUserInfo';
import useAuth from '../../hooks/useAuth';
import ExportData from './ExportData';
import DeleteAccount from './DeleteAccount';
import { updateUser } from '../../api/userService';
import { useNavigate } from 'react-router-dom';

const UserAccountSettings: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated, redirect to home
    if (!user?.email) {
      navigate('/');
      return;
    }

    const fetchUserInfo = async () => {
      if (!user?.email) {
        setError('User is not authenticated.');
        return;
      }
      try {
        const data = await getUserFullInfo(user.email);
        setUserInfo(data);
        setDisplayName(data.fullName || '');
        setBio(data.bio || '');
        console.debug('Fetched user info:', data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch user information:', err);
        setError('Failed to fetch user information.');
        setUserInfo(null);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [user?.email]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (!userInfo?.id) {
        throw new Error('User ID not found');
      }

      // Validate password fields if they are filled
      if (newPassword || confirmPassword || currentPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error('New passwords do not match');
        }
        if (!currentPassword) {
          throw new Error('Current password is required to change password');
        }
        // TODO: Add password change API call here
        // await changePassword(currentPassword, newPassword);
      }

      const updatedUser = {
        id: userInfo.id,
        email: userInfo.email || '',
        fullName: displayName,
        bio: bio,
        isAdmin: userInfo.isAdmin || false,
        userName: userInfo.userName || '',
        userId: userInfo.userId || userInfo.id // Fallback to id if userId is not present
      };

      const result = await updateUser(updatedUser);
      if (result) {
        setSuccessMessage('Changes saved successfully');
        // Refresh user info after successful update
        const refreshedData = await getUserFullInfo(userInfo.email || '');
        setUserInfo(refreshedData);
      } else {
        throw new Error('Failed to save changes');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 p-4 rounded-lg">
        {error}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {userInfo ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Account Settings</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Under GDPR Article 16, you have the right to rectify your personal data.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-primary text-xl font-bold shadow-md">
                {userInfo.userName?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                activeTab === 'profile'
                  ? 'bg-primary-100 text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                activeTab === 'security'
                  ? 'bg-primary-100 text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Security Settings
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                activeTab === 'privacy'
                  ? 'bg-primary-100 text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Privacy Preferences
            </button>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 p-4 rounded-lg">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-200 p-4 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userInfo.email || ''}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Change Password</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Privacy Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage how your information is displayed and used.
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-medium text-gray-700 dark:text-gray-300">
                          Profile Visibility
                        </label>
                        <p className="text-gray-500">Make your profile visible to other users</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-medium text-gray-700 dark:text-gray-300">
                          Email Notifications
                        </label>
                        <p className="text-gray-500">Receive email notifications about account activity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your account settings...</p>
        </div>
      )}
    </div>
  );
};

export default UserAccountSettings;
