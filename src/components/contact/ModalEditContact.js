import React, { useState, useEffect } from "react";
import { Modal, Form as FormBt } from "react-bootstrap";
import { Form, Formik } from "formik";
import { TextInput } from "../shared/TextInput";
import { MdContacts, MdCheckCircleOutline } from "react-icons/md";
import { updateContact, getContactById } from "../../utils/contactsFunctions";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { Button } from "@mui/material";
import { SelectInput } from "../shared/SelectInput";
import Colors from "../../utils/Colors";
import SplashScreen from "../../pages/utils/SplashScreen";
import * as Yup from "yup";

export const ModalEditContact = ({
  props,
  id,
  setSelectedId,
  show,
  handleClose,
  getContacts,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [contact, setContact] = useState({
    type: "",
    contact: "",
    destiny: "",
  });
  

  useEffect(() => {
    if (id !== null) {
      setIsLoading(true);
      const getContact = async () => {
        const data = await getContactById(id);
        setContact(data.contact);
        setIsLoading(false);
      };

      getContact();
    }
  }, [id]);
console.log(contact);
  const objectSchema = Yup.object({
    type: Yup.string().required("El tipo de contacto es requerido"),
    contact: Yup.string()
      .matches(
        /^[0-9a-zA-Z áéíóúÁÉÍÓÚüïüëöñÑ@._-]+$/,
        "El contacto no puede contener caracteres especiales"
      )
      .required("El contacto es requerido"),
    destiny: Yup.string().required("El destino de contacto es requerido"),
  });

  const options = [
    { value: "email", label: "Email" },
    { value: "phone", label: "Teléfono" },
    { value: "whatsapp", label: "Whatsapp" },
    { value: "facebook", label: "Facebook" },
    { value: "linkedin", label: "Linkedin" },
  ];

  const destinyOptions = [
    { value: "general", label: "General" },
    { value: "reclutamiento", label: "Reclutamiento" },
    { value: "ventas", label: "Ventas" },
  ];

  const handleSubmit = (values) => {
    showConfirmDialog(
      "¿Estás seguro de editar este contacto?",
      "Se editará el contacto",
      "Sí, editar",
      "Cancelar",
      () => {
        updateContact(id, values).then(() => {
          getContacts();
        });
        handleClose();
        setSelectedId(null);
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {isLoading ? (
        <SplashScreen />
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: "center" }}>
              Editar contacto
            </Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={{
              type: contact.type,
              contact: contact.contact,
              destiny: contact.destiny
            }}
            enableReinitialize={true}
            validationSchema={objectSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, values, touched }) => (
              <Form>
                <Modal.Body>
                  <FormBt.Group className="mb-3">
                    <SelectInput
                      label="Tipo de contacto"
                      name="type"
                      defaultText="Seleccione un tipo de contacto"
                      options={options}
                      isInvalid={!!errors.type && touched.type}
                    />
                  </FormBt.Group>
                  <FormBt.Group className="mb-3">
                    <TextInput
                      maxLength="50"
                      label="Contacto"
                      name="contact"
                      icon={MdContacts}
                      placeholder="Ingrese el contacto"
                      isInvalid={!!errors.contact && touched.contact}
                    />
                    <p
                      className="text-muted mt-1"
                      style={{ fontSize: 11.5, fontStyle: "italic" }}
                    >
                      Telefono o Whatsapp: 7771234567 | Email:
                      ejemplo@dominio.com | Facebook | Linkedin
                    </p>
                  </FormBt.Group>
                  <FormBt.Group className="mb-3">
                    <SelectInput
                      label="Destino del contacto"
                      name="destiny"
                      defaultText="Seleccione un destino del contacto"
                      options={destinyOptions}
                      isInvalid={!!errors.destiny && touched.destiny}
                    />
                  </FormBt.Group>
                  <Modal.Footer>
                    <Button
                      variant="contained"
                      type="submit"
                      size="medium"
                      endIcon={<MdCheckCircleOutline />}
                      style={
                        !values.type ||
                        !!errors.type ||
                        !values.contact ||
                        !!errors.contact ||
                        !values.destiny ||
                        !!errors.destiny                      
                          ? {
                              backgroundColor: Colors.PalletePrimaryLight,
                            }
                          : { backgroundColor: Colors.PalletePrimary }
                      }
                      disabled={
                        !values.type ||
                        !!errors.type ||
                        !values.contact ||
                        !!errors.contact ||
                        !values.destiny ||
                        !!errors.destiny
                      }
                      className="mt-3"
                    >
                      Guardar contacto
                    </Button>
                  </Modal.Footer>
                </Modal.Body>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Modal>
  );
};
