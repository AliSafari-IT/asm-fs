import React, { useEffect, useState } from 'react';
import { getUserFullInfo } from '../../utils/userUtils'; // Import the utility function
import UserInfo from '../../interfaces/IUserInfo';


const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserFullInfo(userId);
        setUserInfo(data); // Set the user info in the state
      } catch (err) {
        console.error('Failed to fetch user information:', err);
        setError('Failed to fetch user information.');
      }
    };

    fetchUserInfo();
  }, [userId]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      {userInfo ? (
        <div>
          <h2>User Profile</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Field</th>
                <th className="px-4 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">UserId</td>
                <td className="px-4 py-2">{userInfo.userId}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">UserName</td>
                <td className="px-4 py-2">{userInfo.userName}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Email</td>
                <td className="px-4 py-2">{userInfo.email}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Full Name</td>
                <td className="px-4 py-2">{userInfo.fullName}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Created At</td>
                <td className="px-4 py-2">{userInfo.createdAt}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Updated At</td>
                <td className="px-4 py-2">{userInfo.updatedAt}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Is Admin</td>
                <td className="px-4 py-2">{userInfo.isAdmin ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Is Deleted</td>
                <td className="px-4 py-2">{userInfo.isDeleted ? 'Yes' : 'No'}</td>
              </tr>
              {userInfo.deletedAt && (
                <tr>
                  <td className="px-4 py-2">Deleted At</td>
                  <td className="px-4 py-2">{userInfo.deletedAt}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserProfile;
