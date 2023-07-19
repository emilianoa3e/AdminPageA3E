import React, { useCallback } from "react";
import AppRouter from "./routers/AppRouter";
import "../src/assets/css/General.css";
import { loginPost, renewToken } from "./utils/AuthFunctions";
import { useState, useEffect, useReducer } from "react";
import { AuthContext } from "./context/auth/AuthContext";
import { authReducer } from "./context/auth/AuthReducer";
import Loader from "./components/shared/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState({});

  const [state, dispatch] = useReducer(authReducer, {
    isLogged: false,
    id: "",
    fullName: "",
    isLoading: true,
    role: "",
  });

  const renewAuthToken = useCallback(() => {
    setIsLoading(true);
    renewToken(dispatch);
    setIsLoading(false);
  }, []);

  //hace llamada con los datos recogidos en Login.js
  const login = async (email, password) => {
    dispatch({
      type: "IS_LOADING",
      payload: true,
    });

    try {
      const data = await loginPost(email, password);
      const token = data?.token;

      if (token) {
        localStorage.setItem("token", token);
        dispatch({
          type: "LOGIN",
          payload: {
            fullName: data.fullName,
            id: data.id,
            email: data.email,
            role: data.role,
          },
        });
      } else {
        dispatch({
          type: "LOGOUT",
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: "IS_LOADING",
      payload: false,
    });
  };

  const logout = () => {
    dispatch({
      type: "IS_LOADING",
      payload: true,
    });

    localStorage.removeItem("token");

    dispatch({
      type: "LOGOUT",
    });

    dispatch({
      type: "IS_LOADING",
      payload: false,
    });
  };

  useEffect(() => {
    setAuthState(state);
  }, [state]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          state,
          login,
          authState,
          logout,
          renewAuthToken,
        }}
      >
        <AppRouter />
      </AuthContext.Provider>
    </>
  );
}

export default App;
