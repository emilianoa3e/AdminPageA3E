import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext'; // Importa tu propio AuthContext

const PublicRoute = () => {
  // const { state } = useContext(AuthContext);
   const { isLogged } = true;
  
  return isLogged ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;