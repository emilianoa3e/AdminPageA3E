import axios from "axios";
import instance from "../shared/Axios";
import {
  Toast,
  showLoadingAlert,
  showSimpleAlert,
} from "../shared/plugins/alert";

export const loginPost = async (email, password) => {
  const dataJson = {
    email,
    password,
  };

  showLoadingAlert("Iniciando sesión...", "Por favor, espere un momento.");

  try {
    const response = await axios.post(
      instance.defaults.baseURL + "/auth/signin",
      dataJson
    );

    if (
      response.data.msg === "User logged" &&
      (response.data.data.role === "admin" ||
        response.data.data.role === "reclutador")
    ) {
      Toast.fire({
        icon: "success",
        title: "Bienvenido de nuevo 😄",
      });
      return response.data.token;
    }

    Toast.fire({
      icon: "error",
      title: "No tienes permisos para acceder a esta página 😞",
    });
  } catch (error) {
    console.log("error", error);

    if (
      error.response.data.msg === "User not found" ||
      error.response.data.msg === "Invalid password"
    ) {
      Toast.fire({
        icon: "error",
        title: "Correo y/o contraseña incorrectos 😞",
      });
    } else if (error.response.data.msg === "User disabled") {
      Toast.fire({
        icon: "error",
        title: "Tu cuenta ha sido deshabilitada 😞",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error en el servidor 😞",
      });
    }
  }
};

export const forgotPasswordPost = async (values) => {
  showLoadingAlert(
    "Enviando correo de recuperación...",
    "Por favor, espere un momento."
  );

  try {
    const response = await axios.post(
      instance.defaults.baseURL + "/auth/forgot-password",
      {
        email: values.email,
      }
    );

    if (response.data.msg === "Email sent") {
      showSimpleAlert(
        "Correo enviado",
        "Se ha enviado un correo de recuperación de contraseña a tu correo electrónico. Por favor, revisa tu bandeja de entrada.",
        "success"
      );
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "User not found") {
      showSimpleAlert(
        "Correo no encontrado",
        "El correo electrónico ingresado no se encuentra registrado.",
        "error"
      );
    } else if (error.response.data.msg === "User disabled") {
      showSimpleAlert(
        "Cuenta deshabilitada",
        "Tu cuenta ha sido deshabilitada. Por favor, contacta con el administrador.",
        "error"
      );
    } else {
      Toast.fire({
        icon: "error",
        title: "Error en el servidor 😞",
      });
    }
  }
};

export const resetPasswordPost = async (values, token, navigate) => {
  showLoadingAlert(
    "Actualizando contraseña...",
    "Por favor, espere un momento."
  );

  try {
    const response = await axios.post(
      instance.defaults.baseURL + `/auth/reset-password/${token}`,
      {
        password: values.password,
      }
    );

    if (response.data.msg === "Password reset") {
      showSimpleAlert(
        "Contraseña actualizada",
        "Tu contraseña ha sido actualizada correctamente. Inicia sesión con tu nueva contraseña.",
        "success"
      );
      navigate("/login");
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "Invalid token") {
      showSimpleAlert(
        "Enlace expirado o inválido",
        "El enlace ha expirado o es inválido. Por favor, solicita un nuevo correo de recuperación de contraseña.",
        "error"
      );
    } else if (error.response.data.msg === "Password is the same") {
      showSimpleAlert(
        "Error al actualizar contraseña",
        "La contraseña ingresada es la misma que tienes actualmente. Por favor, ingresa una contraseña diferente.",
        "error"
      );
    } else {
      Toast.fire({
        icon: "error",
        title: "Error en el servidor 😞",
      });
    }
  }
};

export const renewToken = async (dispatch) => {
  const token = localStorage.getItem("token") || null;

  if (token) {
    try {
      const resp = await axios.post(
        instance.defaults.baseURL + "/auth/renew-token",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.data) {
        const data = resp.data;
        const token = data.token;
        const fullName = data.data.name + " " + data.data.lastname;
        const id = data.data.id;
        const email = data.data.email;
        const role = data.data.role;

        if (role === "admin" || role === "reclutador") {
          localStorage.setItem("token", token);

          dispatch({
            type: "LOGIN",
            payload: {
              fullName,
              id,
              email,
              role,
            },
          });
        } else {
          localStorage.removeItem("token");
          dispatch({
            type: "LOGOUT",
          });
          return;
        }
      } else {
        localStorage.removeItem("token");
        dispatch({
          type: "LOGOUT",
        });
      }

      dispatch({
        type: "IS_LOADING",
        payload: false,
      });
    } catch (error) {
      console.log(error);
      if (error.response.data.msg === "Invalid token") {
        showSimpleAlert(
          "Tu sesión ha expirado",
          "Por favor, inicia sesión nuevamente.",
          "error"
        );
      }
      localStorage.removeItem("token");
      dispatch({
        type: "LOGOUT",
      });

      dispatch({
        type: "IS_LOADING",
        payload: false,
      });
    }
  } else {
    dispatch({
      type: "LOGOUT",
    });
  }
};
