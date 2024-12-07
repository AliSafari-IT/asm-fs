import { useState } from 'react';
import Wrapper from '../../layout/Wrapper/Wrapper';
import { useNavigate } from 'react-router-dom';
import AlertContainer from '../../components/AlertContainer';
import { AxiosError } from 'axios';
import { login } from '../../api/authapi';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // for redirection after login

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!usernameOrEmail || !password) {
      setError('Username/Email and password are required');
      return;
    }

    setLoading(true);
    setError(null); // Reset error message
    setSuccessMessage(null); // Reset success message

    try {
      const user = await login({ usernameOrEmail, password });
      if (user.token) {
        // Save token to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Logged in successfully, token saved');
        // Set success message
        setSuccessMessage('Login successful!');
        // Optionally redirect to a dashboard or home page after login
        navigate('/');
      }
    } catch (error) {
      const err = error as AxiosError;
      const response = err?.response;

      const status = response?.status;

      if (response && status === 401) {
        setError(`Invalid username/email or password: (Error ${status})`);
      } else {
        console.error('An unexpected error occurred:', error);
        setError('An unexpected error occurred. Please try again later. (Error 500: Internal Server Error)');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper header={<div className="w-full text-center py-8 text-2xl border z-10">Login</div>}>
      <AlertContainer theme="info" className="w-1/2 mx-auto my-10 px-4 py-3 rounded relative">
        <form onSubmit={handleLogin} className="flex flex-col items-center justify-center space-y-4">

          {/* Input for username or email */}
          <div className="w-full max-w-xs">
            <label htmlFor="usernameOrEmail" className="block mb-2 font-bold">Username or Email:</label>
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Display success message */}
          {successMessage && (
            <div className="max-w-xs w-full p-4 mb-2 success border border-green-200 rounded-lg shadow text-center">
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
          )}

          {/* Login button */}
          <div className='w-full flex justify-between items-center space-x-12 max-w-xs'>
            {/* Register link or additional content here */}
                <a href="/register" className="text-sm hover:underline ">
                  Don't have an account? Register here
                </a> 

                 <button
                type="submit"
                disabled={loading}
                className="primary  border border-primary rounded-md primary max-w-xs py-2 px-4"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
          </div>

        </form>
      </AlertContainer>
    </Wrapper>
  );
};

export default LoginPage;
