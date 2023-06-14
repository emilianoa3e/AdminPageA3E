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

function CreateService() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  console.log("content", content);

  const handleSubmit = async (values, content) => {
    const data = await saveService(values.title, content);
    console.log(data);
    navigate("/services");
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
                    <CustomButton
                      type="submit"
                      text="Guardar"
                      disabled={!values.title || !content || !!errors.title}
                    />
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
