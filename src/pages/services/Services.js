import React, { useEffect, useState } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllServices, deleteService } from "../../utils/serviceFunctions";
import { MdAdd, MdMode, MdDelete } from "react-icons/md";
import { Button } from "@mui/material";
import { showConfirmDialog } from "../../shared/plugins/alert";
import Colors from "../../utils/Colors";
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
      subtitle: "",
      summary: "",
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
          getServices()
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
        <Col xs={12} md={7} lg={8}>
          <h1 className="service-title">Servicios</h1>
        </Col>
        <Col xs={12} md={5} lg={4} className="service-buttons-top">
          <Button
            size="large"
            variant="contained"
            endIcon={<MdAdd size={20} />}
            style={{ fontSize: 13, backgroundColor: Colors.PalletePrimary }}
            onClick={() => navigate("/services/create-service")}
          >
            Crear servicio
          </Button>
        </Col>
      </Row>
      {servicesList.length !== 0 ? (
        <Row>
          {servicesList.map((service) => (
            <Col key={service._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="service-card mt-2">
                <Card.Body>
                  <Card.Title
                    className="service-name p-1"
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
                    <Button
                      size="small"
                      variant="contained"
                      endIcon={<MdMode size={15} />}
                      style={{ fontSize: 12, backgroundColor: Colors.PalletePrimary }}
                      onClick={() =>
                        navigate(`/services/edit-service/${service._id}`)
                      }
                      className="me-1"
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      endIcon={<MdDelete size={15} />}
                      style={{ fontSize: 12, backgroundColor: Colors.PalleteDanger }}
                      onClick={() => handleDelete(service._id)}
                    >
                      Eliminar
                    </Button>
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
