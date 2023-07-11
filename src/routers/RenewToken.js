import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";

function RenewToken() {
  const { renewAuthToken } = useContext(AuthContext);
  const location = useLocation();
  useEffect(() => {
    // Si el usuario está autenticado y su token ha expirado o está a punto de expirar, renovamos el token
    renewAuthToken();
  }, [location.pathname, renewAuthToken]);

  return null;
}

export default RenewToken;
