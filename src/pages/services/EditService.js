import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { updateService, getServiceById } from "../../utils/serviceFunctions";
import {
  showConfirmDialog,
  showConfirmDialogAutoSave,
} from "../../shared/plugins/alert";
import { Button } from "@mui/material";
import {
  MdCheckCircleOutline,
  MdHighlightOff,
  MdPhotoAlbum,
} from "react-icons/md";
import Galery from "../../components/shared/Galery";
import SplashScreen from "../utils/SplashScreen";
import ServiceForm from "../../components/services/ServiceForm";
import Colors from "../../utils/Colors";
import * as yup from "yup";
import "../../assets/css/pages/CreateEditService.css";

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [service, setService] = useState({});
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    const showAutosaveDialog = () => {
      const autosave = localStorage.getItem(
        `tinymce-autosave-edit-service/${id}draft`
      );
      if (autosave) {
        showConfirmDialogAutoSave(
          "¿Deseas recuperar el último borrador?",
          "Podrás continuar donde lo dejaste.",
          "Si, recuperar",
          "No",
          () => {
            setInitialContent(autosave);
          },
          () => {
            localStorage.removeItem(`tinymce-autosave-edit-service/${id}draft`);
            localStorage.removeItem(`tinymce-autosave-edit-service/${id}time`);
          }
        );
      } else {
        console.log("no hay autosave");
      }
    };
    showAutosaveDialog();
  }, []);

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
    const getService = async () => {
      const data = await getServiceById(id);
      setService(data.service);
      setContent(data.service.content);
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
        localStorage.removeItem(`tinymce-autosave-edit-service/${id}draft`);
        localStorage.removeItem(`tinymce-autosave-edit-service/${id}time`);
      }
    );
  };

  const handleBack = () => {
    const autosave = localStorage.getItem(
      `tinymce-autosave-edit-service/${id}draft`
    );
    if (autosave) {
      showConfirmDialog(
        "¿Estás seguro de salir?",
        "Se perderá el trabajo no guardado.",
        "Si, salir",
        "Cancelar",
        () => {
          localStorage.removeItem(`tinymce-autosave-edit-service/${id}draft`);
          localStorage.removeItem(`tinymce-autosave-edit-service/${id}time`);
          navigate("/services");
        }
      );
    } else {
      navigate("/services");
    }
  };

  const objectSchema = yup.object().shape({
    title: yup.string().required("El título es requerido"),
    summary: yup.string().required("El resumen es requerido"),
  });

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Container fluid>
      <Row>
        <Galery anchor="left" state={state} toggleDrawer={toggleDrawer} />
        <Col>
          <Formik
            initialValues={{
              title: service.title,
              subtitle: service.subtitle,
              summary: service.summary,
            }}
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
                      onClick={() => handleBack()}
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
                <ServiceForm
                  errors={errors}
                  values={values}
                  touched={touched}
                  setContent={setContent}
                  initialContent={
                    initialContent ? initialContent : service.content
                  }
                  onContext={`edit-service/${id}`}
                />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default EditService;
