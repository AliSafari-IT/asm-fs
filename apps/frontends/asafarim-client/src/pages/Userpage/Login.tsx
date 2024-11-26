import React, { useState } from 'react';
import { login, LoginModel } from '../../api/authapi';
import { AxiosError } from 'axios';

const Login: React.FC = () => {
  const [model, setModel] = useState<LoginModel>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(model);
      console.log('Login successful:', data);
      setError(null);
      // Handle successful login (e.g., store token, redirect)
    }catch (error) {
      const err = error as AxiosError;
      const errObj = err.response?.data as { message: string };
      console.log("Login failed:", errObj);
      setError(`Login failed: ${errObj.message}`);
      return errObj;
    }
  };

  return (
    <div>
      <h1>Login Page</h1>      
      {error && <p style={{ color: 'red', fontSize: '14px', margin: '10px', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={model.email}
          onChange={(e) => setModel({ ...model, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={model.password}
          onChange={(e) => setModel({ ...model, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
