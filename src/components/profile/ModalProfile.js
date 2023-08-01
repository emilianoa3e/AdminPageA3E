import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { Button, Avatar } from "@mui/material";
import { SpeedDial } from "primereact/speeddial";
import { MdKey, MdMode, MdQuestionMark } from "react-icons/md";
import { ModalConfirm } from "./ModalConfirm";
import { ModalChangePassword } from "./ModalChangePassword";
import { ModalPhoto } from "./ModalPhoto";
import { showConfirmDialog } from "../../shared/plugins/alert";
import {
  updateUser,
  updatePassword,
  updatePhoto,
  deletePhoto,
} from "../../utils/profileFunctions";
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
  const [showPhoto, setShowPhoto] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const [photo, setPhoto] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const objectSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Z áéíóúÁÉÍÓÚüïüëöñÑ@]+$/,
        "El nombre no puede contener caracteres especiales"
      )
      .required("El nombre es requerido"),
    lastname: Yup.string()
      .matches(
        /^[a-zA-Z áéíóúÁÉÍÓÚüïüëöñÑ@]+$/,
        "El apellido no puede contener caracteres especiales"
      )
      .required("El apellido es requerido"),
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

  const handleShowPhoto = () => setShowPhoto(true);
  const handleClosePhoto = () => {
    setPhoto(null);
    setShowPhoto(false);
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

  const handleSubmitPhoto = () => {
    showConfirmDialog(
      "¿Está seguro que desea actualizar su foto de perfil?",
      "Se actualizará su foto de perfil",
      "Si, actualizar",
      "Cancelar",
      () => {
        updatePhoto(userData._id, photo).then(() => {
          setPhoto(null);
          handleClosePhoto();
          getUserProfile();
        });
      }
    );
  };

  const handleDeletePhoto = () => {
    showConfirmDialog(
      "¿Está seguro que desea eliminar su foto de perfil?",
      "Se eliminará su foto de perfil",
      "Si, eliminar",
      "Cancelar",
      () => {
        deletePhoto(userData._id).then(() => {
          setPhoto(null);
          handleClosePhoto();
          getUserProfile();
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
                  <Col lg={4}>
                    <div className="d-flex justify-content-center">
                      <Avatar
                        alt={userData.name}
                        src={userData.photo ? userData.photo : "x"}
                        sx={{ width: 180, height: 180, fontSize: 80 }}
                      />
                      <SpeedDial
                        style={{ position: "absolute", bottom: 60, left: 180 }}
                        buttonStyle={{ width: 35, height: 35 }}
                        buttonClassName="p-button-secondary"
                        showIcon={<MdMode size={22} />}
                        onClick={handleShowPhoto}
                      />
                    </div>
                  </Col>
                  <Col lg={8} className="mt-2">
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
      <ModalPhoto
        show={showPhoto}
        handleClose={handleClosePhoto}
        photo={photo}
        setPhoto={setPhoto}
        handleSubmitPhoto={handleSubmitPhoto}
        handleDeletePhoto={handleDeletePhoto}
        isPhoto={userData.photo ? true : false}
      />
    </>
  );
};
