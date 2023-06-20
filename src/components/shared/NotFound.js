import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { MdCancel } from "react-icons/md";

function NotFound({ text, textSize, iconSize }) {
  return (
    <Container>
      <Row>
        <Col lg={12} className="d-flex justify-content-center">
          <Col>
            <Row>
              <MdCancel
                className="no-services-icon"
                size={iconSize}
                opacity={0.5}
              />
            </Row>
            {text ? (
              <Row>
                <p className="text-center" style={{ opacity: 0.5, fontSize: textSize }}>
                  {text}
                </p>
              </Row>
            ) : (
              <Row>
                <p className="text-center" style={{ opacity: 0.5, fontSize: textSize }}>
                  No hay datos registrados
                </p>
              </Row>
            )}
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
