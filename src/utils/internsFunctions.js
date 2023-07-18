import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

export const getAllInterns = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/intern/getAll-interns"
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const changeInternStatus = async (id) => {
  showLoadingAlert("Actualizando status...", "Espere un momento por favor.");

  try {
    const response = await axios.patch(
      instance.defaults.baseURL + `/intern/changeStatus-intern/${id}`
    );

    if (response.data.msg === "Intern status changed") {
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

export const deleteIntern = async (id) => {
  showLoadingAlert("Eliminando...", "Espere un momento por favor.");

  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/intern/deleteById-intern/${id}`
    );

    if (response.data.msg === "Intern deleted") {
      Toast.fire({
        icon: "success",
        title: "¡Solicitud eliminado con éxito! 😄",
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
