// E:\asm-fs\apps\frontends\asafarim-client\src\pages\User\UsersList.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/IUser';
import { deleteUser, getUsers } from '../../api/userService';
import { getUserFullInfo } from '../../utils/userUtils'; // Import getUserFullInfo
import UserInfo from '../../interfaces/IUserInfo';
import { register } from '../../api/authapi';
import { IRegisterModel } from '../../interfaces/IRegisterModel';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [account, setAccount] = useState<IRegisterModel>();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // To store full user info
  const [error, setError] = useState<string | null>(null); // Error state
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state
  const [loading, setLoading] = useState(false);

  // Fetch users only once on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (err) {
        setError('Failed to load users.');
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      } catch (err) {
        setError('Failed to delete the user.');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (selectedUser) {
      setAccount({
        email: selectedUser.email,
        password: 'Ali+123456/'
      });
    }
  }, [selectedUser]);

  // Fetch selected user info
  const handleUserInfo = useCallback(async (email: string) => {
    setError(null);
    setUserInfo(null); // Clear previous user info
    setSelectedUser(users.find(user => user.email === email) || null);
    setSuccessMessage(null);
    try {
      const data = await getUserFullInfo(email);
      setUserInfo(data);
    } catch (err) {
      setError('Failed to fetch user information.');
      console.error(err);
    }
  }, [users]); // `users` dependency to prevent stale closures


  // Add user to accounts
  const addUserToAccounts = async (model: IRegisterModel) => {
    setLoading(true);
    if (!selectedUser) {
      setError('Please select a user to add to accounts.');
      setLoading(false);
      return;
    }

    model.email = selectedUser.email;
    model.password = 'Ali+123456/';

    try {
      await register(model);
      setLoading(false);
      setSuccessMessage('Registration successful!');
      setError(null);
    } catch (err) {
      setError('Failed to register user.');
      setLoading(false);
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
              {Object.entries(userInfo).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-6 py-3 font-bold">{key}</td>
                  <td className="px-6 py-3">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Error Message */}
      {error && <div className="mt-4 alert alert-danger">
        <div className="text-red-500 mt-4">{error}</div>
        <div className="flex justify-end mt-4 space-x-6">
          <button
            className='subpixel-antialiased bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700'
            onClick={() => addUserToAccounts(account!)}>Add this user to the account list</button>
          <button onClick={() => setError('')}>Close</button>
        </div>
        {loading && <div>Loading...</div>}
      </div>}

       {/* Display success message */}
       {successMessage && (
        <div className="w-full p-4 mb-2 success border border-green-200 rounded-lg shadow text-center mt-5">
          <p className="text-sm font-medium">{successMessage}</p>
          <div>
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">Email</th>
                  <th className="px-6 py-3 text-left text-gray-600">Password</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-3 text-purple-950 font-mono">{account?.email}</td>
                  <td className="px-6 py-3  font-semiboldbold text-black">{account?.password}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
