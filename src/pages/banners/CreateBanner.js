import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { Form as FormBt } from "react-bootstrap";
import * as yup from "yup";
import { TextInput } from "../../components/shared/TextInput";
import { MdTitle, MdOutlineDescription, MdOutlineLink } from "react-icons/md";
import { saveBanner } from "../../utils/bannersFunctions";
import { showConfirmDialog, showLoadingAlert, Toast } from "../../shared/plugins/alert";
import FileDropzone from "../../components/shared/Dropzone";
import CustomButton from "../../components/shared/CustomButton";

function CreateBanner() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);

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
        saveBanner(values.title, values.description, uploadedFile, values.link).then((data) => {
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
      <Container>
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
                    <Row>
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
                  <Row>
                    <Col lg={4} style={{ paddingTop: "70px" }}>
                      <FormBt.Group className="mb-3">
                        <FileDropzone
                          uploadedFile={uploadedFile}
                          setUploadedFile={setUploadedFile}
                          onContext="banner"
                        />
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
                            maxLength="180"
                            as="textarea"
                            label="Descripción"
                            name="description"
                            style={{ resize: "none", height: "100px" }}
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
