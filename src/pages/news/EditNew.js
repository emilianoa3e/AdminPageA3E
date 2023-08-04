import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import {
  showConfirmDialog,
  showConfirmDialogAutoSave,
} from "../../shared/plugins/alert";
import { getNewById, updateNew } from "../../utils/newsFunctions";
import { SpeedDial } from "primereact/speeddial";
import {
  MdCheckCircleOutline,
  MdHighlightOff,
  MdPhotoAlbum,
  MdMenu,
  MdHelpOutline,
} from "react-icons/md";
import { ModalHelp } from "../../components/shared/ModalHelp";
import { stepsNew } from "../../components/stepsTutorial/stepsNew";
import Galery from "../../components/shared/Galery";
import SpeedDialButton from "../../components/shared/SpeedDialButton";
import * as yup from "yup";
import NoticeForm from "./NoticeForm";
import SplashScreen from "../utils/SplashScreen";

function EditNew() {
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
  const [notice, setNotice] = useState({});
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
        `tinymce-autosave-edit-new/${id}draft`
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
            localStorage.removeItem(`tinymce-autosave-edit-new/${id}draft`);
            localStorage.removeItem(`tinymce-autosave-edit-new/${id}time`);
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
    const getNew = async () => {
      const data = await getNewById(id);
      setNotice(data.dataNew);
      setContent(data.dataNew.content);
      setResumeContent(data.dataNew.summary);
      setIsLoading(false);
    };

    getNew();
  }, []);

  const handleSubmit = (values, content, resumeContent) => {
    showConfirmDialog(
      "¿Estás seguro de editar esta noticia?",
      "Se editará una nueva noticis",
      "Si, editar noticia",
      "Cancelar",
      () => {
        const date = new Date().toLocaleDateString();
        updateNew(id, values, content, resumeContent, navigate, date);
        localStorage.removeItem(`tinymce-autosave-edit-new/${id}draft`);
        localStorage.removeItem(`tinymce-autosave-edit-new/${id}time`);
      }
    );
  };

  const handleBack = () => {
    const autosave = localStorage.getItem(
      `tinymce-autosave-edit-new/${id}draft`
    );
    if (autosave) {
      showConfirmDialog(
        "¿Estás seguro de salir?",
        "Se perderá el trabajo no guardado.",
        "Si, salir",
        "Cancelar",
        () => {
          localStorage.removeItem(`tinymce-autosave-edit-new/${id}draft`);
          localStorage.removeItem(`tinymce-autosave-edit-new/${id}time`);
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
    author: yup.string().required("El autor es requerido"),
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
              author: notice.author,
            }}
            enableReinitialize={true}
            validationSchema={objectSchema}
            onSubmit={(values) => handleSubmit(values, content, resumeContent)}
          >
            {({ errors, values, touched, isValid }) => (
              <Form>
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
                <NoticeForm
                  errors={errors}
                  values={values}
                  touched={touched}
                  setContent={setContent}
                  initialContent={
                    initialContent ? initialContent : notice.content
                  }
                  setResumeContent={setResumeContent}
                  initialResumeContent={
                    initialResumeContent ? initialResumeContent : notice.summary
                  }
                  onContext={`edit-new/${id}`}
                />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <ModalHelp
        show={showHelp}
        handleClose={handleCloseHelp}
        stepsTutorial={stepsNew}
      />
    </Container>
  );
}

export default EditNew;
