import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdTitle,
  MdOutlineLink,
  MdCheckCircleOutline,
  MdArrowBackIosNew,
  MdHelpOutline,
} from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";
import { Form as FormBt } from "react-bootstrap";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { Form, Formik } from "formik";
import { Button } from "@mui/material";
import { TextInput } from "../../components/shared/TextInput";
import { saveCertification } from "../../utils/certificationFunctions";
import { SpeedDial } from "primereact/speeddial";
import { Tour } from "antd";
import Colors from "../../utils/Colors";
import FileDropzone from "../../components/shared/Dropzone";
import * as yup from "yup";
import BannerPreview from "../utils/BannerPreview";
import EditorText from "../../components/shared/EditorText";

function CreateCertification() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const imagePreview = uploadedFile ? URL.createObjectURL(uploadedFile) : null;
  const [resumeContent, setResumeContent] = useState("");
  const [initialResumeContent, setInitialResumeContent] = useState("");
  const [open, setOpen] = useState(false);
  const refStepImg = useRef(null);
  const refStepPrevImg = useRef(null);
  const refStepTitle = useRef(null);
  const refStepDescription = useRef(null);
  const refStepLink = useRef(null);

  const steps = [
    {
      title: "Imagen del banner",
      description:
        "Sube una imagen para el banner. Puede arrastrar la imagen al recuadro o hacer click para seleccionarla.",
      target: () => refStepImg.current,
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Visualización de la imagen",
      description:
        "Una vez que suba la imagen, se mostrará en la vista previa. Y conforme vaya editando el banner, se irá actualizando la vista previa.",
      placement: "top",
      target: () => refStepPrevImg.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Título",
      description: "Ingrese el título del banner. Este campo es obligatorio.",
      target: () => refStepTitle.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Descripción",
      description:
        "Ingrese una descripción para el banner. Este campo es opcional.",
      target: () => refStepDescription.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Enlace",
      description: "Ingrese un enlace para el banner. Este campo es opcional.",
      target: () => refStepLink.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Finalizar" },
    },
  ];

  useEffect(() => {
    document.title = "A3E P.A. | Crear certificado";
  }, []);

  const handleSubmit = (values, uploadedFile) => {
    showConfirmDialog(
      "¿Estás seguro de crear este certificado?",
      "Se creará un nuevo certificado",
      "Si, crear certificado",
      "Cancelar",
      () => {
        saveCertification(values, resumeContent, uploadedFile, navigate);
      }
    );
  };

  const objectSchema = yup.object().shape({
    title: yup.string().required("El título es requerido"),
    link: yup.string().url("Ingrese un enlace válido"),
  });

  return (
    <Container fluid className="p-0 m-0">
      <SpeedDial
        style={{ position: "fixed", left: 10, bottom: 10 }}
        showIcon={<MdHelpOutline size={30} />}
        title="¿Como funciona?"
        buttonStyle={{
          backgroundColor: Colors.PalleteGreenA3E,
          opacity: 0.65,
          color: "white",
        }}
        buttonClassName="p-button-secondary"
        onClick={() => setOpen(true)}
      />
      <Row>
        <Col lg={12}>
          <Formik
            initialValues={{
              title: "",
              link: "",
            }}
            validationSchema={objectSchema}
            onSubmit={(values) =>
              handleSubmit(values, uploadedFile, resumeContent)
            }
          >
            {({ errors, values, touched }) => (
              <Form>
                <Row className="mb-3">
                  <Col className="d-flex justify-content-between">
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<MdArrowBackIosNew />}
                      style={{ backgroundColor: Colors.PalleteGrey }}
                      onClick={() => navigate(window.history.back())}
                      className="me-1"
                    >
                      Regresar
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<MdCheckCircleOutline />}
                      style={
                        !values.title ||
                        !!errors.title ||
                        !uploadedFile ||
                        !!errors.link
                          ? { backgroundColor: Colors.PalletePrimaryLight }
                          : { backgroundColor: Colors.PalletePrimary }
                      }
                      disabled={
                        !values.title ||
                        !!errors.title ||
                        !uploadedFile ||
                        !!errors.link
                      }
                      type="submit"
                    >
                      Guardar
                    </Button>
                  </Col>
                </Row>
                <Row className="ms-3 me-3">
                  <Col lg={4} className="pt-5">
                    <FormBt.Group className="mt-3" ref={refStepImg}>
                      <FileDropzone
                        uploadedFile={uploadedFile}
                        setUploadedFile={setUploadedFile}
                        onContext="banner"
                      />
                      <p
                        className="text-center"
                        style={{
                          fontSize: "0.8rem",
                          fontStyle: "italic",
                          color: "grey",
                          opacity: "0.7",
                        }}
                      >
                        *Agregue una imagen para verlo en la vista previa*
                      </p>
                    </FormBt.Group>
                  </Col>
                  <Col lg={8}>
                    <Row>
                      <FormBt.Group className="mb-2" ref={refStepTitle}>
                        <TextInput
                          maxLength="60"
                          label="Título"
                          name="title"
                          icon={MdTitle}
                          placeholder="Título"
                          isInvalid={!!errors.title && touched.title}
                        />
                      </FormBt.Group>
                    </Row>
                    <Row>
                      <FormBt.Group className="mb-2" ref={refStepDescription}>
                        <label>Descripción</label>
                        <EditorText
                          initialContent={initialResumeContent}
                          setContent={setResumeContent}
                        />
                      </FormBt.Group>
                    </Row>
                    <Row>
                      <FormBt.Group className="mb-2" ref={refStepLink}>
                        <TextInput
                          maxLength="80"
                          label="Link"
                          name="link"
                          icon={MdOutlineLink}
                          placeholder="Link"
                          isInvalid={!!errors.link && touched.link}
                        />
                      </FormBt.Group>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Container fluid className="p-0 m-0" ref={refStepPrevImg}>
                    <p className="text-center">Vista previa</p>
                  </Container>
                  <BannerPreview
                    title={values.title}
                    description={resumeContent}
                    image={imagePreview}
                    link={values.link}
                    onContext="certificationPreview"
                  />
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </Container>
  );
}

export default CreateCertification;
