import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Modal, Row } from "react-bootstrap";
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
  MdHelpOutline,
} from "react-icons/md";
import { ModalHelp } from "../../components/shared/ModalHelp";
import { stepsCreateNew } from "../../components/stepsTutorial/stepsCreateNew";
import Galery from "../../components/shared/Galery";
import * as yup from "yup";
import NoticeForm from "./NoticeForm";
import Colors from "../../utils/Colors";

function CreateNew() {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [content, setContent] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleShowHelp = () => setShowHelp(true);
  const handleCloseHelp = () => setShowHelp(false);

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
        const date = new Date().toLocaleDateString();
        saveNew(values, content, navigate, date);
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
    type: yup.string().required("El tipo de noticia es requerido"),
    summary: yup.string().required("El resumen es requerido"),
    author: yup.string().required("El autor es requerido"),
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
              author: "",
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
                      position="top"
                    />
                    <SpeedDial
                      model={[
                        {
                          label: "Guardar",
                          icon: <MdCheckCircleOutline size={22} />,
                          command: () => {
                            handleSubmit(values, content);
                          },
                          disabled: !isValid || !dirty || !content,
                        },
                        {
                          label: "Regresar",
                          style: { background: Colors.PalleteDanger },
                          icon: <MdArrowBackIosNew size={22} />,
                          command: () => {
                            handleBack();
                          },
                        },
                        {
                          label: "¿Como funciona?",
                          icon: <MdHelpOutline size={22} />,
                          command: () => {
                            handleShowHelp();
                          },
                        },
                      ]}
                      direction="left"
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
      <ModalHelp
        show={showHelp}
        handleClose={handleCloseHelp}
        stepsTutorial={stepsCreateNew}
      />
    </Container>
  );
}

export default CreateNew;
