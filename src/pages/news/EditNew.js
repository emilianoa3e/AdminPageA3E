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
import { Tooltip } from "primereact/tooltip";
import {
  MdCheckCircleOutline,
  MdHighlightOff,
  MdPhotoAlbum,
  MdMenu,
  MdCancel,
} from "react-icons/md";
import Galery from "../../components/shared/Galery";
import * as yup from "yup";
import NoticeForm from "./NoticeForm";
import SplashScreen from "../utils/SplashScreen";

function EditNew() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [notice, setNotice] = useState({});
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
                          icon: <MdCheckCircleOutline size={22} />,
                          command: () => {
                            handleSubmit(values, content);
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
                  initialContent={
                    initialContent ? initialContent : notice.content
                  }
                  onContext={`edit-new/${id}`}
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
