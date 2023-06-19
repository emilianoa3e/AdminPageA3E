import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { MdTitle } from "react-icons/md";
import { Form, Formik } from "formik";
import { Form as FormBt } from "react-bootstrap";
import * as yup from "yup";
import { TextInput } from "../../components/shared/TextInput";
import { saveService } from "../../utils/serviceFunctions";
import CustomButton from "../../components/shared/CustomButton";
import Galery from "../../components/shared/Galery";
import EditorWys from "../../components/shared/EditorWys";
import { Toast, showConfirmDialog } from "../../shared/plugins/alert";

function CreateService() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleSubmit = async (values, content) => {
    showConfirmDialog(
      "¿Estás seguro de crear este servicio?",
      "Se creará un nuevo servicio",
      "Si, crear servicio",
      "Cancelar",
      () => {
        saveService(values.title, content).then((data) => {
          if (data.msg === "Service saved") {
            Toast.fire({
              icon: "success",
              title: "Servicio creado con éxito 😄",
            });
            navigate("/services");
          } else if (data.msg === "Service already exists") {
            Toast.fire({
              icon: "error",
              title: "Ya existe un servicio con ese título 😢",
            });
          }
        });
      }
    );
  };

  const objectSchema = yup.object().shape({
    title: yup.string().required("El título es requerido"),
  });

  return (
    <>
      <div>
        <Row>
          <Col lg={3}>
            <Galery />
          </Col>
          <Col lg={9}>
            <Formik
              initialValues={{
                title: "",
              }}
              validationSchema={objectSchema}
              onSubmit={(values) => handleSubmit(values, content)}
            >
              {({ errors, values, touched }) => (
                <Form>
                  <Container style={{ textAlign: "right" }}>
                    <Row>
                      <Col lg={10}>
                        <CustomButton
                          type="button"
                          text="Cancelar"
                          color="danger"
                          size="medium"
                          onClick={() => navigate("/services")}
                        />
                      </Col>
                      <Col lg={1}>
                        <CustomButton
                          type="submit"
                          text="Guardar"
                          color="primary"
                          size="medium"
                          disabled={!values.title || !content || !!errors.title}
                        />
                      </Col>
                    </Row>
                  </Container>
                  <FormBt.Group className="mb-3">
                    <TextInput
                      label="Título"
                      name="title"
                      icon={MdTitle}
                      placeholder="Título"
                      isInvalid={!!errors.title && touched.title}
                    />
                  </FormBt.Group>
                  <FormBt.Group className="mb-3">
                    <EditorWys setContentEditor={setContent} />
                  </FormBt.Group>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreateService;
