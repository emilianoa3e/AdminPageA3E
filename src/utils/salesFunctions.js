import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

export const getAllSales = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/sale/getAll-sales"
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const changeSaleStatus = async (id) => {
  showLoadingAlert("Actualizando status...", "Espere un momento por favor.");

  try {
    const response = await axios.patch(
      instance.defaults.baseURL + `/sale/changeStatus-sale/${id}`
    );

    if (response.data.msg === "Sale status changed") {
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
}

export const deleteSale = async (id) => {
  showLoadingAlert("Eliminando...", "Espere un momento por favor.");

  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/sale/deleteById-sale/${id}`
    );

    if (response.data.msg === "Sale deleted") {
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
