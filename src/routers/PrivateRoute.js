import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext'; // Importa tu propio AuthContext

const PrivateRoute = ({
  isAutheticated,
  element: Component,
  ...rest
}) => {
  const { state } = useContext(AuthContext);
  const {isLogged} = state 
   

  return isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;