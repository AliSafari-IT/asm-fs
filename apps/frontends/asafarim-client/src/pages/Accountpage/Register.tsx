import React, { useState } from 'react';
import { register } from '../../api/authapi';
import Wrapper from '../../layout/Wrapper/Wrapper';
import { useNavigate } from 'react-router-dom';
import { IRegisterModel } from '../../interfaces/IRegisterModel';

const Register: React.FC = () => {
  const [model, setModel] = useState<IRegisterModel>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // for redirection after registration

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await register(model);
      console.log('Registration successful:', data);
      setError(null);
      setSuccessMessage('Registration successful!'); // Set success message
      // Optionally redirect to login page after registration
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.log("Registration error:", error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        // Check for duplicate email error
        if (errorMessage.toLowerCase().includes('already')) {
          setError('This email is already associated with an account. Please <a href="/login">log in</a> or use a different email.');
        } else {
          setError(errorMessage);
        }
      } else {
        setError('An unexpected error occurred during registration.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper header={<div className="w-full text-center py-8 text-2xl text-primary border-b border-primary z-10">Register</div>}>
      <div className="flex items-center justify-center min-h-[calc(100vh-var(--navbar-height)-200px)]">
        <form onSubmit={handleSubmit} className="login-form flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto px-4 py-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          {/* Email Input */}
          <div className="w-full">
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={model.email}
              onChange={(e) => setModel({ ...model, email: e.target.value })}
              placeholder="Enter your email"
              className="w-xs px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              required
            />
          </div>

          {/* Password Input */}
          <div className="w-full">
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={model.password}
              onChange={(e) => setModel({ ...model, password: e.target.value })}
              placeholder="Enter your password"
              className="w-xs px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              autoComplete="new-password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="w-full p-4 bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
              <p className="text-sm font-medium" dangerouslySetInnerHTML={{ __html: error }} />
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="w-full p-4 bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300">
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
          )}

          {/* Register button and login link */}
          <div className="w-10/12 flex-col space-y-4 inline-flex justify-center items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-4/12 py-3 px-4 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>

            <div className="text-center">
              <a href="/login" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Already have an account? Login here
              </a>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Register;
