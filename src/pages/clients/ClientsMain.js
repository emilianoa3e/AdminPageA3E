import React, { useState, useEffect } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import { getAllClients, deleteClient } from "../../utils/clientsFunctions";
import { ModalCreateClient } from "../../components/client/ModalCreateClient";
import { showConfirmDialog } from "../../shared/plugins/alert";
import CustomButton from "../../components/shared/CustomButton";
import SplashScreen from "../utils/SplashScreen";
import NotFound from "../../components/shared/NotFound";
import "../../assets/css/pages/Clients.css";

function ClientsMain() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientsList, setClientsList] = useState([
    {
      _id: "",
      name: "",
      image: "",
    },
  ]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getClients = async () => {
    setIsLoading(true);
    const data = await getAllClients();
    setClientsList(data.clients);
    setIsLoading(false);
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar el cliente?",
      "Se eliminará el cliente",
      "Si, eliminar",
      "Cancelar",
      () => {
        deleteClient(id).then(() => {
          getAllClients().then((updatedList) => {
            setClientsList(updatedList.clients);
          });
        });
      }
    );
  };

  useEffect(() => {
    getClients();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col xs={12} md={10}>
          <h1>Clientes</h1>
        </Col>
        <Col xs={12} md={2} className="d-flex justify-content-end">
          <CustomButton
            text="Registrar cliente"
            color="primary"
            size="medium"
            onClick={handleShow}
          />
        </Col>
      </Row>
      {clientsList.length !== 0 ? (
        <Row>
          {clientsList.map((client) => (
            <Col key={client._id} xs={12} sm={6} md={6} lg={3}>
              <Card className="client-card">
                <Card.Img
                  variant="top"
                  src={client.image}
                  className="client-card-img mb-2 p-2"
                />
                <Card.Body className="p-0 mb-2 d-flex flex-column">
                  <Card.Title
                    className="client-name ps-1 pe-1"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {client.name}
                  </Card.Title>
                  <div className="d-flex justify-content-center mb-2">
                    <CustomButton
                      text="Eliminar"
                      color="danger"
                      size="small"
                      onClick={() => handleDelete(client._id)}
                      className="me-2 col-4"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <NotFound
          text="No hay clientes registrados"
          textSize={30}
          iconSize={150}
        />
      )}
      <ModalCreateClient
        show={show}
        handleClose={handleClose}
        getClients={getClients}
      />
    </Container>
  );
}

export default ClientsMain;
