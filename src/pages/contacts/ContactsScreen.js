import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import ContactBanner from "../utils/ContactBanner";
import InternBanner from "../utils/InternBanner";
import VacancieBanner from "../utils/VacancieBanner";
import SaleBanner from "../utils/SaleBanner";

function ContactsScreen() {
  return (
    <Container fluid>
      <Col className="mt-5">
        <Row className="mt-4">
          <Col lg={6} className="mt-1">
            <ContactBanner />
          </Col>
          <Col lg={6} className="mt-1">
            <SaleBanner />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col lg={6} className="mt-1">
            <InternBanner />
          </Col>
          <Col lg={6} className="mt-1">
            <VacancieBanner />
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default ContactsScreen;
