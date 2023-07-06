import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Card } from "react-bootstrap";
import {
  MdWhatsapp,
  MdEmail,
  MdLocalPhone,
  MdFacebook,
  MdArrowBackIosNew,
  MdAdd,
  MdMode,
  MdDelete,
} from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import {
  getAllContacts,
  deleteContact,
} from "../../../utils/contactsFunctions";
import { ModalCreateContact } from "../../../components/contact/ModalCreateContact";
import { showConfirmDialog } from "../../../shared/plugins/alert";
import { ModalEditContact } from "../../../components/contact/ModalEditContact";
import { Button } from "@mui/material";
import SplashScreen from "../../utils/SplashScreen";
import NotFound from "../../../components/shared/NotFound";
import Colors from "../../../utils/Colors";
import "../../../assets/css/pages/ContactMain.css";

function ContactsMain() {
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contactsList, setContactsList] = useState([
    {
      _id: "",
      type: "",
      contact: "",
    },
  ]);
  const [selectedId, setSelectedId] = useState(null);

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = (id) => {
    setSelectedId(id);
    setShowUpdate(true);
  };

  const getContacts = async () => {
    setIsLoading(true);
    const data = await getAllContacts();
    setContactsList(data.contacts);
    setIsLoading(false);
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleUpdate = (id) => {
    handleShowUpdate(id);
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar este contacto?",
      "Se eliminará el contacto",
      "Sí, eliminar",
      "Cancelar",
      () => {
        deleteContact(id).then(() => {
          getContacts();
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
          <h1 className="contact-title">Contactos</h1>
        </Col>
        <Col xs={12} md={5} lg={4} className="contact-buttons-top">
          <Button
            size="large"
            variant="contained"
            startIcon={<MdArrowBackIosNew size={20} />}
            style={{ backgroundColor: Colors.PalleteGrey }}
            onClick={() => navigate("/contacts-screen")}
            className="me-2"
          >
            Regresar
          </Button>
          <Button
            size="large"
            variant="contained"
            endIcon={<MdAdd size={20} />}
            style={{ backgroundColor: Colors.PalletePrimary }}
            onClick={() => handleShowCreate()}
          >
            Registrar contacto
          </Button>
        </Col>
      </Row>
      {contactsList.length !== 0 ? (
        <Row className="d-flex">
          {contactsList.map((contact) => (
            <Col
              key={contact._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mt-3"
            >
              <Card style={{ border: "none" }}>
                <Card.Body className="text-center">
                  {contact.type === "whatsapp" ? (
                    <MdWhatsapp size={50} color={Colors.PalleteWhatsapp} />
                  ) : contact.type === "email" ? (
                    <MdEmail size={50} color={Colors.PalleteGreenA3E} />
                  ) : contact.type === "phone" ? (
                    <MdLocalPhone size={50} color={Colors.PalleteGreenA3E} />
                  ) : contact.type === "facebook" ? (
                    <MdFacebook size={50} color={Colors.PalleteFacebook} />
                  ) : contact.type === "linkedin" ? (
                    <BsLinkedin size={50} color={Colors.PalleteLinkedin} />
                  ) : null}
                  <Card.Title className="mt-3">{contact.contact}</Card.Title>
                  <Card.Footer style={{ backgroundColor: Colors.PalleteWhite }}>
                    <Button
                      size="small"
                      variant="contained"
                      endIcon={<MdMode size={15} />}
                      style={{
                        fontSize: 12,
                        backgroundColor: Colors.PalletePrimary,
                      }}
                      onClick={() => handleUpdate(contact._id)}
                      className="me-1 mb-1"
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      endIcon={<MdDelete size={15} />}
                      style={{
                        fontSize: 12,
                        backgroundColor: Colors.PalleteDanger,
                      }}
                      onClick={() => handleDelete(contact._id)}
                      className="mb-1"
                    >
                      Eliminar
                    </Button>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <NotFound
          text="No hay contactos registrados"
          textSize={30}
          iconSize={150}
        />
      )}
      <ModalCreateContact
        show={showCreate}
        handleClose={handleCloseCreate}
        getContacts={getContacts}
      />
      <ModalEditContact
        id={selectedId}
        setSelectedId={setSelectedId}
        show={showUpdate}
        handleClose={handleCloseUpdate}
        getContacts={getContacts}
      />
    </Container>
  );
}

export default ContactsMain;
