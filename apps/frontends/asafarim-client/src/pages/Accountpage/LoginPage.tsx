import { useState } from 'react';
import Wrapper from '../../layout/Wrapper/Wrapper';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authapi';
import DeletedAccountMessage from '../../components/DeletedAccountMessage';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usernameOrEmail || !password) {
      setError('Username/Email and password are required');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const user = await login({ usernameOrEmail, password });
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Logged in successfully, token saved');
        const returnTo = localStorage.getItem('returnTo') || '/';
        localStorage.removeItem('returnTo');
        navigate(returnTo);
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error as string;
      
      if (errorMessage.includes('account has been deleted')) {
        setShowDeletedMessage(true);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (showDeletedMessage) {
    return (
      <Wrapper header={<div className="w-full text-center py-8 text-2xl text-primary border-b border-primary z-10">Account Deleted</div>}>
        <DeletedAccountMessage 
          email={usernameOrEmail} 
          onClose={() => setShowDeletedMessage(false)} 
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper header={<div className="w-full text-center py-8 text-2xl text-primary border-b border-primary z-10">Login</div>}>
      <div className="flex items-center justify-center min-h-[calc(100vh-var(--navbar-height)-200px)]">
        <form onSubmit={handleLogin} className="login-form flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto px-4 py-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <div className="w-full">
            <label htmlFor="usernameOrEmail" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Username or Email:
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Enter your username or email"
              className="w-xs px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              required
            />
          </div>

          <div className="w-full">
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-xs px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="w-full p-4 bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="w-full p-4 bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300">
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
          )}

          <div className="w-10/12 flex-col space-y-4 inline-flex justify-center items-end ">
            <button
              type="submit"
              disabled={loading}
              className="w-4/12 py-3 px-4 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center">
              <a href="/register" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Don't have an account? Register here
              </a>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
