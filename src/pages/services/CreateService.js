import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { saveService } from "../../utils/serviceFunctions";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { Button } from "@mui/material";
import { MdCheckCircleOutline, MdArrowBackIosNew } from "react-icons/md";
import ServiceForm from "../../components/services/ServiceForm";
import Galery from "../../components/shared/Galery";
import * as yup from "yup";
import "../../assets/css/pages/CreateEditService.css";
import Colors from "../../utils/Colors";

function CreateService() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleSubmit = (values, content) => {
    showConfirmDialog(
      "¿Estás seguro de crear este servicio?",
      "Se creará un nuevo servicio",
      "Si, crear servicio",
      "Cancelar",
      () => {
        saveService(values, content, navigate);
      }
    );
  };

  const objectSchema = yup.object().shape({
    title: yup.string().required("El título es requerido"),
    summary: yup.string().required("El resumen es requerido"),
  });

  return (
    <Container fluid>
      <Row>
        <Col
          md={{ span: 8, offset: 2 }}
          lg={{ span: 3, offset: 0 }}
          className="text-center"
        >
          <Galery />
        </Col>
        <Col md={12} lg={9}>
          <Formik
            initialValues={{
              title: "",
              subtitle: "",
              summary: "",
            }}
            validationSchema={objectSchema}
            onSubmit={(values) => handleSubmit(values, content)}
          >
            {({ errors, values, touched, isValid, dirty }) => (
              <Form>
                <Row className="text-end">
                  <Col className="service-create-buttons-top">
                    <Button
                      variant="contained"
                      size="medium"
                      startIcon={<MdArrowBackIosNew />}
                      style={{ backgroundColor: Colors.PalleteGrey }}
                      onClick={() => navigate("/services")}
                      className="me-2"
                    >
                      Regresar
                    </Button>
                    <Button
                      variant="contained"
                      size="medium"
                      endIcon={<MdCheckCircleOutline />}
                      style={
                        !isValid || !dirty || !content
                          ? { backgroundColor: Colors.PalletePrimaryLight }
                          : { backgroundColor: Colors.PalletePrimary }
                      }
                      type="submit"
                      disabled={!isValid || !dirty || !content}
                    >
                      Guardar
                    </Button>
                  </Col>
                </Row>
                <ServiceForm
                  errors={errors}
                  values={values}
                  touched={touched}
                  setContent={setContent}
                />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateService;
