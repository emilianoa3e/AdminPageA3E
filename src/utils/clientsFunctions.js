import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

export const saveClient = async (values, file) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("image", file);

  showLoadingAlert("Creando cliente...", "Espere un momento por favor.");

  try {
    const response = await axios.post(
      instance.defaults.baseURL + "/client/create-client",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.msg === "Client saved") {
      Toast.fire({
        icon: "success",
        title: "Cliente creado exitosamente 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "Client already exists") {
      Toast.fire({
        icon: "error",
        title: "El cliente ya existe 😅",
      });
    } else if (error.response.data.msg === "Error uploading image") {
      Toast.fire({
        icon: "error",
        title: "Error al subir la imagen 😞",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
};

export const getAllClients = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/client/getAll-clients"
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteClient = async (id) => {
  showLoadingAlert("Eliminando cliente...", "Espere un momento por favor.");

  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/client/deleteById-client/${id}`
    );

    if (response.data.msg === "Client deleted") {
      Toast.fire({
        icon: "success",
        title: "Cliente eliminado exitosamente 😄",
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
