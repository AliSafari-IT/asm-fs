import React, { useState } from 'react';
import { register, RegisterModel } from '../../api/authapi';
import { AxiosError } from 'axios';

const Register: React.FC = () => {
  const [model, setModel] = useState<RegisterModel>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(model);
      console.log('Registration successful:', data);
      // Handle successful registration (e.g., redirect to login)
    } catch (error) {
      const err = error as AxiosError;
      const errObj = err.response?.data as { message: string };
      console.log("Registration failed:", errObj);
      setError(`Registration failed: ${errObj.message}`);
      return errObj;
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
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
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
