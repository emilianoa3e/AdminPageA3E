import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Form, Formik } from "formik";
import { Form as FormBt } from "react-bootstrap";
import { TextInput } from "../shared/TextInput";
import { MdTitle } from "react-icons/md";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { saveClient } from "../../utils/clientsFunctions";
import * as Yup from "yup";
import FileDropzone from "../shared/Dropzone";
import CustomButton from "../shared/CustomButton";

export const ModalCreateClient = ({ props, show, handleClose, getClients }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const objectSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
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
        <Modal.Title style={{ textAlign: "center" }}>Crear cliente</Modal.Title>
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
                <CustomButton
                  className="mt-3"
                  type="submit"
                  text="Guardar cliente"
                  color="primary"
                  size="medium"
                  disabled={!values.name || !uploadedFile}
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
