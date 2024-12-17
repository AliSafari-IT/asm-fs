import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/userService';
import { IUser } from '../../interfaces/IUser';
import Wrapper from '../../layout/Wrapper/Wrapper';
import Footer from '../../layout/Footer/Footer';
import Header from '@/layout/Header/Header';

const CreateUser: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    id: '', // This can be auto-generated by the backend
    isAdmin: false, // Assuming new users are not admin by default
    email: '',
    fullName: '',
    remark: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send only the necessary fields
      const userToCreate = {
        email: user.email,
        fullName: user.fullName,
        isAdmin: user.isAdmin
        // Exclude fields like id and createdAt since they are either auto-generated or not part of the interface
      };

      await createUser(userToCreate); // Call the service to create the user
      navigate('/users'); // Redirect to the user list after successful creation
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleCancel = () => {
    navigate('/users'); // Redirect to the user list
  };

  const textfieldStyle = 'px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--info)] ';

  return (
    <Wrapper
      header={<Header children={<h1 className="text-2xl font-semibold text-[var(--text-info)]">Create User</h1>} />}
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
                  placeholder="Full Name"
                  value={user.fullName}
                  onChange={handleInputChange}
                  className={textfieldStyle + ' w-full'}
                  required
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
                  className={textfieldStyle + ' w-full'}
                  required
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-[var(--text-info)] text-sm sm:text-base mb-2">Bio</label>
              <textarea
                name="remark"
                value={user.remark}
                onChange={handleInputChange}
                rows={4}
                className={textfieldStyle + ' w-full'}
                required
              />
            </div>

            {/* Admin Status */}
            <div className="flex flex-col sm:flex-row text-[var(--text-info)] gap-18 sm:gap-9 ">
              <label className="block text-[var(--text-info)] text-sm sm:text-base mb-2">Is Admin?</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="isAdminNo"
                  name="isAdmin"
                  value="false"
                  checked={!user.isAdmin}
                  onChange={() => setUser({ ...user, isAdmin: false })}
                  className={textfieldStyle + 'w-4 h-4 mr-2'}
                />
                <label htmlFor="isAdminNo" className="ml-2">No</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="isAdminYes"
                  name="isAdmin"
                  value="true"
                  checked={user.isAdmin}
                  onChange={() => setUser({ ...user, isAdmin: true })}
                  className={textfieldStyle + 'w-4 h-4 mr-2'}
                />
                <label htmlFor="isAdminYes" className="ml-2">Yes</label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              <button
                type="submit"
                className="btn-approve py-2 px-4 w-full sm:w-auto"
              >
                Create User
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-reject py-2 px-4 w-full sm:w-auto"
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

export default CreateUser;
