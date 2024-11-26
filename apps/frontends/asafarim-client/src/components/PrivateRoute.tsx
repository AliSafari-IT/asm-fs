// src/components/PrivateRoute.tsx

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const user = localStorage.getItem('user');
  
    return user ? children : <Navigate to="/login" />;
  };

  export default PrivateRoute;
  