import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import BannerToNavigate from "../../components/shared/BannerToNavigate";

function ContactsScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "A3E P.A. | Contactos";
  }, []);

  return (
    <Container fluid>
      <Col className="mt-5">
        <Row className="mt-4">
          <Col lg={6} className="mb-4">
            <BannerToNavigate
              image="https://res.cloudinary.com/a3e-media/image/upload/v1687451445/del%20home/banner-contactos_s5wgmf.jpg"
              title="Medios de contactos"
              navigate={navigate}
              route="/contacts-screen/contacts"
            />
          </Col>
          <Col lg={6}>
            <BannerToNavigate
              image="https://res.cloudinary.com/a3e-media/image/upload/v1687534600/del%20home/ventas_xddemo.jpg"
              title="Ventas"
              navigate={navigate}
              route="/contacts-screen/sales"
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col lg={6} className="mb-4">
            <BannerToNavigate
              image="https://res.cloudinary.com/a3e-media/image/upload/v1687451758/del%20home/beca_v1snlk.jpg"
              title="Becarios"
              navigate={navigate}
              route="/contacts-screen/interns"
            />
          </Col>
          <Col lg={6} className="mb-4">
            <BannerToNavigate
              image="https://res.cloudinary.com/a3e-media/image/upload/v1687451942/del%20home/vancantes_u1llct.jpg"
              title="Vacantes"
              navigate={navigate}
              route="/contacts-screen/vacancies"
            />
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default ContactsScreen;
