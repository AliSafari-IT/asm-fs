import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../api/userService';
import { IUser } from '../../interfaces/IUser';
import Wrapper from '../../layout/Wrapper/Wrapper';
import Footer from '../../layout/Footer/Footer';
import Header from '@/layout/Header/Header';

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
    <Wrapper
      header={<Header children={<h1 className="text-2xl font-semibold text-[var(--text-info)]">Edit User</h1>} />}
      footer={<Footer />}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-center text-[var(--text-warning)] mb-4 sm:mb-6">User Management</h1>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-[var(--text-info)] text-sm sm:text-base mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--info)]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[var(--text-info)] text-sm sm:text-base mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--info)]"
                />
              </div>
            </div>

            {/* Admin Status */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isAdmin"
                checked={user.isAdmin}
                onChange={handleInputChange}
                className="w-4 h-4 text-[var(--info)] border-gray-300 rounded focus:ring-[var(--info)]"
              />
              <label className="text-[var(--text-info)] text-sm sm:text-base">Is Admin</label>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              <button
                type="submit"
                className="btn-info py-2 px-4 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
              >
                Update User
              </button>
              <button
                type="button"
                onClick={() => navigate('/users')}
                className="btn-danger py-2 px-4 rounded-lg w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default EditUser;
