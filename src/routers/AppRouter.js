import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/shared/Layout'; // Importa tu propio componente Layout
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import OrderInfoCards from '../pages/services/OrderInfoCards';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import EditorWys from '../components/shared/EditorWys';
import Home from '../pages/services/Home';
import 'bootstrap/dist/css/bootstrap.css';
import Login from '../pages/Login';



const AppRouter = () => {
    // const { state, renewAuthToken } = useContext(AuthContext);
    // const { isLogged, isLoading } = useState(true);

    // useEffect(() => {
    //     renewAuthToken();
    // }, [renewAuthToken]);

    // if (isLoading) {
    //     return <Loader />;
    // }
    const { isLogged } = true;

    return (
        <BrowserRouter>
            {!isLogged ? (
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
                <Layout>
                    <Routes>
                        <Route exact path='/login' element={<PublicRoute />}>
                            <Route exact path='/login' element={<Login />} />
                        </Route>
                    </Routes>
                    <Route
						exact
						path='/*'
						element={<Navigate to='/login' replace />}
					/>
                </Layout>
            )
            }
        </BrowserRouter>
    );
};

export default AppRouter;