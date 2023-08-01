import React from "react";
import { Form as FormBt, Modal, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { MdCheckCircleOutline, MdHighlightOff } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { TextInput } from "../../components/shared/TextInput";
import { Button } from "@mui/material";
import * as Yup from "yup";
import Colors from "../../utils/Colors";

export const ModalConfirm = ({
  props,
  show,
  handleClose,
  handleSubmit,
  showPassword,
  toggleShowPassword,
}) => {
  const objectSchema = Yup.object({
    password: Yup.string().required("La contraseña es requerida"),
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
          Confirmar cambios
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            password: "",
          }}
          validationSchema={objectSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, values, touched }) => (
            <Form>
              <Row className="mt-2">
                <FormBt.Group className="mb-2">
                  <TextInput
                    label="Contraseña"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
                    icon={showPassword ? IoMdEyeOff : IoMdEye}
                    isInvalid={!!errors.password && touched.password}
                    error={errors.password}
                    onIconClick={toggleShowPassword}
                  />
                </FormBt.Group>
                <div className="mt-2 d-flex justify-content-end">
                  <Button
                    className="me-2"
                    variant="contained"
                    color="error"
                    endIcon={<MdHighlightOff />}
                    onClick={handleClose}
                    style={{ backgroundColor: Colors.PalleteDanger }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={<MdCheckCircleOutline />}
                    disabled={!values.password || !!errors.password}
                    style={
                      !values.password || !!errors.password
                        ? { backgroundColor: Colors.PalletePrimaryLight }
                        : { backgroundColor: Colors.PalleteSuccess }
                    }
                  >
                    Guardar cambios
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
