import React, { useContext } from "react";
import AppRouter from "./routers/AppRouter";
import '../src/assets/css/General.css'
import { loginPost } from "./utils/AuthFunctions";
import { useState } from "react";
import { AuthContext } from "./context/auth/AuthContext";

function App() {
  const authContext = useContext(AuthContext);
  console.log(authContext)

  // hace llamada con los datos recogidos en Login.js
  // const login = async (email, password) => {

  // 	try {
  // 		const data = await loginPost(email, password);
  // 		const token = data?.token;

  // 		if (token) {
  // 			localStorage.setItem('token', token);
  // 		} else {
  // 			console.log('app.js - no hay token')
  // 		}
  // 	} catch (error) {
  // 		console.log(error)
  // 	}

  // };


  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
