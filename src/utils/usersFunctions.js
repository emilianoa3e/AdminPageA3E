import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

export const saveUser = async (values) => {
  showLoadingAlert("Creando usuario...", "Espere un momento por favor.");

  try {
    const response = await axios.post(
      instance.defaults.baseURL + "/user/create-user",
      {
        name: values.name,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        gender: values.gender,
        role: values.role,
      }
    );

    if (response.data.msg === "User saved") {
      Toast.fire({
        icon: "success",
        title: "Usuario creado exitosamente 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "User already exists") {
      Toast.fire({
        icon: "error",
        title: "Ya existe un usuario con ese correo 😞",
      });
    } else if (error.response.data.msg === "Invalid email domain") {
      Toast.fire({
        icon: "error",
        title: "Solo se permiten correos de dominio @a3e.com.mx 🫤",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/user/getAll-users"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const changeStatus = async (id) => {
  showLoadingAlert("Actualizando status...", "Espere un momento por favor.");

  try {
    const response = await axios.patch(
      instance.defaults.baseURL + `/user/changeStatusById-user/${id}`
    );

    if (response.data.msg === "Status changed") {
      Toast.fire({
        icon: "success",
        title: "Status actualizado exitosamente 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    Toast.fire({
      icon: "error",
      title: "Error del servidor 😞",
    });
  }
};

export const deleteUser = async (id) => {
  showLoadingAlert("Eliminando usuario...", "Espere un momento por favor.");

  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/user/deleteById-user/${id}`
    );

    if (response.data.msg === "User deleted") {
      Toast.fire({
        icon: "success",
        title: "Usuario eliminado exitosamente 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    Toast.fire({
      icon: "error",
      title: "Error del servidor 😞",
    });
  }
};
