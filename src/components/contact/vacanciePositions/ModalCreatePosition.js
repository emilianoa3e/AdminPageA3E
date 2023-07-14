import React from "react";
import { Modal, Form as FormBt } from "react-bootstrap";
import { Form, Formik } from "formik";
import { showConfirmDialog } from "../../../shared/plugins/alert";
import { savePosition } from "../../../utils/positionsFunctions";
import { MdCheckCircleOutline } from "react-icons/md";
import { Button } from "@mui/material";
import { TextInput } from "../../shared/TextInput";
import * as Yup from "yup";
import Colors from "../../../utils/Colors";

export const ModalCreatePosition = ({
  props,
  show,
  handleClose,
  getPositions,
}) => {
  const objectSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Z áéíóúÁÉÍÓÚüïüëöñÑ]+$/,
        "El nombre no puede contener caracteres especiales"
      )
      .required("El nombre es requerido"),
  });

  const handleSubmit = (values) => {
    showConfirmDialog(
      "¿Está seguro que desea crear el puesto?",
      "Se creará el puesto",
      "Sí, crear",
      "Cancelar",
      () => {
        savePosition(values).then(() => {
          getPositions();
          handleClose();
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
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Crear puesto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={objectSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, values, touched }) => (
              <Form>
                <FormBt.Group className="mb-2">
                  <TextInput
                    maxLength="30"
                    label="Nombre"
                    name="name"
                    placeholder="Ingrese el nombre del puesto"
                    isInvalid={!!errors.name && touched.name}
                  />
                </FormBt.Group>
                <div className="d-flex justify-content-end">
                  <Button
                    className="mt-3"
                    variant="contained"
                    type="submit"
                    size="medium"
                    endIcon={<MdCheckCircleOutline />}
                    style={
                      !!errors.name || !values.name
                        ? {
                            backgroundColor: Colors.PalletePrimaryLight,
                          }
                        : {
                            backgroundColor: Colors.PalletePrimary,
                          }
                    }
                    disabled={!!errors.name || !values.name}
                    onClick={() => handleSubmit(values)}
                  >
                    Guardar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
