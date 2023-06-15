import axios from "axios";
import instance from "../shared/Axios";

export const saveService = async (title, content) => {
  try {
    const response = await axios.post(
      instance.defaults.baseURL + "/service/create-service",
      {
        title,
        content,
      }
    );

    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("error", error.response.data);
    return error.response.data;
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

export const updateService = async (id, title, content) => {
  try {
    const response = await axios.put(
      instance.defaults.baseURL + `/service/updateById-service/${id}`,
      {
        title,
        content,
      }
    );
    return response.data;
  } catch (error) {
    console.log("error", error.response.data);
    return error.response.data;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/service/deleteById-service/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
