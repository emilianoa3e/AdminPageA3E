import React, { useState } from "react";
import { Modal, Form as FormBt } from "react-bootstrap";
import { Form, Formik } from "formik";
import { TextInput } from "../shared/TextInput";
import { MdOutlineMail, MdCheckCircleOutline } from "react-icons/md";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { forgotPasswordPost } from "../../utils/AuthFunctions";
import { Button } from "@mui/material";
import * as Yup from "yup";
import Colors from "../../utils/Colors";

export const ModalForgotPass = ({ props, show, handleClose }) => {
  const objectSchema = Yup.object({
    email: Yup.string()
      .email("El correo electrónico no es válido")
      .required("El correo electrónico es requerido"),
  });

  const handleSubmit = (values) => {
    showConfirmDialog(
      "¿Está seguro de que desea enviar el correo electrónico?",
      "Se enviará un correo electrónico para recuperar la contraseña",
      "Enviar",
      "Cancelar",
      () => {
        forgotPasswordPost(values);
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
          Recuperar contraseña
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={objectSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, values, touched }) => (
          <Form>
            <Modal.Body>
              <FormBt.Group>
                <TextInput
                  label="Correo electrónico"
                  name="email"
                  icon={MdOutlineMail}
                  placeholder="Ingrese su correo electrónico"
                  isInvalid={!!errors.email && touched.email}
                />
              </FormBt.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                endIcon={<MdCheckCircleOutline />}
                style={
                  !!errors.email || !values.email
                    ? {
                        backgroundColor: Colors.PalletePrimaryLight,
                      }
                    : {
                        backgroundColor: Colors.PalletePrimary,
                      }
                }
                disabled={!!errors.email || !values.email}
              >
                Enviar correo
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
