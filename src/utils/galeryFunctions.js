import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

export const uploadMultimedia = async (file) => {
  const formData = new FormData();
  formData.append("multimedia", file);

  showLoadingAlert("Subiendo multimedia...", "Espere un momento por favor.");

  try {
    const response = await axios.post(
      instance.defaults.baseURL + "/galery/save",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.msg === "Multimedia saved") {
      Toast.fire({
        icon: "success",
        title: "¡Multimedia guardado con éxito! 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "Error uploading multimedia") {
      Toast.fire({
        icon: "error",
        title: "Error al subir multimedia 😞",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
};

export const getAllMedia = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/galery/getAll-galery"
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteMultimedia = async (id) => {
  showLoadingAlert("Eliminando multimedia...", "Espere un momento por favor.");

  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/galery/delete/${id}`
    );

    if (response.data.msg === "Multimedia deleted") {
      Toast.fire({
        icon: "success",
        title: "¡Multimedia eliminado con éxito! 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "Error deleting multimedia") {
      Toast.fire({
        icon: "error",
        title: "Error al eliminar multimedia 😞",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
};
