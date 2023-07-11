import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

export const getUser = async (id) => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + `/user/getById-user/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const updateUser = async (id, values, data) => {
  showLoadingAlert(
    "Actualizando información...",
    "Espere un momento por favor."
  );
  try {
    const response = await axios.put(
      instance.defaults.baseURL + `/user/updateById-user/${id}`,
      {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: values.password,
      }
    );

    if (response.data.msg === "User updated") {
      Toast.fire({
        icon: "success",
        title: "Información actualizada exitosamente 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "Invalid password") {
      Toast.fire({
        icon: "error",
        title: "Contraseña incorrecta 😞",
      });
    } else if (error.response.data.msg === "User already exists") {
      Toast.fire({
        icon: "error",
        title: "No puedes usar ese correo electrónico 😞",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
};

export const updatePassword = async (id, values) => {
  showLoadingAlert(
    "Actualizando contraseña...",
    "Espere un momento por favor."
  );
  try {
    const response = await axios.patch(
      instance.defaults.baseURL + `/user/updatePasswordById-user/${id}`,
      {
        password: values.password,
        newPassword: values.newPassword,
      }
    );

    console.log("response", response);

    if (response.data.msg === "Password updated") {
      Toast.fire({
        icon: "success",
        title: "Contraseña actualizada exitosamente 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "Invalid password") {
      Toast.fire({
        icon: "error",
        title: "Contraseña incorrecta 😞",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
};
