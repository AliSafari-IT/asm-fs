import React, { useState } from 'react';
import { register, RegisterModel } from '../../api/authapi';
import { AxiosError } from 'axios';
import Wrapper from '../../layout/Wrapper/Wrapper';
import AlertContainer from '../../components/AlertContainer';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [model, setModel] = useState<RegisterModel>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // use for redirection after registration

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await register(model);
      console.log('Registration successful:', data);
      setError(null);
      // Optionally redirect to login page after registration
      navigate('/login');
    } catch (error) {
      const err = error as AxiosError;
      const errObj = err.response?.data as { message: string };
      console.log("Registration failed:", errObj);
      setError(`Registration failed: ${errObj.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper header={<div className="w-full text-center py-8 text-2xl border z-10">Register</div>}>
      <AlertContainer theme="info" className="w-1/2 mx-auto my-10 px-4 py-3 rounded relative">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-4">
          
          {/* Input for email */}
          <div className="w-full max-w-xs">
            <label htmlFor="email" className="block mb-2 font-bold">Email:</label>
            <input
              type="email"
              value={model.email}
              onChange={(e) => setModel({ ...model, email: e.target.value })}
              placeholder="Add your email"
              className="p-2 border rounded-md w-full max-w-xs"
              required
            />
          </div>

          {/* Input for password */}
          <div className='w-full max-w-xs'>
            <label htmlFor="password" className='block mb-2 font-bold'>Password:</label>
            <input
              type="password"
              value={model.password}
              onChange={(e) => setModel({ ...model, password: e.target.value })}
              placeholder="Add your password"
              className="p-2 border rounded-md w-full max-w-xs"
              autoComplete='current-password'
              required
            />
          </div>

          {/* Display error with alert info style */}
          {error && (
            <div className="max-w-xs w-full p-4 mb-2 danger border border-red-200 rounded-lg shadow text-center">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Register button */}
          <button
            type="submit" // Change to type="submit" to trigger form submission
            disabled={loading}
            className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </AlertContainer>
    </Wrapper>
  );
};

export default Register;