import React from "react";
import { Modal } from "react-bootstrap";
import { Avatar, Button } from "@mui/material";
import { MdCheckCircleOutline } from "react-icons/md";
import FileDropzone from "../shared/Dropzone";
import Colors from "../../utils/Colors";

export const ModalPhoto = ({
  props,
  show,
  handleClose,
  photo,
  setPhoto,
  handleSubmitPhoto,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Imagen de perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FileDropzone
          uploadedFile={photo}
          setUploadedFile={setPhoto}
          onContext="profile"
        />
        {photo && (
          <div className="d-flex justify-content-center">
            <Avatar
              alt="Foto de perfil"
              src={photo ? URL.createObjectURL(photo) : "x"}
              sx={{ width: 150, height: 150 }}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="contained"
          onClick={handleSubmitPhoto}
          endIcon={<MdCheckCircleOutline />}
          style={
            photo
              ? { backgroundColor: Colors.PalletePrimary }
              : { backgroundColor: Colors.PalletePrimaryLight }
          }
          disabled={photo ? false : true}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
