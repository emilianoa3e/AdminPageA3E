import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { saveService } from "../../utils/serviceFunctions";
import {
  showConfirmDialog,
  showConfirmDialogAutoSave,
} from "../../shared/plugins/alert";
import { SpeedDial } from "primereact/speeddial";
import {
  MdCheckCircleOutline,
  MdArrowBackIosNew,
  MdPhotoAlbum,
  MdMenu,
  MdHelpOutline,
  MdCancel,
} from "react-icons/md";
import { ModalHelp } from "../../components/shared/ModalHelp";
import { stepsService } from "../../components/stepsTutorial/stepsService";
import ServiceForm from "../../components/services/ServiceForm";
import SpeedDialButton from "../../components/shared/SpeedDialButton";
import Galery from "../../components/shared/Galery";
import Colors from "../../utils/Colors";
import * as yup from "yup";
import "../../assets/css/pages/CreateEditService.css";

function CreateService() {
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
      const autosave = localStorage.getItem(
        "tinymce-autosave-create-servicedraft"
      );
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
            localStorage.removeItem("tinymce-autosave-create-servicedraft");
            localStorage.removeItem("tinymce-autosave-create-servicetime");
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
      "¿Estás seguro de crear este servicio?",
      "Se creará un nuevo servicio",
      "Si, crear servicio",
      "Cancelar",
      () => {
        saveService(values, content, navigate);
        localStorage.removeItem("tinymce-autosave-create-servicedraft");
        localStorage.removeItem("tinymce-autosave-create-servicetime");
      }
    );
  };

  const handleBack = () => {
    const autosave = localStorage.getItem(
      "tinymce-autosave-create-servicedraft"
    );
    if (autosave) {
      showConfirmDialog(
        "¿Estás seguro de salir?",
        "Se perderá el trabajo no guardado.",
        "Si, salir",
        "Cancelar",
        () => {
          localStorage.removeItem("tinymce-autosave-create-servicedraft");
          localStorage.removeItem("tinymce-autosave-create-servicetime");
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

  return (
    <Container fluid>
      <Row>
        <Galery anchor="left" state={state} toggleDrawer={toggleDrawer} />
        <Col>
          <Formik
            initialValues={{
              title: "",
              subtitle: "",
              summary: "",
            }}
            validationSchema={objectSchema}
            onSubmit={(values) => handleSubmit(values, content)}
          >
            {({ errors, values, touched, isValid, dirty }) => (
              <Form>
                <SpeedDial
                  style={{ position: "fixed", left: 15, bottom: 15 }}
                  showIcon={<MdPhotoAlbum size={30} />}
                  onClick={toggleDrawer("left", true)}
                />
                <SpeedDialButton
                  positionTooltip="top"
                  speedDialItems={[
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
                  directionSD="left"
                  buttonClassname="p-button-secondary"
                  showIcon={<MdMenu size={30} />}
                />
                <ServiceForm
                  errors={errors}
                  values={values}
                  touched={touched}
                  setContent={setContent}
                  initialContent={initialContent}
                  onContext={"create-service"}
                />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <ModalHelp
        show={showHelp}
        handleClose={handleCloseHelp}
        stepsTutorial={stepsService}
      />
    </Container>
  );
}

export default CreateService;
