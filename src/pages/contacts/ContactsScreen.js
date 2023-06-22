import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import ContactBanner from "../utils/ContactBanner";
import InternBanner from "../utils/InternBanner";
import VacancieBanner from "../utils/VacancieBanner";

function ContactsScreen() {
  return (
    <Container>
      <Col className="mt-5">
        <ContactBanner />
        <Row className="mt-4">
          <Col lg={6}>
          <InternBanner />
          </Col>
          <Col lg={6}>
            <VacancieBanner />
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default ContactsScreen;
