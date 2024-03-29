import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

export const createContact = async (values) => {
  showLoadingAlert("Creando contacto...", "Espere un momento por favor.");

  try {
    const response = await axios.post(
      instance.defaults.baseURL + "/contact/create-contact",
      { type: values.type, contact: values.contact, destiny: values.destiny }
    );

    if (response.data.msg === "Contact saved") {
      Toast.fire({
        icon: "success",
        title: "¡Contacto creado exitosamente! 😄",
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

export const getAllContacts = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/contact/getAll-contacts"
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getContactById = async (id) => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + `/contact/getById-contact/${id}`
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const updateContact = async (id, values) => {
  showLoadingAlert("Actualizando contacto...", "Espere un momento por favor.");

  try {
    const response = await axios.put(
      instance.defaults.baseURL + `/contact/updateById-contact/${id}`,
      { type: values.type, contact: values.contact, destiny: values.destiny }
    );

    if (response.data.msg === "Contact updated") {
      Toast.fire({
        icon: "success",
        title: "¡Contacto actualizado exitosamente! 😄",
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

export const deleteContact = async (id) => {
  showLoadingAlert("Eliminando contacto...", "Espere un momento por favor.");

  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/contact/deleteById-contact/${id}`
    );

    if (response.data.msg === "Contact deleted") {
      Toast.fire({
        icon: "success",
        title: "¡Contacto eliminado exitosamente! 😄",
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
