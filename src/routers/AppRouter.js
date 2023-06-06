import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/shared/Layout'; // Importa tu propio componente Layout
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import OrderInfoCards from '../pages/services/OrderInfoCards';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import EditorWys from '../components/shared/EditorWys';
import Home from '../pages/Home';
import 'bootstrap/dist/css/bootstrap.css';
import Login from '../pages/Auth/Login';
import Loader from '../components/shared/Loader';
import { AuthContext } from '../context/auth/AuthContext';



const AppRouter = () => {
     const { state, renewAuthToken } = useContext(AuthContext);
     const { isLogged, isLoading } = state;

    // useEffect(() => {
    //     renewAuthToken();
    // }, [renewAuthToken]);

    // if (isLoading) {
    //     return <EditorWys/>;
    // }

    //estatic
    //const { isLogged } = false;

    return (
        //  colocar !isLogged para mostrar privadas
        <BrowserRouter>
            {isLogged ? (
                <Layout>
                    {/* Aquí colocar Rutas protegidas*/}
                    <Routes>
                        <Route exact path='/' element={<PrivateRoute />}>
                            <Route exact path='/' element={<Home />} />
                        </Route>
                        <Route exact path='/service' element={<PrivateRoute />}>
                            <Route exact path='/service' element={<OrderInfoCards />} />
                        </Route>
                        <Route exact path='/editor' element={<PrivateRoute />}>
                            <Route exact path='/editor' element={<EditorWys />} />
                        </Route>
                        <Route exact path='/*' element={<Navigate to='/' />} />
                    </Routes>
                </Layout> 
            ) : (

                    <Routes>
                        <Route exact path='/login' element={<PublicRoute />}>
                            <Route exact path='/login' element={<Login/>} />
                        </Route>
                        <Route
                            exact
                            path='/*'
                            element={<Navigate to='/login' replace />}
                        />
                    </Routes>

                
            )
            }
        </BrowserRouter>
    );
};

export default AppRouter;