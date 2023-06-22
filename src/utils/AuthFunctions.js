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

    if (response.data.msg === "User logged") {
      Toast.fire({
        icon: "success",
        title: "Bienvenido de nuevo 😄",
      });
    }

    return response.data.token;
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
        const fullname = data.fullname;
        const id = data.id;
        const email = data.email;
        const role = data.role;

        localStorage.setItem("token", token);

        dispatch({
          type: "LOGIN",
          payload: {
            fullname,
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
