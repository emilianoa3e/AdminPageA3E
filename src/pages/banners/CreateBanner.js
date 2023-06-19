import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { Form as FormBt } from "react-bootstrap";
import * as yup from "yup";
import { TextInput } from "../../components/shared/TextInput";
import { MdTitle, MdOutlineDescription, MdOutlineLink } from "react-icons/md";
import { saveBanner } from "../../utils/bannersFunctions";
import {
  showConfirmDialog,
  showLoadingAlert,
  Toast,
} from "../../shared/plugins/alert";
import FileDropzone from "../../components/shared/Dropzone";
import CustomButton from "../../components/shared/CustomButton";
import BannerPreview from "../utils/BannerPreview";

function CreateBanner() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const imagePreview = uploadedFile ? URL.createObjectURL(uploadedFile) : null;

  const handleSubmit = async (values, uploadedFile) => {
    showConfirmDialog(
      "¿Estás seguro de crear este banner?",
      "Se creará un nuevo banner",
      "Si, crear banner",
      "Cancelar",
      () => {
        showLoadingAlert(
          "Creando banner...",
          "Se está creando el banner, espera un momento."
        );
        saveBanner(
          values.title,
          values.description,
          uploadedFile,
          values.link
        ).then((data) => {
          console.log("data", data);
          if (data.msg === "Banner saved") {
            Toast.fire({
              icon: "success",
              title: "Banner creado con éxito 😄",
            });
            navigate("/banners");
          } else if (data.msg === "Banner already exists") {
            Toast.fire({
              icon: "error",
              title: "Ya existe un banner con ese título 😢",
            });
          }
        });
      }
    );
  };

  const objectSchema = yup.object().shape({
    title: yup.string().required("El título es requerido"),
  });

  return (
    <>
      <Container fluid className="p-0 m-0">
        <Row>
          <Col lg={12}>
            <Formik
              initialValues={{
                title: "",
                description: "",
                link: "",
              }}
              validationSchema={objectSchema}
              onSubmit={(values) => handleSubmit(values, uploadedFile)}
            >
              {({ errors, values, touched }) => (
                <Form>
                  <div style={{ textAlign: "right" }}>
                    <Row className="m-0 p-0">
                      <Col lg={10}>
                        <CustomButton
                          type="button"
                          text="Cancelar"
                          color="danger"
                          size="medium"
                          onClick={() => navigate("/banners")}
                        />
                      </Col>
                      <Col lg={1}>
                        <CustomButton
                          type="submit"
                          text="Guardar"
                          color="primary"
                          size="medium"
                          disabled={
                            !values.title || !uploadedFile || !!errors.title
                          }
                        />
                      </Col>
                    </Row>
                  </div>
                  <Row className="ms-5 me-5 ps-5 pe-5">
                    <Col lg={4} style={{ paddingTop: "70px" }}>
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
                            maxLength="80"
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
                            maxLength="80"
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
                          />
                        </FormBt.Group>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Container fluid className="p-0 m-0">
                      <p className="text-center">Vista previa</p>
                    </Container>
                    <BannerPreview
                      title={values.title}
                      description={values.description}
                      image={imagePreview}
                      link={values.link}
                    />
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateBanner;
