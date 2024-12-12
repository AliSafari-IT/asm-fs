import React, { useEffect, useState } from 'react';
import { getUserFullInfo } from '../../utils/userUtils';
import UserInfo from '../../interfaces/IUserInfo';
import useAuth from '../../hooks/useAuth';
import ExportData from './ExportData';
import DeleteAccount from './DeleteAccount';
import { updateUser } from '../../api/userService';

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
  const user = useAuth();

  useEffect(() => {
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
  }, [user.email]);

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

      const result = await updateUser(userInfo.id, updatedUser);
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Account Settings</h2>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-primary text-xl font-bold shadow-md">
                {userInfo.userName?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Settings Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Profile Settings</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Profile Picture
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-primary text-2xl font-bold shadow-md">
                      {userInfo.userName?.charAt(0).toUpperCase()}
                    </div>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-primary rounded-lg transition-colors shadow-sm">
                      Change Picture
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Id
                  </label>
                  <input
                    type="text"
                    name='id'
                    readOnly
                    disabled
                    value={userInfo.id}
                    className='block w-full text-xs text-center px-1 m-auto py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors cursor-not-allowed'
                  />
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name='fullName'
                    className="mt-1 block w-full px-1 m-auto py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Bio</label>
                  <textarea
                    className="mt-1 block w-full px-1 m-auto py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    rows={3}
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Security Settings Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Security Settings</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-1 m-auto py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">New Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-1 m-auto py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-1 m-auto py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Success/Error Messages */}
            {successMessage && (
              <div className="col-span-1 md:col-span-2">
                <div className="bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-200 p-4 rounded-lg">
                  {successMessage}
                </div>
              </div>
            )}
            {error && (
              <div className="col-span-1 md:col-span-2">
                <div className="bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 p-4 rounded-lg">
                  {error}
                </div>
              </div>
            )}

            {/* Save Changes Button */}
            <div className="col-span-1 md:col-span-2">
              <button
                onClick={handleSaveChanges}
                type="submit"
                disabled={loading}
                className="w-full px-10 py-3 btn-success hover:btn-info rounded-lg transition-colors font-semibold shadow-md disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {/* Account Management */}
            <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Account Management</h3>
              <div className="space-y-6">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Export Your Data</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Download a copy of your personal data</p>
                  <ExportData />
                </div>
                <div className="p-4 border border-red-200 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-900/10">
                  <h4 className="text-md font-medium text-red-700 dark:text-red-400 mb-2">Delete Account</h4>
                  <p className="text-sm text-red-600 dark:text-red-300 mb-4">Permanently delete your account and all associated data</p>
                  <DeleteAccount />
                </div>
              </div>
            </div>


          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserAccountSettings;
