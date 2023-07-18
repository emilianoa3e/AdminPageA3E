import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

export const getAllVacancies = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/vacancie/getAll-vacancies"
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const changeVacancieStatus = async (id) => {
  showLoadingAlert("Actualizando status...", "Espere un momento por favor.");

  try {
    const response = await axios.patch(
      instance.defaults.baseURL + `/vacancie/changeStatus-vacancie/${id}`
    );

    if (response.data.msg === "Vacancie status changed") {
      Toast.fire({
        icon: "success",
        title: "¡Status cambiado con éxito! 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    Toast.fire({
      icon: "error",
      title: "Error en el servidor 😞",
    });
  }
};

export const deleteVacancie = async (id) => {
  showLoadingAlert("Eliminando...", "Espere un momento por favor.");

  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/vacancie/deleteById-vacancie/${id}`
    );

    if (response.data.msg === "Vacancie deleted") {
      Toast.fire({
        icon: "success",
        title: "¡Solicitud eliminada con éxito! 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    Toast.fire({
      icon: "error",
      title: "Error en el servidor 😞",
    });
  }
}
