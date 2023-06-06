import React from "react";

import AppRouter from "./routers/AppRouter";
import '../src/assets/css/General.css'
import { useState, useReducer, useEffect } from "react";
import { authReducer } from "./context/auth/AuthReducer";
import { AuthContext } from "./context/auth/AuthContext";
import Loader from "./components/shared/Loader";
import { loginPost } from "./utils/AuthFunctions";
function App() {

  {
    const [isLoading, setIsLoading] = useState(false);
    const [authState, setAuthState] = useState({});

    //cambiar isLogged para moverte
    const [state, dispatch] = useReducer(authReducer, {
      isLogged: false,
      id: '',
      fullName: '',
      isLoading: false,
      role: '',
    });

    // const renewAuthToken = useCallback(() => {
    //   setIsLoading(true);
    //   renewToken(dispatch);
    //   setIsLoading(false);
    // }, []);

    useEffect(() => {
    	//renewToken(dispatch);
    	setIsLoading(false);
    }, []);

    const updateUserData = (data) => {
      dispatch({
        type: 'UPDATE_USER_DATA',
        payload: {
          fullName: data.fullName,
          email: data.email,
        },
      });
    };

    const login = async (email, password) => {
      dispatch({
        type: 'IS_LOADING',
        payload: true,
      });
      try {
        const data = await loginPost(email, password);
        const token = data.token;
          //console.log('mami perdon')
        if (token) {
          localStorage.setItem('token', token);

          dispatch({
            type: 'LOGIN',
            payload: {
              fullName: data.fullName,
              id: data.id,
              email: data.email,
              role: data.role,
            },
          });
        } else {
          dispatch({
            type: 'LOGOUT',
          });
        }
      } catch (error) {
        // showSimpleAlert(
        //   'Error',
        //   'Error del servidor. Intente más tarde',
        //   'error'
        // );
        console.log('error del servidor')
      }

      dispatch({
        type: 'IS_LOADING',
        payload: false,
      });
    };

    const logout = () => {
      dispatch({
        type: 'IS_LOADING',
        payload: true,
      });

      localStorage.removeItem('token');

      dispatch({
        type: 'LOGOUT',
      });

      dispatch({
        type: 'IS_LOADING',
        payload: false,
      });
    };

    useEffect(() => {
      setAuthState(state);
    }, [state]);


    //
    //console.log(isLoading)
    if (isLoading) {
      return <Loader />;
    }

    return (
      <AuthContext.Provider
        value={{
          state,
          login,
          logout,
          authState,
          updateUserData,
         // renewAuthToken,
        }}
      >
        {/* <AppProvider>
          <AppRouter />
        </AppProvider> */}
        <AppRouter/>
        {/* <ToastContainer limit={1} /> */}
      </AuthContext.Provider>
    );
  }
}

export default App;
