import React from "react";
import { Modal } from "react-bootstrap";
import { Avatar, Button } from "@mui/material";
import { MdCheckCircleOutline, MdDelete } from "react-icons/md";
import FileDropzone from "../shared/Dropzone";
import Colors from "../../utils/Colors";

export const ModalPhoto = ({
  props,
  show,
  handleClose,
  photo,
  setPhoto,
  handleSubmitPhoto,
  handleDeletePhoto,
  isPhoto,
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
          <div className="d-flex justify-content-center mt-3">
            <Avatar
              alt="Foto de perfil"
              src={photo ? URL.createObjectURL(photo) : "x"}
              sx={{ width: 150, height: 150 }}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isPhoto && (
          <>
            {photo ? null : (
              <Button
                variant="contained"
                onClick={handleDeletePhoto}
                endIcon={<MdDelete />}
                style={{ backgroundColor: Colors.PalleteDanger }}
                className="me-2"
              >
                Eliminar foto
              </Button>
            )}
          </>
        )}
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
