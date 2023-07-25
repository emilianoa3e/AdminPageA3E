import React from "react";
import { Modal, Form as FormBt } from "react-bootstrap";
import { Form, Formik } from "formik";
import { TextInput } from "../shared/TextInput";
import { MdContacts, MdCheckCircleOutline } from "react-icons/md";
import { createContact } from "../../utils/contactsFunctions";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { Button } from "@mui/material";
import { SelectInput } from "../shared/SelectInput";
import * as Yup from "yup";
import Colors from "../../utils/Colors";

export const ModalCreateContact = ({
  props,
  show,
  handleClose,
  getContacts,
}) => {
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

  const destinyOptions =[
    { value: "general", label: "General" },
    { value: "reclutamiento", label: "Reclutamiento" },
    { value: "ventas", label: "Ventas" },
  ]

  const handleSubmit = (values) => {
    showConfirmDialog(
      "¿Estás seguro de crear este contacto?",
      "Se creará el contacto",
      "Sí, crear",
      "Cancelar",
      () => {
        createContact(values).then(() => {
          getContacts();
        });
        handleClose();
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
      <Modal.Header closeButton>
        <Modal.Title style={{ textAlign: "center" }}>
          Crear contacto
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          type: "",
          contact: "",
          destiny: "",
        }}
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
                  Telefono o Whatsapp: 7771234567 | Email: ejemplo@dominio.com |
                  Facebook | Linkedin
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
                    !!errors.contact
                      ? {
                          backgroundColor: Colors.PalletePrimaryLight,
                        }
                      : { backgroundColor: Colors.PalletePrimary }
                  }
                  disabled={
                    !values.type ||
                    !!errors.type ||
                    !values.contact ||
                    !!errors.contact
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
    </Modal>
  );
};
