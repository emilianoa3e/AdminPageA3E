import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form as FormBt, Image } from "react-bootstrap";
import { Formik, Form } from "formik";
import { TextInput } from "../../components/shared/TextInput";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { resetPasswordPost, verifyTokenValidity } from "../../utils/AuthFunctions";
import CustomButton from "../../components/shared/CustomButton";
import logo from "../../assets/img/logo.jpeg";
import * as Yup from "yup";
import SplashScreen from "../../pages/utils/SplashScreen";

function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const token = window.location.pathname.split("/")[2];

  const verifyToken = async () => {
    setIsLoading(true);
    const response = await verifyTokenValidity(token, navigate);
    setIsLoading(false);
  };

  useEffect(() => {
    verifyToken();
    
    document.title = "A3E P.A. | Reestablecer contraseña";
  }, []);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const objectSchema = Yup.object({
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("La confirmación de la contraseña es requerida"),
  });

  const handleSubmit = (values) => {
    showConfirmDialog(
      "¿Está seguro de reestablecer su contraseña?",
      "Una vez reestablecida su contraseña, deberá iniciar sesión nuevamente",
      "Reestablecer contraseña",
      "Cancelar",
      () => {
        resetPasswordPost(values, token, navigate);
      }
    );
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Container>
      <Row className="mt-5 d-flex justify-content-center align-items-center">
        <Col sm={12} lg={6} className="">
          <h1 style={{ fontWeight: "bold" }}>Reestablecer contraseña</h1>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={objectSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, values, touched }) => (
              <Form>
                <FormBt.Group className="mb-2">
                  <TextInput
                    label="Contraseña"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    icon={showPassword ? IoMdEyeOff : IoMdEye}
                    onIconClick={toggleShowPassword}
                    placeholder="Ingrese su contraseña"
                    isInvalid={!!errors.password && touched.password}
                  />
                </FormBt.Group>
                <FormBt.Group className="mb-2">
                  <TextInput
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    icon={showPassword ? IoMdEyeOff : IoMdEye}
                    onIconClick={toggleShowPassword}
                    placeholder="Confirme su contraseña"
                    isInvalid={
                      !!errors.confirmPassword && touched.confirmPassword
                    }
                  />
                </FormBt.Group>
                <CustomButton
                  type="submit"
                  text="Reestablecer contraseña"
                  disabled={
                    !!errors.password ||
                    !!errors.confirmPassword ||
                    !values.password ||
                    !values.confirmPassword
                  }
                  className="mt-3 w-100"
                />
              </Form>
            )}
          </Formik>
        </Col>
        <Col sm={12} lg={6}>
          <div className="d-flex justify-content-center align-items-center">
            <Image src={logo} alt="Logo" style={{ width: "80%" }} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;
