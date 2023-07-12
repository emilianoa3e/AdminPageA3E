import axios from "axios";
import instance from "../shared/Axios";
import { Toast, showLoadingAlert } from "../shared/plugins/alert";

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
          console.log(typeof role);
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
