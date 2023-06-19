import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllServices, deleteService } from "../../utils/serviceFunctions";
import CustomButton from "../../components/shared/CustomButton";
import { Toast, showConfirmDialog } from "../../shared/plugins/alert";
import SplashScreen from "../utils/SplashScreen";
import { MdCancel } from "react-icons/md";
import "./Services.css";

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

  useEffect(() => {
    setIsLoading(true);
    const getServices = async () => {
      const data = await getAllServices();
      setServicesList(data.services);
      setIsLoading(false);
    };
    getServices();
  }, []);

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar este servicio?",
      "Se eliminará el servicio",
      "Si, eliminar servicio",
      "Cancelar",
      () => {
        deleteService(id).then((data) => {
          if (data.msg === "Service deleted") {
            Toast.fire({
              icon: "success",
              title: "Servicio eliminado con éxito 😄",
            });
            const newList = servicesList.filter(
              (service) => service._id !== id
            );
            setServicesList(newList);
          }
        });
      }
    );
  };

  if (isLoading) {
    return <SplashScreen isLoading={isLoading} />;
  }

  return (
    <div>
      <Row className="mb-4">
        <Col xs={12} md={10}>
          <h1>Servicios</h1>
        </Col>
        <Col xs={12} md={2} className="d-flex justify-content-end">
          <CustomButton
            text="Crear servicio"
            color="primary"
            size="large"
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
                      onClick={() => handleDelete(service._id)}
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
        <Container>
          <Row>
            <Col xs={12} className="d-flex justify-content-center">
              <Col>
                <Row>
                  <MdCancel
                    size={150}
                    opacity={0.5}
                  />
                </Row>
                <Row>
                  <h3 className="text-center" style={{ opacity: 0.5 }}>
                    No hay servicios registrados
                  </h3>
                </Row>
              </Col>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Services;
