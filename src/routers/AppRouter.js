import React, { useContext, useEffect, useState } from 'react';
import Loader from '../components/shared/Loader'; // Importa tu propio componente Loader
import Layout from '../components/shared/Layout'; // Importa tu propio componente Layout
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderInfoCards from '../pages/services/OrderInfoCards';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import App from '../App';


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
        // <BrowserRouter>
        //     {isLogged ? (
        //         <Layout>
        //             {/* Rutas protegidas */}
        //             <Routes>
        //                 <Route exact path='/service' element={<PrivateRoute />}>
        //                     <Route exact path='/service' element={<Loader />} />
        //                 </Route>
        //             </Routes>
        //         </Layout>
        //     ) : (
        //         <Routes>
        //             {/* Rutas públicas */}
        //             {/* <Route path="/login" element={<PublicRoute />} />
        //       <Route path="/reset-pass/:token" element={<PublicRoute />} />
        //       <Route path="/*" element={<Navigate to="/login" replace />} /> */}
        //         </Routes>
        //     )}
        // </BrowserRouter>
        <Router>
            <Routes>
                <Route exact path="/" element={<Loader/>} />
                <Route path="/service" element={<OrderInfoCards/>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;