import React, { useState } from 'react';
import { login, register, LoginModel, RegisterModel } from '../../api/authapi';
import Wrapper from '../../layout/Wrapper/Wrapper';
import AlertContainer from '../../components/AlertContainer';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginModel, setLoginModel] = useState<LoginModel>({ usernameOrEmail: '', password: '' });
  const [registerModel, setRegisterModel] = useState<RegisterModel>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // use for redirection after login or registration

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await login(loginModel);
      console.log('Login successful!');
      setError(null);
      // Save token to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      // Optionally redirect to a dashboard or home page after login
      navigate('/');
    } catch (error) {
      const errMsg = error as string | { message: string };
      console.log("Login failed:", errMsg);
      setError(errMsg as string);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await register(registerModel);
      console.log('Registration successful!');
      setError(null);
      // Save token to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      // Optionally redirect to a dashboard or home page after registration
      navigate('/');
    } catch (error) {
      const errMsg = error as string | { message: string };
      console.log("Registration failed:", errMsg);
      setError(errMsg as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper header={<div className="w-full text-center py-8 text-2xl border z-10">{isLogin ? 'Login' : 'Register'}</div>}>
      <AlertContainer theme="info" className="w-1/2 mx-auto my-10 px-4 py-3 rounded relative">
        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="flex flex-col items-center justify-center space-y-4">
            {/* Input for username or email */}
            <div className="w-full max-w-xs">
              <label htmlFor="usernameOrEmail" className="block mb-2 font-bold">Username or Email:</label>
              <input
                type="text"
                value={loginModel.usernameOrEmail}
                onChange={(e) => setLoginModel({ ...loginModel, usernameOrEmail: e.target.value })}
                placeholder="Add your username or email"
                className="p-2 border rounded-md w-full max-w-xs"
                required
              />
            </div>

            {/* Input for password */}
            <div className='w-full max-w-xs'>
              <label htmlFor="password" className='block mb-2 font-bold'>Password:</label>
              <input
                type="password"
                value={loginModel.password}
                onChange={(e) => setLoginModel({ ...loginModel, password: e.target.value })}
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

            {/* Login button */}
            <button
              type="submit" // Change to type="submit" to trigger form submission
              disabled={loading}
              className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="flex flex-col items-center justify-center space-y-4">
            {/* Input for email */}
            <div className="w-full max-w-xs">
              <label htmlFor="email" className="block mb-2 font-bold">Email:</label>
              <input
                type="email"
                value={registerModel.email}
                onChange={(e) => setRegisterModel({ ...registerModel, email: e.target.value })}
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
                value={registerModel.password}
                onChange={(e) => setRegisterModel({ ...registerModel, password: e.target.value })}
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
        )}

        {/* Toggle between login and register */}
        <div className="mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? 'New user? Register here' : 'Already have an account? Login here'}
          </button>
        </div>
      </AlertContainer>
    </Wrapper>
  );
};

export default AuthPage;
