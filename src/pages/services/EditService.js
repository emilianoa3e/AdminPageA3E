import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form as FormBt } from "react-bootstrap";
import { MdTitle, MdOutlineFullscreen } from "react-icons/md";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { TextInput } from "../../components/shared/TextInput";
import { updateService, getServiceById } from "../../utils/serviceFunctions";
import CustomButton from "../../components/shared/CustomButton";
import Galery from "../../components/shared/Galery";
import EditorWys from "../../components/shared/EditorWys";
import { showConfirmDialog } from "../../shared/plugins/alert";
import SplashScreen from "../utils/SplashScreen";
import "../../assets/css/pages/CreateEditService.css";

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [service, setService] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    setIsLoading(true);
    const getService = async () => {
      const data = await getServiceById(id);
      setService(data.service);
      setIsLoading(false);
    };

    getService();
  }, []);

  const handleSubmit = async (values, content) => {
    showConfirmDialog(
      "¿Estás seguro de editar este servicio?",
      "Se editará el servicio",
      "Guardar cambios",
      "Cancelar",
      () => {
        updateService(id, values, content, navigate);
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
              title: service.title,
            }}
            enableReinitialize={true}
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
                    label="Título"
                    name="title"
                    icon={MdTitle}
                    placeholder="Título"
                    isInvalid={!!errors.title && touched.title}
                  />
                </FormBt.Group>
                <p
                  className="text-center align-items-center"
                  style={{ color: "grey", fontSize: 14.5, fontStyle: "italic" }}
                >
                  Para una mejor experiencia del editor trabaje en pantalla
                  completa
                  <MdOutlineFullscreen size={23} className="ms-1" />
                </p>
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
    </Container>
  );
}

export default EditService;
