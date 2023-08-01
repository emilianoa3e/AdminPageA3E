import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { updateService, getServiceById } from "../../utils/serviceFunctions";
import {
  showConfirmDialog,
  showConfirmDialogAutoSave,
} from "../../shared/plugins/alert";
import { SpeedDial } from "primereact/speeddial";
import {
  MdCheckCircleOutline,
  MdHighlightOff,
  MdPhotoAlbum,
  MdMenu,
  MdHelpOutline,
} from "react-icons/md";
import { ModalHelp } from "../../components/shared/ModalHelp";
import { stepsService } from "../../components/stepsTutorial/stepsService";
import Galery from "../../components/shared/Galery";
import SpeedDialButton from "../../components/shared/SpeedDialButton";
import SplashScreen from "../utils/SplashScreen";
import ServiceForm from "../../components/services/ServiceForm";
import * as yup from "yup";
import "../../assets/css/pages/CreateEditService.css";

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //content to data
  const [content, setContent] = useState("");
  const [initialContent, setInitialContent] = useState("");
  //content to resume
  const [resumeContent, setResumeContent] = useState("");
  const [initialResumeContent, setInitialResumeContent] = useState("");
  const [service, setService] = useState({});
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
      setResumeContent(data.service.summary);
      setIsLoading(false);
    };

    getService();
  }, []);

  const handleSubmit = async (values, content, resumeContent) => {
    showConfirmDialog(
      "¿Estás seguro de editar este servicio?",
      "Se editará el servicio",
      "Guardar cambios",
      "Cancelar",
      () => {
        updateService(id, values, content, resumeContent, navigate);
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
            }}
            validationSchema={objectSchema}
            onSubmit={(values) => handleSubmit(values, content, resumeContent)}
          >
            {({ errors, values, touched, isValid }) => (
              <Form>
                <SpeedDial
                  style={{
                    position: "fixed",
                    left: 15,
                    bottom: 15,
                    zIndex: 999,
                  }}
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
                        handleSubmit(values, content, resumeContent);
                      },
                      disabled: !isValid || !content,
                    },
                    {
                      label: "Cancelar",
                      icon: <MdHighlightOff size={22} />,
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
                  initialContent={
                    initialContent ? initialContent : service.content
                  }
                  setResumeContent={setResumeContent}
                  initialResumeContent={
                    initialResumeContent
                      ? initialResumeContent
                      : service.summary
                  }
                  onContext={`edit-service/${id}`}
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

export default EditService;
