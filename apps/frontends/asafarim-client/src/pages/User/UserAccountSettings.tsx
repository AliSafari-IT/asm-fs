import React, { useState } from 'react';
import { getUserFullInfo } from '../../utils/userUtils';
import UserInfo from '../../interfaces/IUserInfo';
import { updateUser } from '../../api/userService';

const UserAccountSettings: React.FC<{ currentUserInfo: UserInfo | null; }> = ({ currentUserInfo }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(currentUserInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState(userInfo?.fullName);
  const [bio, setBio] = useState(userInfo?.bio);

  React.useEffect(() => {
    if (currentUserInfo) {
      setUserInfo(currentUserInfo);
      setDisplayName(currentUserInfo.fullName);
      setBio(currentUserInfo.bio);
      setLoading(false);
    }
  }, [currentUserInfo]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (!userInfo?.id || !userInfo.email) {
        throw new Error('User ID or email not found');
      }

      const updatedUser = {
        id: userInfo.id,
        email: userInfo.email, // Ensure email is always present
        fullName: displayName || 'Unknown',
        bio,
        isAdmin: userInfo.isAdmin || false,
        userName: userInfo.userName || '',
        userId: userInfo.userId || userInfo.id, // Fallback to id if userId is not present
        createdAt: userInfo.createdAt || '',
        updatedAt: userInfo.updatedAt || '',
        isDeleted: userInfo.isDeleted || false,
        deletedAt: userInfo.deletedAt || '',
      };

      const result = await updateUser(updatedUser);
      if (result) {
        setSuccessMessage('Changes saved successfully');
        const refreshedData = await getUserFullInfo(userInfo.email);
        setUserInfo(refreshedData);
      } else {
        throw new Error('Failed to save changes');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-300">
          {successMessage}
        </div>
      )}

      {userInfo && (
        <div className="bg-muted rounded-lg shadow-sm border border-info dark:border-info-dark">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">About {userInfo.fullName}</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update your profile information</p>
          </div>
          
          <form onSubmit={handleSaveChanges} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 
                           bg-secondary text-primary
                           focus:ring-2 focus:ring-primary/20 focus:border-primary 
                           placeholder-gray-400 dark:placeholder-gray-500
                           transition duration-200"
                  placeholder="Enter your display name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 
                           bg-secondary text-primary
                           focus:ring-2 focus:ring-primary/20 focus:border-primary 
                           placeholder-gray-400 dark:placeholder-gray-500
                           transition duration-200 resize-none"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-md bg-success hover:bg-success-dark
                         text-success font-medium shadow-sm ring-success
                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                         disabled:opacity-50
                         transition duration-200"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserAccountSettings;
