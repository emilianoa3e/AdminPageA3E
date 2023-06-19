import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form as FormBt } from "react-bootstrap";
import { MdTitle } from "react-icons/md";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { TextInput } from "../../components/shared/TextInput";
import { updateService } from "../../utils/serviceFunctions";
import CustomButton from "../../components/shared/CustomButton";
import Galery from "../../components/shared/Galery";
import EditorWys from "../../components/shared/EditorWys";
import { getServiceById } from "../../utils/serviceFunctions";
import { Toast, showConfirmDialog } from "../../shared/plugins/alert";
import SplashScreen from "../utils/SplashScreen";

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [service, setService] = useState({
    title: "",
    content: "",
  });

  const edit = true;

  useEffect(() => {
    setIsLoading(true);
    const getService = async () => {
      const data = await getServiceById(id);
      setService(data.service);
      setIsLoading(false);
    };
    getService();
  }, []);

  const title = service.title;

  const handleSubmit = async (values, content) => {
    showConfirmDialog(
      "¿Estás seguro de editar este servicio?",
      "Se editará el servicio",
      "Guardar cambios",
      "Cancelar",
      () => {
        updateService(id, values.title, content).then((data) => {
          if (data.msg === "Service updated") {
            Toast.fire({
              icon: "success",
              title: "Servicio editado con éxito 😄",
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

  if (isLoading) {
    return <SplashScreen isLoading={isLoading} />;
  }

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
                      disabled={!edit}
                    />
                  </FormBt.Group>
                  <FormBt.Group className="mb-3">
                    <EditorWys
                      setContentEditor={setContent}
                      initialContent={service.content}
                    />
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
