import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import BannerToNavigate from "../components/shared/BannerToNavigate";

function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <Col lg={12}>
        <Row className="mb-4">
          <BannerToNavigate
            image="https://res.cloudinary.com/a3e-media/image/upload/v1687278597/del%20home/banner_hiv8le.png"
            title="Banners"
            navigate={navigate}
            route="/banners"
          />
        </Row>
        <Row>
          <BannerToNavigate
            image="https://res.cloudinary.com/a3e-media/image/upload/v1687278954/del%20home/71316_b3vemx.png"
            title="Clientes"
            navigate={navigate}
            route="/clients"
          />
        </Row>
      </Col>
    </Container>
  );
}

export default Home;
