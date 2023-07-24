import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import {
  showConfirmDialog,
  showConfirmDialogAutoSave,
} from "../../shared/plugins/alert";
import { saveNew } from "../../utils/newsFunctions";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import {
  MdCheckCircleOutline,
  MdCancel,
  MdArrowBackIosNew,
  MdPhotoAlbum,
  MdMenu,
} from "react-icons/md";
import Galery from "../../components/shared/Galery";
import * as yup from "yup";
import NoticeForm from "./NoticeForm";

function CreateNew() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    const showAutosaveDialog = () => {
      const autosave = localStorage.getItem("tinymce-autosave-create-newdraft");
      if (autosave) {
        showConfirmDialogAutoSave(
          "¿Deseas recuperar el último borrador?",
          "Podrás continuar donde lo dejaste.",
          "Si, recuperar",
          "No, empezar de nuevo",
          () => {
            setInitialContent(autosave);
          },
          () => {
            localStorage.removeItem("tinymce-autosave-create-newdraft");
            localStorage.removeItem("tinymce-autosave-create-newtime");
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

  const handleSubmit = (values, content) => {
    showConfirmDialog(
      "¿Estás seguro de crear esta noticia?",
      "Se creará una nueva noticia",
      "Si, crear noticia",
      "Cancelar",
      () => {
        saveNew(values, content, navigate);
        localStorage.removeItem("tinymce-autosave-create-newdraft");
        localStorage.removeItem("tinymce-autosave-create-newtime");
      }
    );
  };

  const handleBack = () => {
    const autosave = localStorage.getItem("tinymce-autosave-create-newdraft");
    if (autosave) {
      showConfirmDialog(
        "¿Estás seguro de salir?",
        "Se perderá el trabajo no guardado.",
        "Si, salir",
        "Cancelar",
        () => {
          localStorage.removeItem("tinymce-autosave-create-newdraft");
          localStorage.removeItem("tinymce-autosave-create-newtime");
          navigate("/news");
        }
      );
    } else {
      navigate("/news");
    }
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
                <Row className="mb-2">
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <SpeedDial
                      style={{ position: "fixed", left: 15, bottom: 15 }}
                      type="quarter-circle"
                      showIcon={<MdPhotoAlbum size={30} />}
                      onClick={toggleDrawer("left", true)}
                    />
                    <Tooltip
                      target=".speeddial-bottom-right .p-speeddial-action"
                      position="left"
                    />
                    <SpeedDial
                      model={[
                        {
                          label: "Guardar",
                          icon: <MdCheckCircleOutline size={22}/>,
                          command: () => {
                            handleSubmit(values, content);
                          },
                          disabled: !isValid || !dirty || !content,
                        },
                        {
                          label: "Regresar",
                          icon: <MdArrowBackIosNew size={22} />,
                          command: () => {
                            handleBack();
                          },
                        },
                      ]}
                      type="quarter-circle"
                      direction="up-left"
                      radius={65}
                      transitionDelay={80}
                      style={{ position: "fixed", right: 15, bottom: 15 }}
                      className="speeddial-bottom-right"
                      buttonClassName="p-button-secondary"
                      showIcon={<MdMenu size={30} />}
                      hideIcon={<MdCancel size={30} />}
                    />
                  </Col>
                </Row>
                <NoticeForm
                  errors={errors}
                  values={values}
                  touched={touched}
                  setContent={setContent}
                  initialContent={initialContent}
                  onContext={"create-new"}
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
