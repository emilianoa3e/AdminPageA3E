import React, { useState } from "react";
import { Modal, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { MdCheckCircleOutline, MdHighlightOff } from "react-icons/md";
import { Button } from "@mui/material";
import * as Yup from "yup";
import Colors from "../../utils/Colors";
import ChangePasswordForm from "./ChangePasswordForm";

export const ModalChangePassword = ({
  props,
  show,
  handleClose,
  handleSubmit,
  showPassword,
  toggleShowPassword,
}) => {
  const objectSchema = Yup.object({
    password: Yup.string().required("La contraseña es requerida"),
    newPassword: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña nueva es requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden")
      .required("Repite la contraseña nueva"),
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cambiar contraseña
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={objectSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, values, touched, isValid, dirty }) => (
            <Form>
              <ChangePasswordForm
                errors={errors}
                values={values}
                touched={touched}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
              />
              <Row className="mt-2">
                <div className="mt-2 d-flex justify-content-end">
                  <Button
                    className="me-2"
                    variant="contained"
                    size="medium"
                    endIcon={<MdHighlightOff />}
                    style={{ backgroundColor: Colors.PalleteDanger }}
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    size="medium"
                    endIcon={<MdCheckCircleOutline />}
                    style={
                      !isValid || !dirty
                        ? { backgroundColor: Colors.PalletePrimaryLight }
                        : { backgroundColor: Colors.PalleteSuccess }
                    }
                    disabled={!isValid || !dirty}
                  >
                    Confirmar
                  </Button>
                </div>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
