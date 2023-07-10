import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { Button } from "@mui/material";
import { MdCheckCircleOutline, MdArrowBackIosNew } from "react-icons/md";
import Galery from "../../components/shared/Galery";
import * as yup from "yup";
import Colors from "../../utils/Colors";
import NoticeForm from "./NoticeForm";
import { getNewById, updateNew } from "../../utils/newsFunctions";
import SplashScreen from "../utils/SplashScreen";
function EditNew() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [notice, setNotice] = useState({
    title: "",
    type: "",
    summary: "",
    content: "",
  });

  useEffect(() => {
    setIsLoading(true);
    const getNew = async () => {
      const data = await getNewById(id);
      setNotice(data.dataNew);
      setIsLoading(false);
    };

    getNew();
  }, []);

  console.log(notice);

  const handleSubmit = (values, content) => {
    showConfirmDialog(
      "¿Estás seguro de editar esta noticia?",
      "Se editará una nueva noticis",
      "Si, editar noticia",
      "Cancelar",
      () => {
        updateNew(id, values, content, navigate);
      }
    );
  };

  const objectSchema = yup.object().shape({
    title: yup.string().required("El título es requerido"),
    type: yup.string().required("El tipo es requerido"),
    summary: yup.string().required("El resumen es requerido"),
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
              title: notice.title,
              type: notice.type,
              summary: notice.summary,
            }}
            enableReinitialize={true}
            validationSchema={objectSchema}
            onSubmit={(values) => handleSubmit(values, content)}
          >
            {({ errors, values, touched, isValid }) => (
              <Form>
                <Row className="text-end">
                  <Col className="service-create-buttons-top">
                    <Button
                      variant="contained"
                      size="medium"
                      startIcon={<MdArrowBackIosNew />}
                      style={{ backgroundColor: Colors.PalleteGrey }}
                      onClick={() => navigate("/news")}
                      className="me-2"
                    >
                      Regresar
                    </Button>
                    <Button
                      variant="contained"
                      size="medium"
                      endIcon={<MdCheckCircleOutline />}
                      style={
                        !isValid || !content
                          ? { backgroundColor: Colors.PalletePrimaryLight }
                          : { backgroundColor: Colors.PalletePrimary }
                      }
                      type="submit"
                      disabled={!isValid || !content}
                    >
                      Guardar
                    </Button>
                  </Col>
                </Row>
                <NoticeForm
                  errors={errors}
                  values={values}
                  touched={touched}                 
                  setContent={setContent}
                  initialContent={notice.content}
                />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default EditNew;
