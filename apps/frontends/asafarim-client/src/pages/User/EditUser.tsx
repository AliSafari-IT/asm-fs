import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../api/userService';
import { IUser } from '../../interfaces/IUser';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const fetchedUser = await getUserById(id);
        setUser(fetchedUser);
      }
    };
    fetchUser();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      const { name, value, type, checked } = e.target;

      if (type === 'checkbox') {
        setUser({ ...user, [name]: checked });
        return;
      }

      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Send only the necessary fields, excluding auto-generated fields like 'id', 'createdAt', 'updatedAt', etc.
      if (!user) return;
      const userToUpdate = {
        ...user,
        email: user.email,
        fullName: user.fullName,
        isAdmin: user.isAdmin, // Ensure this is a boolean
      } as IUser;
  
      // Call the updateUser function (adjust the request data format as needed)
      await updateUser(user.id, userToUpdate); // Assuming updateUser handles the request
  
      navigate('/users'); // Redirect to the user list after successful update
    } catch (error) {
      console.debug('Error updating user:', error);
    }
  };
  

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isAdmin"
            checked={user.isAdmin}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-gray-600">Is Admin</label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
