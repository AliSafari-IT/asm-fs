// E:\asm-fs\apps\frontends\asafarim-client\src\pages\User\UsersList.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/IUser';
import { deleteUser, getUsers } from '../../api/userService';
import { getUserFullInfo } from '../../utils/userUtils'; // Import getUserFullInfo
import { register } from '../../api/authapi';
import { IRegisterModel } from '../../interfaces/IRegisterModel';
import Wrapper from '../../layout/Wrapper/Wrapper';
import Footer from '../../layout/Footer/Footer';
import Header from '@/layout/Header/Header';
import { EditSvgIcon } from '@/assets/SvgIcons/EditSvgIcon';
import { UserInfoSvgIcon } from '@/assets/SvgIcons/UserInfoSvgIcon';
import { DeleteSvgIcon } from '@/assets/SvgIcons/DeleteSvgIcon';
import { UserInfo } from '../../interfaces/IUserInfo';

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
    <Wrapper
      header={<Header children={<h1 className="text-2xl font-semibold text-[var(--text-info)]">Users List</h1>} />}
      footer={<Footer />}
    >
      <div className="max-w-6xl mx-auto p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-[var(--text-warning)] mb-6">User Management</h1>
        <Link
          to="/users/create"
          className="btn-info py-2 px-4 rounded-lg hover:bg-blue-700 mb-4 inline-block"
        >
          {/* Add Icon for "Create User" */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="ml-2">Create User</span>
        </Link>
        <table className="min-w-full shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-info">Email</th>
              <th className="px-6 py-3 text-left text-info">Full Name</th>
              <th className="px-6 py-3 text-left text-info">Actions</th>
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
                    className="cursor-pointer mr-2 inline-block"
                    title='Edit User'
                  >
                    {EditSvgIcon}
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="cursor-pointer mr-2 inline-block text-danger"
                    title='Delete User'
                  >
                    {DeleteSvgIcon}
                  </button>
                  <button
                    onClick={() => handleUserInfo(user.email)} // Handle UserInfo click
                    className="cursor-pointer mr-2 inline-block text-info"
                    title='User Info'
                  >
                    {/* UserInfo svg icon */}
                    {UserInfoSvgIcon}
               
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Display the User Info */}
        {userInfo && selectedUser && (
          <div className="mt-8 p-4 border border-yellow-600 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">User Information for {selectedUser.fullName}</h2>
            <table className="min-w-full shadow-md rounded-lg table-auto tabular-nums">
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
    </Wrapper>);
};

export default UsersList;
