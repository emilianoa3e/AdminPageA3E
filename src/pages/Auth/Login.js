import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import styles from "../../assets/css/pages/Login.module.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";
import { Form as FormBt } from "react-bootstrap";
import * as yup from "yup";
import logo from "../../assets/img/logo.jpeg";
import CustomButton from "../../components/shared/CustomButton";
import { TextInput } from "../../components/shared/TextInput";

function Login() {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //código provisional, no proporciona estado ni contexto
  const handleOnSubmit = (values, resetForm) => {
    login(values.email, values.password);
  };

  const objectSchema = yup.object({
    email: yup
      .string()
      .email("El email debe ser válido")
      .required("El email es requerido"),
    password: yup.string().required("La contraseña es requerida"),
  });

  return (
    <>
      <div className="container mt-5">
        <h1 className={`${styles.subtitle} mb-4`}>
          Sistema de Gestión de Páginas web de A3E Ingenieros
        </h1>
        <div className="row">
          <div className="col-12 col-md-6">
            <h2 className={`${styles.title} mb-2`}>Iniciar sesión</h2>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values, { resetForm }) => {
                handleOnSubmit(values, resetForm);
              }}
              validationSchema={objectSchema}
            >
              {({ errors, values, touched }) => (
                <Form className={`${styles.loginContainer}`}>
                  <FormBt.Group className="mb-3">
                    <TextInput
                      label="Correo electrónico"
                      name="email"
                      placeholder="ejemplo@a3e.com.mx"
                      isInvalid={!!errors.email && touched.email}
                    />
                  </FormBt.Group>
                  <FormBt.Group className="mb-4">
                    <TextInput
                      autoComplete="off"
                      label="Contraseña"
                      name="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      isInvalid={!!errors.password && touched.password}
                      icon={showPassword ? IoMdEye : IoMdEyeOff}
                      onIconClick={toggleShowPassword}
                    />
                    <Link
                      className={styles.loginForgotPassword}
                      // onClick={handleShow}
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </FormBt.Group>
                  <div className="text-center">
                    <CustomButton
                      text="Iniciar sesión"
                      className="w-100"
                      type="submit"
                      disabled={
                        !values.email ||
                        !values.password ||
                        !!errors.email ||
                        !!errors.password
                      }
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <div className={styles.imgContainer}>
              <img className={styles.imgLogin} src={logo} alt="Login img" />
            </div>
          </div>
        </div>
      </div>
      {/* <ModalEmail handleClose={handleClose} show={show} /> */}
    </>
  );
}

export default Login;
