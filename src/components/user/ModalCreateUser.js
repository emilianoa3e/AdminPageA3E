import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { Button } from "@mui/material";
import { MdCheckCircleOutline } from "react-icons/md";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { saveUser } from "../../utils/usersFunctions";
import * as Yup from "yup";
import Colors from "../../utils/Colors";
import UserForm from "./UserForm";

export const ModalCreateUser = ({ props, show, handleClose, getUsers }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const objectSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Z áéíóúÁÉÍÓÚüïüëöñÑ]+$/,
        "El nombre no puede contener caracteres especiales"
      )
      .required("El nombre es requerido"),
    lastname: Yup.string()
      .matches(
        /^[a-zA-Z áéíóúÁÉÍÓÚüïüëöñÑ]+$/,
        "El apellido no puede contener caracteres especiales"
      )
      .required("El apellido es requerido"),
    email: Yup.string()
      .email("El email no es válido")
      .required("El email es requerido"),
    password: Yup.string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres")
      .required("La contraseña es requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("La contraseña es requerida"),
    gender: Yup.string().required("El género es requerido"),
    role: Yup.string().required("El rol es requerido"),
  });

  const optionsGender = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
  ];

  const optionsRole = [
    { value: "admin", label: "Admin" },
    { value: "reclutador", label: "Reclutador" },
  ];

  const handleSubmit = (values) => {
    showConfirmDialog(
      "¿Está seguro de crear este usuario?",
      "Se creará el usuario con los datos ingresados",
      "Si, crear",
      "Cancelar",
      () => {
        saveUser(values).then(() => {
          getUsers();
          handleClose();
        });
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
      dialogClassName="modal-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ textAlign: "center" }}>Crear usuario</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          name: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
          gender: "",
          role: "",
        }}
        validationSchema={objectSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, values, touched, isValid, dirty }) => (
          <Form>
            <Modal.Body>
              <UserForm
                errors={errors}
                values={values}
                touched={touched}
                optionsGender={optionsGender}
                optionsRole={optionsRole}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                endIcon={<MdCheckCircleOutline />}
                style={
                  !isValid || !dirty
                    ? { backgroundColor: Colors.PalletePrimaryLight }
                    : { backgroundColor: Colors.PalletePrimary }
                }
                disabled={!isValid || !dirty}
              >
                Crear usuario
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
