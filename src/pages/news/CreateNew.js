import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { saveNew } from "../../utils/newsFunctions";
import { Button } from "@mui/material";
import {
  MdCheckCircleOutline,
  MdArrowBackIosNew,
  MdPhotoAlbum,
} from "react-icons/md";
import Galery from "../../components/shared/Galery";
import * as yup from "yup";
import Colors from "../../utils/Colors";
import NoticeForm from "./NoticeForm";

function CreateNew() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSubmit = (values, content) => {
    showConfirmDialog(
      "¿Estás seguro de crear esta noticia?",
      "Se creará una nueva noticia",
      "Si, crear noticia",
      "Cancelar",
      () => {
        saveNew(values, content, navigate);
      }
    );
  };

  const objectSchema = yup.object().shape({
    title: yup.string().required("El título es requerido"),
    type: yup.string().required("El tipo es requerido"),
    summary: yup.string().required("El resumen es requerido"),
  });
  return (
    <Container fluid>
      <Row>
        <Galery anchor="left" state={state} toggleDrawer={toggleDrawer} />
        <Col>
          <Formik
            initialValues={{
              title: "",
              type: "",
              summary: "",
            }}
            validationSchema={objectSchema}
            onSubmit={(values) => handleSubmit(values, content)}
          >
            {({ errors, values, touched, isValid, dirty }) => (
              <Form>
                <Row className="mb-3">
                  <Col className="d-flex justify-content-end">
                    <Col className="d-flex justify-content-start">
                      <Button
                        variant="contained"
                        size="medium"
                        endIcon={<MdPhotoAlbum />}
                        style={{ backgroundColor: Colors.PalleteBlueGreen }}
                        onClick={toggleDrawer("left", true)}
                      >
                        Galería
                      </Button>
                    </Col>
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
                <NoticeForm
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

export default CreateNew;
