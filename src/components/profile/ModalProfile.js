import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form, Formik } from "formik";
import { Button } from "@mui/material";
import * as Yup from "yup";
import Colors from "../../utils/Colors";
import ProfileForm from "./ProfileForm";

export const ModalProfile = ({
  props,
  show,
  handleClose,
  handleEdit,
  isEdit,
  userData,
}) => {
  const objectSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    lastname: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("El email no es válido")
      .required("El email es requerido"),
  });

  const handleSubmit = (values) => {
    console.log(values);
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
        <Modal.Title id="contained-modal-title-vcenter">Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: userData.name,
            lastname: userData.lastname,
            email: userData.email,
          }}
          enableReinitialize
          validationSchema={objectSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, values, touched, isValid }) => (
            <Form>
              <ProfileForm
                errors={errors}
                values={values}
                touched={touched}
                isEdit={isEdit}
              />
              {isEdit && (
                <Button
                  className="mt-3"
                  type="submit"
                  variant="contained"
                  size="medium"
                  style={
                    !isValid
                      ? { backgroundColor: Colors.PalletePrimaryLight }
                      : { backgroundColor: Colors.PalleteSuccess }
                  }
                  disabled={!isValid}
                >
                  Guardar
                </Button>
              )}
              {!isEdit && (
                <Button
                  className="mt-3"
                  variant="contained"
                  size="medium"
                  style={{ backgroundColor: Colors.PalletePrimary }}
                  onClick={handleEdit}
                >
                  Editar
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
