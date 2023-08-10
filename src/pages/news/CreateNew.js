import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import {
  showConfirmDialog,
  showConfirmDialogAutoSave,
} from "../../shared/plugins/alert";
import { saveNew } from "../../utils/newsFunctions";
import { SpeedDial } from "primereact/speeddial";
import {
  MdCheckCircleOutline,
  MdArrowBackIosNew,
  MdPhotoAlbum,
  MdMenu,
  MdHelpOutline,
} from "react-icons/md";
import { Tour } from "antd";
import SpeedDialButton from "../../components/shared/SpeedDialButton";
import Galery from "../../components/shared/Galery";
import * as yup from "yup";
import NoticeForm from "./NoticeForm";
import Colors from "../../utils/Colors";

function CreateNew() {
  const navigate = useNavigate();
  //content to data
  const [content, setContent] = useState("");
  const [initialContent, setInitialContent] = useState("");
  //content to resume
  const [resumeContent, setResumeContent] = useState("");
  const [initialResumeContent, setInitialResumeContent] = useState("");
  const [open, setOpen] = useState(false);
  const refStepTitle = useRef(null);
  const refStepType = useRef(null);
  const refStepResume = useRef(null);
  const refStepAuthor = useRef(null);
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
      title: "Tipo de noticia",
      description: "Ingrese el tipo de noticia. Este campo es obligatorio.",
      target: () => refStepType.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Resumen",
      description:
        "Ingrese un resumen para la noticia. Este campo es opcional.",
      placement: "bottom",
      target: () => refStepResume.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Autor",
      description: "Ingrese el autor de la noticia. Este campo es opcional.",
      placement: "bottom",
      target: () => refStepAuthor.current,
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

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    document.title = "A3E P.A. | Crear noticia";
  }, []);

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

  const handleSubmit = (values, content, resumeContent) => {
    console.log(resumeContent);
    showConfirmDialog(
      "¿Estás seguro de crear esta noticia?",
      "Se creará una nueva noticia",
      "Si, crear noticia",
      "Cancelar",
      () => {
        const date = new Date().toLocaleDateString();
        saveNew(values, content, resumeContent, navigate, date);
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
              author: "",
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
                        setOpen(true);
                      },
                    },
                  ]}
                  directionSD="left"
                  buttonClassname="p-button-secondary"
                  showIcon={<MdMenu size={30} />}
                />
                <NoticeForm
                  errors={errors}
                  values={values}
                  touched={touched}
                  setContent={setContent}
                  initialContent={initialContent}
                  setResumeContent={setResumeContent}
                  initialResumeContent={initialResumeContent}
                  onContext={"create-new"}
                  refStepTitle={refStepTitle}
                  refStepType={refStepType}
                  refStepResume={refStepResume}
                  refStepAuthor={refStepAuthor}
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

export default CreateNew;
