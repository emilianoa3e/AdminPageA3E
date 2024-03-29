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
import OurCompany from "../pages/us/OurCompany.js";
import CompanyNews from "../pages/news/CompanyNews";
import CreateService from "../pages/services/CreateService";
import EditService from "../pages/services/EditService";
import BannerMain from "../pages/banners/BannersMain";
import CreateBanner from "../pages/banners/CreateBanner";
import EditBanner from "../pages/banners/EditBanner";
import ClientsMain from "../pages/clients/ClientsMain";
import RenewToken from "./RenewToken";
import ContactsScreen from "../pages/contacts/ContactsScreen";
import ContactsMain from "../pages/contacts/contact/ContactMain";
import SaleMain from "../pages/contacts/sale/SaleMain";
import InternMain from "../pages/contacts/intern/InternMain";
import VacancieMain from "../pages/contacts/vacancie/VacancieMain";
import EditNew from "../pages/news/EditNew";
import CreateNew from "../pages/news/CreateNew";
import UserMain from "../pages/users/UserMain";
import CertificationsMain from "../pages/certifications/CertificationsMain";
import CreateCertification from "../pages/certifications/CreateCertification";
import EditCertification from "../pages/certifications/EditCertification";
import ResetPassword from "../pages/Auth/ResetPassword";

const AppRouter = () => {
  const { state, renewAuthToken } = useContext(AuthContext);
  const { isLogged, isLoading, role } = state;

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
          <RenewToken />
          <Routes>
            {(role === "admin" || role === "superadmin") && (
              <>
                <Route exact path="/" element={<PrivateRoute />}>
                  <Route exact path="/" element={<Home />} />
                </Route>
                <Route exact path="/banners" element={<PrivateRoute />}>
                  <Route exact path="/banners" element={<BannerMain />} />
                </Route>
                <Route exact path="/create-banner" element={<PrivateRoute />}>
                  <Route
                    exact
                    path="/create-banner"
                    element={<CreateBanner />}
                  />
                </Route>
                <Route
                  exact
                  path="/banners/edit-banner/:id"
                  element={<PrivateRoute />}
                >
                  <Route
                    exact
                    path="/banners/edit-banner/:id"
                    element={<EditBanner />}
                  />
                </Route>
                <Route exact path="/clients" element={<PrivateRoute />}>
                  <Route exact path="/clients" element={<ClientsMain />} />
                </Route>
                {/* Clients */}
                <Route exact path="/services" element={<PrivateRoute />}>
                  <Route exact path="/services" element={<Services />} />
                </Route>
                <Route
                  exact
                  path="/services/create-service"
                  element={<PrivateRoute />}
                >
                  <Route
                    exact
                    path="/services/create-service"
                    element={<CreateService />}
                  />
                </Route>
                <Route
                  exact
                  path="/services/edit-service/:id"
                  element={<PrivateRoute />}
                >
                  <Route
                    exact
                    path="/services/edit-service/:id"
                    element={<EditService />}
                  />
                </Route>
                {/* <Route exact path="/us" element={<PrivateRoute />}>
                  <Route exact path="/us" element={<OurCompany />} />
                </Route> */}
                {role === "superadmin" && (
                  <Route exact path="/users" element={<PrivateRoute />}>
                    <Route exact path="/users" element={<UserMain />} />
                  </Route>
                )}
                {/* Certifications */}
                <Route exact path="/certifications" element={<PrivateRoute />}>
                  <Route
                    exact
                    path="/certifications"
                    element={<CertificationsMain />}
                  />
                </Route>
                <Route
                  exact
                  path="/certifications/create-certification"
                  element={<PrivateRoute />}
                >
                  <Route
                    exact
                    path="/certifications/create-certification"
                    element={<CreateCertification />}
                  />
                </Route>
                <Route
                  exact
                  path="/certifications/edit-certification/:id"
                  element={<PrivateRoute />}
                >
                  <Route
                    exact
                    path="/certifications/edit-certification/:id"
                    element={<EditCertification />}
                  />
                </Route>
              </>
            )}
            <Route exact path="/news" element={<PrivateRoute />}>
              <Route exact path="/news" element={<CompanyNews />} />
            </Route>
            <Route exact path="/news/create-new/" element={<PrivateRoute />}>
              <Route exact path="/news/create-new/" element={<CreateNew />} />
            </Route>
            <Route exact path="/news/edit-new/:id" element={<PrivateRoute />}>
              <Route exact path="/news/edit-new/:id" element={<EditNew />} />
            </Route>
            <Route exact path="/contacts-screen" element={<PrivateRoute />}>
              <Route
                exact
                path="/contacts-screen"
                element={<ContactsScreen />}
              />
            </Route>
            <Route
              exact
              path="/contacts-screen/contacts"
              element={<PrivateRoute />}
            >
              <Route
                exact
                path="/contacts-screen/contacts"
                element={<ContactsMain />}
              />
            </Route>
            <Route
              exact
              path="/contacts-screen/sales"
              element={<PrivateRoute />}
            >
              <Route
                exact
                path="/contacts-screen/sales"
                element={<SaleMain />}
              />
            </Route>
            <Route
              exact
              path="/contacts-screen/interns"
              element={<PrivateRoute />}
            >
              <Route
                exact
                path="/contacts-screen/interns"
                element={<InternMain />}
              />
            </Route>
            <Route
              exact
              path="/contacts-screen/vacancies"
              element={<PrivateRoute />}
            >
              <Route
                exact
                path="/contacts-screen/vacancies"
                element={<VacancieMain />}
              />
            </Route>
            {role === "reclutador" && (
              <Route
                exact
                path="/*"
                element={<Navigate to="/contacts-screen" />}
              />
            )}
            <Route exact path="/*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route exact path="/login" element={<PublicRoute />}>
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route exact path="/forgot-password/:token" element={<PublicRoute />}>
            <Route
              exact
              path="/forgot-password/:token"
              element={<ResetPassword />}
            />
          </Route>
          <Route exact path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;
