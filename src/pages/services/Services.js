import React, { useEffect, useState } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllServices, deleteService } from "../../utils/serviceFunctions";
import CustomButton from "../../components/shared/CustomButton";
import { showConfirmDialog } from "../../shared/plugins/alert";
import SplashScreen from "../utils/SplashScreen";
import NotFound from "../../components/shared/NotFound";
import "../../assets/css/pages/Services.css";

function Services() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [servicesList, setServicesList] = useState([
    {
      _id: "",
      title: "",
      content: "",
    },
  ]);

  const getServices = async () => {
    setIsLoading(true);
    const data = await getAllServices();
    setServicesList(data.services);
    setIsLoading(false);
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar este servicio?",
      "Se eliminará el servicio",
      "Si, eliminar servicio",
      "Cancelar",
      () => {
        deleteService(id).then(() => {
          getAllServices().then((updatedList) => {
            setServicesList(updatedList.services);
          });
        });
      }
    );
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col xs={12} md={10}>
          <h1>Servicios</h1>
        </Col>
        <Col xs={12} md={2} className="d-flex justify-content-end">
          <CustomButton
            text="Crear servicio"
            color="primary"
            size="medium"
            onClick={() => navigate("/create-service")}
          />
        </Col>
      </Row>
      {servicesList.length !== 0 ? (
        <Row>
          {servicesList.map((service) => (
            <Col key={service._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="service-card">
                <Card.Body>
                  <Card.Title
                    className="service-title p-2"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {service.title}
                  </Card.Title>
                  <div className="d-flex justify-content-center">
                    <CustomButton
                      text="Editar"
                      onClick={() => navigate(`/services/${service._id}`)}
                      size="medium"
                      color="primary"
                      className="me-2 col-6"
                    />
                    <CustomButton
                      text="Eliminar"
                      onClick={() => handleDelete(service._id)}
                      size="medium"
                      color="danger"
                      className="me-2 col-6"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <NotFound
          text="No hay servicios registrados"
          textSize={30}
          iconSize={150}
        />
      )}
    </Container>
  );
}

export default Services;
