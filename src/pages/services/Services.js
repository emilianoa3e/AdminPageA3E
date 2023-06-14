import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllServices } from "../../utils/serviceFunctions";
import CustomButton from "../../components/shared/CustomButton";
import "./Services.css";

function Services() {
  const navigate = useNavigate();
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      const data = await getAllServices();
      setServicesList(data.services);
    };
    getServices();
  }, []);

  return (
    <Container>
      <Row className="mb-4">
        <Col xs={12} md={10}>
          <h1>Servicios</h1>
        </Col>
        <Col xs={12} md={2} className="d-flex justify-content-end">
          <CustomButton
            text="Crear servicio"
            onClick={() => navigate("/create-service")}
          />
        </Col>
      </Row>
      {servicesList.length !== 0 ? (
        <Row>
          {servicesList.map((service) => (
            <Col key={service.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="service-card">
                <Card.Body>
                  <Card.Title className="service-title">
                    {service.title}
                  </Card.Title>
                  <div className="service-buttons">
                    <CustomButton
                      text="Editar"
                      onClick={() => navigate(`/services/${service._id}`)}
                      size="medium"
                      color="primary"
                    />
                    <CustomButton
                      text="Eliminar"
                      size="medium"
                      color="danger"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="no-services-message">No hay servicios</p>
      )}
    </Container>
  );
}

export default Services;
