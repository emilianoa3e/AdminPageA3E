import React from "react";
import { Container } from "react-bootstrap";
import "../../assets/css/components/layouts/layout.css";
import CustomNavbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <CustomNavbar />
      <Container fluid className="mt-3">
        {children}
      </Container>
    </>
  );
}

export default Layout;
