import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { Form as FormBt } from "react-bootstrap";
import { TextInput } from "../../components/shared/TextInput";
import {
  MdTitle,
  MdOutlineDescription,
  MdOutlineLink,
  MdHelpOutline,
} from "react-icons/md";
import { getBannerById, updateBanner } from "../../utils/bannersFunctions";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { MdCheckCircleOutline, MdHighlightOff } from "react-icons/md";
import { Button } from "@mui/material";
import { SpeedDial } from "primereact/speeddial";
import { ModalHelp } from "../../components/shared/ModalHelp";
import { stepsBanner } from "../../components/stepsTutorial/stepsBanner";
import * as yup from "yup";
import Colors from "../../utils/Colors";
import FileDropzone from "../../components/shared/Dropzone";
import BannerPreview from "../utils/BannerPreview";
import SplashScreen from "../utils/SplashScreen";

function EditBanner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    status: "",
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const imagePreview = uploadedFile ? URL.createObjectURL(uploadedFile) : null;

  const handleShowHelp = () => setShowHelp(true);
  const handleCloseHelp = () => setShowHelp(false);

  useEffect(() => {
    setIsLoading(true);
    const getBanner = async () => {
      const data = await getBannerById(id);
      setBanner(data.banner);
      setIsLoading(false);
    };

    getBanner();
  }, []);

  const handleSubmit = (values, uploadedFile) => {
    showConfirmDialog(
      "¿Estás seguro de actualizar el banner?",
      "Se actualizará el banner",
      "Si, actualizar banner",
      "Cancelar",
      () => {
        updateBanner(id, values, uploadedFile, navigate);
      }
    );
  };

  const objectSchema = yup.object().shape({
    title: yup.string().required("El título es requerido"),
    link: yup.string().url("Ingrese un enlace válido"),
  });

  if (isLoading) {
    <SplashScreen />;
  }

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
        onClick={handleShowHelp}
      />
      <Row>
        <Col lg={12}>
          <Formik
            initialValues={{
              title: banner.title,
              description: banner.description,
              link: banner.link,
            }}
            enableReinitialize={true}
            validationSchema={objectSchema}
            onSubmit={(values) => handleSubmit(values, uploadedFile)}
          >
            {({ errors, values, touched }) => (
              <Form>
                <Row className="mb-3">
                  <Col className="d-flex justify-content-between">
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<MdHighlightOff />}
                      style={{ backgroundColor: Colors.PalleteDanger }}
                      onClick={() => navigate("/banners")}
                      className="me-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<MdCheckCircleOutline />}
                      style={
                        !values.title || !!errors.title || !!errors.link
                          ? { backgroundColor: Colors.PalletePrimaryLight }
                          : { backgroundColor: Colors.PalletePrimary }
                      }
                      disabled={
                        !values.title || !!errors.title || !!errors.link
                      }
                      type="submit"
                    >
                      Guardar
                    </Button>
                  </Col>
                </Row>
                <Row className="ms-3 me-3">
                  <Col lg={4} className="pt-5">
                    <FormBt.Group className="mt-3">
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
                      <FormBt.Group className="mb-2">
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
                      <FormBt.Group className="mb-2">
                        <TextInput
                          maxLength="100"
                          as="textarea"
                          label="Descripción"
                          name="description"
                          style={{ resize: "none", height: "70px" }}
                          icon={MdOutlineDescription}
                          placeholder="Descripción"
                        />
                      </FormBt.Group>
                    </Row>
                    <Row>
                      <FormBt.Group className="mb-2">
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
                  <Container fluid className="p-0 m-0">
                    <p className="text-center">Vista previa</p>
                  </Container>
                  {uploadedFile ? (
                    <BannerPreview
                      title={values.title}
                      description={values.description}
                      image={imagePreview}
                      link={values.link}
                      onContext="bannerPreview"
                    />
                  ) : (
                    <BannerPreview
                      title={values.title}
                      description={values.description}
                      image={banner.image}
                      link={values.link}
                      onContext="bannerPreview"
                    />
                  )}
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <ModalHelp
        show={showHelp}
        handleClose={handleCloseHelp}
        stepsTutorial={stepsBanner}
      />
    </Container>
  );
}

export default EditBanner;
