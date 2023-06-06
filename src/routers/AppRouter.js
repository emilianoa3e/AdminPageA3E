import React, { useContext, useEffect, useState } from 'react';
import Loader from '../components/shared/Loader'; // Importa tu propio componente Loader
import Layout from '../components/shared/Layout'; // Importa tu propio componente Layout
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OrderInfoCards from '../pages/services/OrderInfoCards';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import EditorWys from '../components/shared/EditorWys';
import Home from '../pages/services/Home';
import 'bootstrap/dist/css/bootstrap.css';



const AppRouter = () => {
    // const { state, renewAuthToken } = useContext(AuthContext);
    // const { isLogged, isLoading } = useState(true);

    // useEffect(() => {
    //     renewAuthToken();
    // }, [renewAuthToken]);

    // if (isLoading) {
    //     return <Loader />;
    // }

    return (
        <BrowserRouter>
            <Layout>
                {/* Aquí colocar Rutas protegidas*/}
                <Routes>
                    <Route exact path='/home' element={<PrivateRoute />}>
                        <Route exact path='/home' element={<Home/>} />
                    </Route>
                    <Route exact path='/service' element={<PrivateRoute />}>
                        <Route exact path='/service' element={<OrderInfoCards />} />
                    </Route>
                    <Route exact path='/editor' element={<PrivateRoute />}>
                        <Route exact path='/editor' element={<EditorWys />} />
                    </Route>
                </Routes>
            </Layout>
        </BrowserRouter>
        // <Router>
        //     <Routes>
        //         {/* cambar por ruta Home */}
        //         <Route exact path="/" element={<Home/>} /> 
        //         <Route path="/service" element={<OrderInfoCards/>} />
        //         <Route path="/editor" element={<EditorWys/>}/>
        //     </Routes>
        // </Router>
    );
};

export default AppRouter;