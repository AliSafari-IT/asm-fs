import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '@/layout/Wrapper/Wrapper';
import Footer from '@/layout/Footer/Footer';
import Header from '@/layout/Header/Header';
import { IField, IUserModel } from '@/interfaces';
import { createUser } from '@/api/userManagerApi';
import AddForm from '@/components/crud/AddForm';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Cancel handler to navigate back to the user list
  const handleCancel = () => {
    navigate('/users');
  };
  const fields: IField[] = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter first name', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter last name', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address', required: true },
    { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Enter a short bio' },
    { name: 'profilePicture', label: 'Profile Picture URL', type: 'url', placeholder: 'Enter profile picture URL' },
    { name: 'remark', label: 'Remark', type: 'text', placeholder: 'Enter a remark' },
    { name: 'isDeleted', label: 'Is Deleted', type: 'checkbox', disabled: true },
    { name: 'isAdmin', label: 'Is Admin', type: 'radio', options: [{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }], required: true },
    { name: 'isActive', label: 'Is Active', type: 'checkbox', disabled: true },
    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
    { name: 'createdBy', label: 'Created By (User ID)', type: 'text', disabled: true },
  ];

  // Submit handler to process form data
  const handleSubmit: (formData: Record<string, unknown>) => Promise<void> = async (formData) => {
    try {
      setError(null);

      // Map formData to IUserModel
      const user: IUserModel = {
        id: '',
        firstName: formData.firstName as string,
        lastName: formData.lastName as string,
        email: formData.email as string,
        bio: formData.bio as string,
        profilePicture: formData.profilePicture as string,
        remark: formData.remark as string,
        isDeleted: formData.isDeleted as boolean,
        isAdmin: formData.isAdmin === 'true',
        isActive: formData.isActive as boolean,
        dateOfBirth: formData.dateOfBirth as string,
        createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      };

      // Call createUser API
      await createUser(user)
        .then(() => {
          console.log('User created successfully');
          navigate('/users');
        })
        .catch((error) => {
          console.error('Error creating user:', error);
          setError('Failed to create user. Please try again.');
        });

    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user. Please try again.');
    }
  };


  return (
    <Wrapper
      header={<Header children={<h1 className="w-full text-xl font-bold text-center text-[var(--text-info)]">Add New User</h1>} />}
      footer={<Footer />}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <AddForm entityName="User" fields={fields} submitHandler={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateUser;
