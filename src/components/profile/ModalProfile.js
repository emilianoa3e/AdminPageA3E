import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { Button } from "@mui/material";
import { MdKey, MdMode, MdQuestionMark } from "react-icons/md";
import { ModalConfirm } from "./ModalConfirm";
import { ModalChangePassword } from "./ModalChangePassword";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { updateUser, updatePassword } from "../../utils/profileFunctions";
import * as Yup from "yup";
import Colors from "../../utils/Colors";
import ProfileForm from "./ProfileForm";

export const ModalProfile = ({
  props,
  show,
  handleClose,
  handleEdit,
  isEdit,
  setIsEdit,
  userData,
  getUserProfile,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const objectSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    lastname: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("El email no es válido")
      .required("El email es requerido"),
  });

  const handleShowConfirm = () => setShowConfirm(true);
  const handleCloseConfirm = () => {
    setData({});
    setShowPassword(false);
    setShowConfirm(false);
  };

  const handleShowChangePassword = () => setShowChangePassword(true);
  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
    setShowPassword(false);
  };

  const handleSubmitEdit = (values) => {
    showConfirmDialog(
      "¿Está seguro que desea actualizar su información?",
      "Se actualizará su información personal",
      "Si, actualizar",
      "Cancelar",
      () => {
        updateUser(userData._id, values, data).then(() => {
          getUserProfile();
          setIsEdit(false);
          handleCloseConfirm();
          handleClose();
        });
      }
    );
  };

  const handleSubmitUpdatePassword = (values) => {
    showConfirmDialog(
      "¿Está seguro que desea actualizar su contraseña?",
      "Se actualizará su contraseña",
      "Si, actualizar",
      "Cancelar",
      () => {
        updatePassword(userData._id, values).then(() => {
          getUserProfile();
          handleCloseChangePassword();
        });
      }
    );
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-lg"
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
            onSubmit={(values) => {
              if (isEdit) {
                setData(values);
                handleShowConfirm();
              } else {
                handleEdit();
              }
            }}
          >
            {({ errors, values, touched, isValid }) => (
              <Form>
                <Row className="mt-2">
                  <Col className="col-4">
                    <div className="d-flex justify-content-center">
                      {userData.gender === "M" ? (
                        <img
                          src="https://www.w3schools.com/howto/img_avatar.png"
                          alt="Avatar"
                          className="rounded-circle"
                          style={{ width: "180px", height: "180px" }}
                        />
                      ) : (
                        <img
                          src="https://www.w3schools.com/howto/img_avatar2.png"
                          alt="Avatar"
                          className="rounded-circle mt-3"
                          style={{ width: "180px", height: "180px" }}
                        />
                      )}
                    </div>
                  </Col>
                  <Col className="col-8">
                    <ProfileForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      isEdit={isEdit}
                    />
                    {isEdit && (
                      <div className="d-flex justify-content-end">
                        <Button
                          className="mt-3"
                          variant="contained"
                          size="medium"
                          type="submit"
                          endIcon={<MdQuestionMark />}
                          style={
                            !isValid
                              ? { backgroundColor: Colors.PalletePrimaryLight }
                              : { backgroundColor: Colors.PalleteWarning }
                          }
                          disabled={!isValid}
                        >
                          Confirmar cambios
                        </Button>
                      </div>
                    )}
                    {!isEdit && (
                      <div className="d-flex justify-content-end">
                        <Button
                          className="mt-3 me-2"
                          variant="contained"
                          size="medium"
                          endIcon={<MdKey />}
                          style={{ backgroundColor: Colors.PalleteGrey }}
                          onClick={handleShowChangePassword}
                        >
                          Cambiar contraseña
                        </Button>
                        <Button
                          className="mt-3"
                          variant="contained"
                          size="medium"
                          endIcon={<MdMode />}
                          style={{ backgroundColor: Colors.PalletePrimary }}
                          onClick={handleEdit}
                        >
                          Editar
                        </Button>
                      </div>
                    )}
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <ModalConfirm
        show={showConfirm}
        handleClose={handleCloseConfirm}
        handleSubmit={handleSubmitEdit}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
      />
      <ModalChangePassword
        show={showChangePassword}
        handleClose={handleCloseChangePassword}
        handleSubmit={handleSubmitUpdatePassword}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
      />
    </>
  );
};
