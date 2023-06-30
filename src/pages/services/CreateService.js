import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { MdTitle, MdOutlineFullscreen } from "react-icons/md";
import { Form, Formik } from "formik";
import { Form as FormBt } from "react-bootstrap";
import * as yup from "yup";
import { TextInput } from "../../components/shared/TextInput";
import { saveService } from "../../utils/serviceFunctions";
import CustomButton from "../../components/shared/CustomButton";
import Galery from "../../components/shared/Galery";
import EditorWys from "../../components/shared/EditorWys";
import { showConfirmDialog } from "../../shared/plugins/alert";
import "../../assets/css/pages/CreateEditService.css";

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
            }}
            validationSchema={objectSchema}
            onSubmit={(values) => handleSubmit(values, content)}
          >
            {({ errors, values, touched }) => (
              <Form>
                <Row className="text-end">
                  <Col className="service-create-buttons-top">
                    <CustomButton
                      type="button"
                      text="Cancelar"
                      color="danger"
                      size="medium"
                      onClick={() => navigate("/services")}
                      className="me-2"
                    />
                    <CustomButton
                      type="submit"
                      text="Guardar"
                      color="primary"
                      size="medium"
                      disabled={!values.title || !content || !!errors.title}
                    />
                  </Col>
                </Row>
                <FormBt.Group className="mb-3">
                  <TextInput
                    maxLength="80"
                    label="Título"
                    name="title"
                    icon={MdTitle}
                    placeholder="Título"
                    isInvalid={!!errors.title && touched.title}
                  />
                </FormBt.Group>
                <p
                  className="text-center align-items-center"
                  style={{
                    color: "grey",
                    fontSize: 14.5,
                    fontStyle: "italic",
                  }}
                >
                  Para una mejor experiencia del editor trabaje en pantalla
                  completa
                  <MdOutlineFullscreen size={23} className="ms-1" />
                </p>
                <FormBt.Group className="mb-3">
                  <EditorWys setContentEditor={setContent} />
                </FormBt.Group>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateService;
