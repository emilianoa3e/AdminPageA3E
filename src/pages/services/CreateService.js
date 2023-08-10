import React, { useState, useEffect, useRef } from "react";
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
} from "react-icons/md";
import { Tour } from "antd";
import ServiceForm from "../../components/services/ServiceForm";
import SpeedDialButton from "../../components/shared/SpeedDialButton";
import Galery from "../../components/shared/Galery";
import * as yup from "yup";
import "../../assets/css/pages/CreateEditService.css";

function CreateService() {
  const navigate = useNavigate();
  //content to data
  const [content, setContent] = useState("");
  const [initialContent, setInitialContent] = useState("");
  //content to resume
  const [resumeContent, setResumeContent] = useState("");
  const [initialResumeContent, setInitialResumeContent] = useState("");
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [open, setOpen] = useState(false);
  const refStepTitle = useRef(null);
  const refStepSubtitle = useRef(null);
  const refStepResume = useRef(null);
  const refStepContent = useRef(null);
  const refStepGalery = useRef(null);

  const steps = [
    {
      title: "Título",
      description: "Ingrese el título del servicio. Este campo es obligatorio.",
      target: () => refStepTitle.current,
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Subtítulo",
      description:
        "Ingrese un subtítulo para el servicio. Este campo es opcional.",
      target: () => refStepSubtitle.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Resumen",
      description:
        "Ingrese un resumen para el servicio. Este campo es opcional.",
      placement: "bottom",
      target: () => refStepResume.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Contenido",
      description:
        "El contenido del servicio es obligatorio. Puede agregar imágenes, videos, tablas, etc. Todo lo que necesite para crear su servicio.",
      target: () => refStepContent.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Galería",
      description:
        "Es un banco de imágenes que puede utilizar en el contenido del servicio.",
      placement: "rightTop",
      target: () => refStepGalery.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Finalizar" },
    },
  ];

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

    document.title = "A3E P.A. | Crear servicio";
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

  const handleSubmit = (values, content, resumeContent) => {
    showConfirmDialog(
      "¿Estás seguro de crear este servicio?",
      "Se creará un nuevo servicio",
      "Si, crear servicio",
      "Cancelar",
      () => {
        saveService(values, content, resumeContent, navigate);
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
            }}
            validationSchema={objectSchema}
            onSubmit={(values) => handleSubmit(values, content, resumeContent)}
          >
            {({ errors, values, touched, isValid, dirty }) => (
              <Form>
                <div
                  ref={refStepGalery}
                  style={{
                    position: "fixed",
                    left: 10,
                    bottom: 10,
                    zIndex: 3,
                    width: 65,
                    height: 65,
                  }}
                >
                  <SpeedDial
                    style={{
                      position: "fixed",
                      left: 10,
                      bottom: 10,
                      zIndex: 3,
                    }}
                    showIcon={<MdPhotoAlbum size={30} />}
                    onClick={toggleDrawer("left", true)}
                  />
                </div>
                <SpeedDialButton
                  positionTooltip="top"
                  speedDialItems={[
                    {
                      label: "Guardar",
                      icon: <MdCheckCircleOutline size={22} />,
                      command: () => {
                        handleSubmit(values, content, resumeContent);
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
                    {
                      label: "¿Como funciona?",
                      icon: <MdHelpOutline size={22} />,
                      command: () => {
                        setOpen(true);
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
                  setResumeContent={setResumeContent}
                  initialResumeContent={initialResumeContent}
                  onContext={"create-service"}
                  refStepTitle={refStepTitle}
                  refStepSubtitle={refStepSubtitle}
                  refStepResume={refStepResume}
                  refStepContent={refStepContent}
                />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </Container>
  );
}

export default CreateService;
