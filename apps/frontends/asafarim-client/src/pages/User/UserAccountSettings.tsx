import React, { useEffect, useState } from 'react';
import { getUserFullInfo } from '../../utils/userUtils';
import UserInfo from '../../interfaces/IUserInfo';
import useAuth from '../../hooks/useAuth';

const UserAccountSettings: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
                    Display Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-1 m-auto py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    defaultValue={userInfo.fullName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Bio</label>
                  <textarea
                    className="mt-1 block w-full px-1 m-auto py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    rows={3}
                    placeholder="Tell us about yourself..."
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">New Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-1 m-auto py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-1 m-auto py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="col-span-1 md:col-span-2">
              <button className="w-full px-10 py-3 bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-primary rounded-lg transition-colors font-semibold shadow-md">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserAccountSettings;
