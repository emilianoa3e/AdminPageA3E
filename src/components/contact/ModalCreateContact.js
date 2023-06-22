import React, { useState } from "react";
import { Modal, Form as FormBt } from "react-bootstrap";
import { Form, Formik } from "formik";
import { TextInput } from "../shared/TextInput";
import { MdContacts } from "react-icons/md";
import { createContact } from "../../utils/contactsFunctions";
import { showConfirmDialog } from "../../shared/plugins/alert";
import * as Yup from "yup";
import CustomButton from "../shared/CustomButton";
import { SelectInput } from "../shared/SelectInput";

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
      /^[0-9a-zA-ZáéíóúÁÉÍÓÚüïüëöñÑ@. ]+$/,
      "El contacto no puede contener caracteres especiales"
    )
    .required("El contacto es requerido"),
  });

  const options = [
    { value: "email", label: "Email" },
    { value: "phone", label: "Teléfono" },
    { value: "whatsapp", label: "Whatsapp" },
    { value: "facebook", label: "Facebook" },
    { value: "linkedin", label: "Linkedin" },
  ];

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
                  Telefono o Whatsapp: 7771234567 | Email: ejemplo@dominio.com
                  | Facebook | Linkedin
                </p>
              </FormBt.Group>
              <Modal.Footer>
                <CustomButton
                  className="mt-3"
                  type="submit"
                  text="Guardar cliente"
                  color="primary"
                  size="medium"
                  disabled={!values.type || !values.contact}
                  onClick={() => {}}
                />
              </Modal.Footer>
            </Modal.Body>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
