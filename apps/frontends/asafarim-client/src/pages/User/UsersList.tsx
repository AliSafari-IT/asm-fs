import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/IUser';
import { deleteUser, getUsers } from '../../api/userService';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
