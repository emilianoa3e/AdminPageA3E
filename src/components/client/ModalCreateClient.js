import React, { useState } from "react";
import { Modal, Form as FormBt } from "react-bootstrap";
import { Form, Formik } from "formik";
import { TextInput } from "../shared/TextInput";
import { MdTitle, MdCheckCircleOutline } from "react-icons/md";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { saveClient } from "../../utils/clientsFunctions";
import { Button } from "@mui/material";
import * as Yup from "yup";
import FileDropzone from "../shared/Dropzone";
import Colors from "../../utils/Colors";

export const ModalCreateClient = ({ props, show, handleClose, getClients }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const objectSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[0-9a-zA-ZáéíóúÁÉÍÓÚüïüëöñÑ ]+$/,
        "El nombre no puede contener caracteres especiales"
      )
      .required("El nombre es requerido"),
  });

  const handleSubmit = (values, file) => {
    showConfirmDialog(
      "¿Estás seguro de crear este cliente?",
      "Se creará el cliente",
      "Sí, crear cliente",
      "Cancelar",
      () => {
        saveClient(values, file).then(() => {
          getClients();
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
          Registrar cliente
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={objectSchema}
        onSubmit={(values) => handleSubmit(values, uploadedFile)}
      >
        {({ errors, values, touched }) => (
          <Form>
            <Modal.Body>
              <FormBt.Group className="mb-3">
                <TextInput
                  maxLength="50"
                  label="Nombre"
                  name="name"
                  icon={MdTitle}
                  placeholder="Ingrese el nombre del cliente"
                  isInvalid={!!errors.name && touched.name}
                />
              </FormBt.Group>
              <FileDropzone
                uploadedFile={uploadedFile}
                setUploadedFile={setUploadedFile}
                onContext="client"
              />
              <Modal.Footer>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  style={
                    !values.name || !!errors.name || !uploadedFile
                      ? { backgroundColor: Colors.PalletePrimaryLight }
                      : { backgroundColor: Colors.PalletePrimary }
                  }
                  endIcon={<MdCheckCircleOutline />}
                  disabled={!values.name || !!errors.name || !uploadedFile}
                  className="mt-3"
                >
                  Guardar cliente
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
