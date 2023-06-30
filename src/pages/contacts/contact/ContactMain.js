import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Card } from "react-bootstrap";
import { MdWhatsapp, MdEmail, MdLocalPhone, MdFacebook } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import {
  getAllContacts,
  deleteContact,
} from "../../../utils/contactsFunctions";
import CustomButton from "../../../components/shared/CustomButton";
import SplashScreen from "../../utils/SplashScreen";
import NotFound from "../../../components/shared/NotFound";
import { ModalCreateContact } from "../../../components/contact/ModalCreateContact";
import { showConfirmDialog } from "../../../shared/plugins/alert";
import { ModalEditContact } from "../../../components/contact/ModalEditContact";
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
        <Col xs={12} md={10}>
          <h1 className="contact-title">Contactos</h1>
        </Col>
        <Col xs={12} md={2} className="contact-buttons-top">
          <CustomButton
            text="Regresar"
            color="secondary"
            size="medium"
            onClick={() => navigate("/contacts-screen")}
            className="me-2"
          />
          <CustomButton
            text="Registrar contacto"
            color="primary"
            size="medium"
            onClick={() => handleShowCreate()}
          />
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
                    <MdWhatsapp size={50} color="#25D366" />
                  ) : contact.type === "email" ? (
                    <MdEmail size={50} color="#00743B" />
                  ) : contact.type === "phone" ? (
                    <MdLocalPhone size={50} color="#00743B" />
                  ) : contact.type === "facebook" ? (
                    <MdFacebook size={50} color="#4267B2" />
                  ) : contact.type === "linkedin" ? (
                    <BsLinkedin size={50} color="#0e76a8" />
                  ) : null}
                  <Card.Title className="mt-3">{contact.contact}</Card.Title>
                  <Card.Footer style={{ backgroundColor: "#fff" }}>
                    <CustomButton
                      className="mt-2 me-1"
                      text="Editar"
                      color="primary"
                      size="small"
                      onClick={() => handleUpdate(contact._id)}
                    />
                    <CustomButton
                      className="mt-2"
                      text="Eliminar"
                      color="danger"
                      size="small"
                      onClick={() => handleDelete(contact._id)}
                    />
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
