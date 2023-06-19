import React, { useContext, useEffect } from "react";
import Layout from "../components/shared/Layout";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import "bootstrap/dist/css/bootstrap.css";
import Login from "../pages/Auth/Login";
import { AuthContext } from "../context/auth/AuthContext";
import Loader from "../components/shared/Loader";
import Services from "../pages/services/Services";
import Us from "../pages/us/OurCompany.js";
import News from "../pages/news/CompanyNews";
import OurCompany from "../pages/us/OurCompany.js";
import CompanyNews from "../pages/news/CompanyNews";
import CreateService from "../pages/services/CreateService";
import EditService from "../pages/services/EditService";
import BannerMain from "../pages/banners/BannersMain";
import CreateBanner from "../pages/banners/CreateBanner";

const AppRouter = () => {
  const { state, renewAuthToken } = useContext(AuthContext);
  const { isLogged, isLoading } = state;

  //hace una llamada al método para preguntar por el token, almacenado en LocalStorage
  useEffect(() => {
    renewAuthToken();
  }, [renewAuthToken]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      {isLogged ? (
        <Layout>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
            </Route>
            <Route exact path="/banners" element={<PrivateRoute />}>
              <Route exact path="/banners" element={<BannerMain />} />
            </Route>
            <Route exact path="/create-banner" element={<PrivateRoute />}>
              <Route exact path="/create-banner" element={<CreateBanner />} />
            </Route>
            <Route exact path="/services" element={<PrivateRoute />}>
              <Route exact path="/services" element={<Services />} />
            </Route>
            <Route exact path="/create-service" element={<PrivateRoute />}>
              <Route exact path="/create-service" element={<CreateService />} />
            </Route>
            <Route exact path="/services/:id" element={<PrivateRoute />}>
              <Route exact path="/services/:id" element={<EditService />} />
            </Route>
            <Route exact path="/us" element={<PrivateRoute />}>
              <Route exact path="/us" element={<OurCompany />} />
            </Route>
            <Route exact path="/news" element={<PrivateRoute />}>
              <Route exact path="/news" element={<CompanyNews />} />
            </Route>
            <Route exact path="/profile" element={<PrivateRoute />}>
              <Route exact path="/profile" element={<CompanyNews />} />
            </Route>
            <Route exact path="/*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route exact path="/login" element={<PublicRoute />}>
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route exact path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;
