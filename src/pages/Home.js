import React from "react";
import BannerHome from "./home/BannerHome";
import ClientHome from "./home/ClientHome";
import { Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <Container>
      <Col lg={12}>
        <Row className="mb-4">
          <BannerHome />
        </Row>
        <Row>
          <ClientHome />
        </Row>
      </Col>
    </Container>
  );
}

export default Home;
