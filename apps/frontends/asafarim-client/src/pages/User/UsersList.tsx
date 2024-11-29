import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/IUser';
import { deleteUser, getUsers } from '../../api/userService';
import { getUserFullInfo } from '../../utils/userUtils'; // Import getUserFullInfo
import UserInfo from '../../interfaces/IUserInfo';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>(); // To store full user info
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleUserInfo = async (email: string) => {
    try {
      const data = await getUserFullInfo(email); // Fetch full user info by email
      setUserInfo(data); // Set the fetched data
      setSelectedUser(users.find(user => user.email === email) || null); // Find the user info
    } catch (err) {
      setError('Error fetching user info.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">User Management</h1>
      <Link
        to="/users/create"
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mb-4 inline-block"
      >
        Add New User
      </Link>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-gray-600">Email</th>
            <th className="px-6 py-3 text-left text-gray-600">Full Name</th>
            <th className="px-6 py-3 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-3">{user.email}</td>
              <td className="px-6 py-3">{user.fullName}</td>
              <td className="px-6 py-3">
                <Link
                  to={`/users/edit/${user.id}`}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 ml-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUserInfo(user.email)} // Handle UserInfo click
                  className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-700 ml-2"
                >
                  UserInfo
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display the User Info */}
      {userInfo && selectedUser && (
        <div className="mt-8 p-4 border border-gray-200 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">User Information for {selectedUser.fullName}</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <tbody>
              <tr>
                <td className="px-6 py-3 font-bold">UserId</td>
                <td className="px-6 py-3">{userInfo.userId}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-bold">UserName</td>
                <td className="px-6 py-3">{userInfo.userName}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-bold">Email</td>
                <td className="px-6 py-3">{userInfo.email}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-bold">Full Name</td>
                <td className="px-6 py-3">{userInfo.fullName}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-bold">Created At</td>
                <td className="px-6 py-3">{userInfo.createdAt}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-bold">Updated At</td>
                <td className="px-6 py-3">{userInfo.updatedAt}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-bold">Is Admin</td>
                <td className="px-6 py-3">{userInfo.isAdmin ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-bold">Is Deleted</td>
                <td className="px-6 py-3">{userInfo.isDeleted ? 'Yes' : 'No'}</td>
              </tr>
              {userInfo.deletedAt && (
                <tr>
                  <td className="px-6 py-3 font-bold">Deleted At</td>
                  <td className="px-6 py-3">{userInfo.deletedAt}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Error Message */}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default UsersList;
