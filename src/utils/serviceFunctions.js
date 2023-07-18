import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

export const saveService = async (values, content, navigate) => {
  showLoadingAlert("Creando servicio...", "Espere un momento por favor.");

  try {
    const response = await axios.post(
      instance.defaults.baseURL + "/service/create-service",
      {
        title: values.title,
        subtitle: values.subtitle,
        summary: values.summary,
        content,
      }
    );

    if (response.data.msg === "Service saved") {
      Toast.fire({
        icon: "success",
        title: "¡Servicio creado exitosamente! 😄",
      });

      navigate("/services");
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "Service already exists") {
      Toast.fire({
        icon: "error",
        title: "Ya existe un servicio con ese título 🫤",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
};

export const getAllServices = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/service/getAll-services"
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + `/service/getById-service/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const updateService = async (id, values, content, navigate) => {
  showLoadingAlert("Actualizando servicio...", "Espere un momento por favor.");

  try {
    const response = await axios.put(
      instance.defaults.baseURL + `/service/updateById-service/${id}`,
      {
        title: values.title,
        subtitle: values.subtitle,
        summary: values.summary,
        content,
      }
    );

    if (response.data.msg === "Service updated") {
      Toast.fire({
        icon: "success",
        title: "¡Servicio actualizado exitosamente! 😄",
      });

      navigate("/services");
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "Service already exists") {
      Toast.fire({
        icon: "error",
        title: "Ya existe un servicio con ese título 🫤",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
};

export const deleteService = async (id) => {
  showLoadingAlert("Eliminando servicio...", "Espere un momento por favor.");

  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/service/deleteById-service/${id}`
    );

    if (response.data.msg === "Service deleted") {
      Toast.fire({
        icon: "success",
        title: "¡Servicio eliminado exitosamente! 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    Toast.fire({
      icon: "error",
      title: "Error al eliminar el servicio 😞",
    });
  }
};
