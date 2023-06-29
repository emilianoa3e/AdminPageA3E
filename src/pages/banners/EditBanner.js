import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { Form as FormBt } from "react-bootstrap";
import * as yup from "yup";
import { TextInput } from "../../components/shared/TextInput";
import { MdTitle, MdOutlineDescription, MdOutlineLink } from "react-icons/md";
import { getBannerById, updateBanner } from "../../utils/bannersFunctions";
import { showConfirmDialog } from "../../shared/plugins/alert";
import FileDropzone from "../../components/shared/Dropzone";
import CustomButton from "../../components/shared/CustomButton";
import BannerPreview from "../utils/BannerPreview";
import SplashScreen from "../utils/SplashScreen";
import "../../assets/css/pages/CreateEditBanner.css";

function EditBanner() {
  const { id } = useParams();
  const navigate = useNavigate();
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
                <Row className="text-end">
                  <Col className="buttons-top">
                    <CustomButton
                      type="button"
                      text="Cancelar"
                      color="danger"
                      size="medium"
                      onClick={() => navigate("/banners")}
                      className="me-2"
                    />
                    <CustomButton
                      type="submit"
                      text="Guardar"
                      color="primary"
                      size="medium"
                      disabled={
                        !values.title || !!errors.title || !!errors.link
                      }
                    />
                  </Col>
                </Row>
                <Row className="form">
                  <Col lg={4} className="form-dropzone">
                    <FormBt.Group className="mb-3">
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
                      <FormBt.Group className="mb-3">
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
                      <FormBt.Group className="mb-3">
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
                      <FormBt.Group className="mb-3">
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
    </Container>
  );
}

export default EditBanner;
