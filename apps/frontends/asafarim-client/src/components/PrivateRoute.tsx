import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAuth(); // Replace with your hook or logic to get user state
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
