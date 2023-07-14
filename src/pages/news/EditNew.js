import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { getNewById, updateNew } from "../../utils/newsFunctions";
import { Button } from "@mui/material";
import {
  MdCheckCircleOutline,
  MdHighlightOff,
  MdPhotoAlbum,
} from "react-icons/md";
import Galery from "../../components/shared/Galery";
import * as yup from "yup";
import Colors from "../../utils/Colors";
import NoticeForm from "./NoticeForm";
import SplashScreen from "../utils/SplashScreen";

function EditNew() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [notice, setNotice] = useState({});
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

  useEffect(() => {
    setIsLoading(true);
    const getNew = async () => {
      const data = await getNewById(id);
      setNotice(data.dataNew);
      setContent(data.dataNew.content);
      setIsLoading(false);
    };

    getNew();
  }, []);

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
        <Galery anchor="left" state={state} toggleDrawer={toggleDrawer} />
        <Col>
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
                      endIcon={<MdHighlightOff />}
                      style={{ backgroundColor: Colors.PalleteDanger }}
                      onClick={() => navigate("/news")}
                      className="me-2"
                    >
                      Cancelar
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
