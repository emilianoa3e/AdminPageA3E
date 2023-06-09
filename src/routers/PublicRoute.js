import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext'; // Importa tu propio AuthContext

const PublicRoute = ({
  isAutheticated,
  element: Component,
  ...rest
}) => {
  const { state } = useContext(AuthContext);
  const {isLogged} = state
 
  
  return isLogged ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;