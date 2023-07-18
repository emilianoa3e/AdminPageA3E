import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

export const savePosition = async (values) => {
  showLoadingAlert("Guardando el puesto...", "Espere un momento por favor.");
  try {
    const response = await axios.post(
      instance.defaults.baseURL + `/position/create-position`,
      {
        name: values.name,
      }
    );

    if (response.data.msg === "Position saved") {
      Toast.fire({
        icon: "success",
        title: "¡Puesto creado exitosamente! 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "Position already exists") {
      Toast.fire({
        icon: "error",
        title: "El puesto ya existe 🫤",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
};

export const getAllPositions = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + `/position/getAll-positions`
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const changePositionStatus = async (id) => {
  showLoadingAlert("Actualizando el status...", "Espere un momento por favor.");

  try {
    const response = await axios.patch(
      instance.defaults.baseURL + `/position/changeStatus-position/${id}`
    );

    if (response.data.msg === "Position status changed") {
      Toast.fire({
        icon: "success",
        title: "¡Status actualizado exitosamente! 😄",
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

export const deletePosition = async (id) => {
  showLoadingAlert("Eliminando el puesto...", "Espere un momento por favor.");

  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/position/deleteById-position/${id}`
    );

    if (response.data.msg === "Position deleted") {
      Toast.fire({
        icon: "success",
        title: "¡Puesto eliminado exitosamente! 😄",
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
