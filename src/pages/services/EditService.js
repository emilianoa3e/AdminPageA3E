import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form as FormBt } from "react-bootstrap";
import { MdTitle } from "react-icons/md";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { TextInput } from "../../components/shared/TextInput";
// import { saveService } from "../../utils/serviceFunctions";
import CustomButton from "../../components/shared/CustomButton";
import Galery from "../../components/shared/Galery";
import EditorWys from "../../components/shared/EditorWys";
import { getServiceById } from "../../utils/serviceFunctions";

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [service, setService] = useState({
    title: "",
    content: "",
  });

  const edit=true

  useEffect(() => {
    const getService = async () => {
      const data = await getServiceById(id);
      setService(data.service);
    };
    getService();
  }, []);

  const title = service.title;

  console.log("el serviceee", service);
  console.log("el title", title);

  const handleSubmit = async (values, content) => {
    // const data = await saveService(values.title, content);
    // console.log(data);
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
                title: title || "",
              }}
              enableReinitialize={true}
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
                      disabled={!edit}
                    />
                  </FormBt.Group>
                  <FormBt.Group className="mb-3">
                    <EditorWys setContentEditor={setContent} initialContent={service.content}/>
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

export default EditService;
