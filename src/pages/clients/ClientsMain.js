import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Card, Container } from "react-bootstrap";
import { getAllClients, deleteClient } from "../../utils/clientsFunctions";
import { ModalCreateClient } from "../../components/client/ModalCreateClient";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { MdAdd, MdDelete, MdArrowBackIosNew } from "react-icons/md";
import { Button } from "@mui/material";
import SplashScreen from "../utils/SplashScreen";
import NotFound from "../../components/shared/NotFound";
import Colors from "../../utils/Colors";
import "../../assets/css/pages/Clients.css";

function ClientsMain() {
  const navigate = useNavigate();
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
      <Row className="mb-2">
        <Col>
          <h3 style={{ fontWeight: "bold" }}>Clientes</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            size="medium"
            variant="contained"
            startIcon={<MdArrowBackIosNew />}
            style={{ backgroundColor: Colors.PalleteGrey }}
            onClick={() => navigate("/home")}
            className="me-2"
          >
            Regresar
          </Button>
          <Button
            size="medium"
            variant="contained"
            endIcon={<MdAdd />}
            style={{ backgroundColor: Colors.PalletePrimary }}
            onClick={handleShow}
          >
            Registrar cliente
          </Button>
        </Col>
      </Row>
      {clientsList.length !== 0 ? (
        <div className="clients-container">
          {clientsList.map((client) => (
            <Col key={client._id} xs={12} sm={7} md={6} lg={4} xl={3}>
              <Card className="client-card">
                <Card.Header className="client-card-header">
                  <Card.Img
                    variant="top"
                    src={client.image}
                    className="client-card-img mb-2"
                  />
                </Card.Header>
                <Card.Body className="p-0 mb-2 d-flex flex-column">
                  <Card.Title
                    className="client-name ps-1 pe-1 mt-2"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {client.name}
                  </Card.Title>
                  <Card.Footer className="client-card-footer">
                    <div className="d-flex justify-content-center mt-2">
                      <Button
                        size="small"
                        variant="contained"
                        endIcon={<MdDelete size={15} />}
                        style={{
                          fontSize: 12,
                          backgroundColor: Colors.PalleteDanger,
                        }}
                        onClick={() => handleDelete(client._id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </div>
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
