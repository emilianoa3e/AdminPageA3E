import axios from "axios";
import { messages } from "../utils/messages";
import instance from "../shared/Axios";

export const saveService = async (title, content) => {
  try {
    console.log("title", title);
    console.log("content", content);
    const response = await axios.post(
      instance.defaults.baseURL + "/service/create-service",
      {
        title,
        content,
      }
    );

    return response.data;
  } catch (error) {
    const { data } = error;

    if (data.message === messages.login.errorCrendentials) {
      console.log("error", data.message);
      return null;
    }

    if (data.message === messages.login.errorServer) {
      console.log("error", data.message);
      return null;
    }

    console.log("error", data.message);

    return null;
  }
};

export const getAllServices = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/service/getAll-services"
    );
    return response.data;
  } catch (error) {
    const { data } = error;

    if (data.message === messages.login.errorCrendentials) {
      console.log("error", data.message);
      return null;
    }

    if (data.message === messages.login.errorServer) {
      console.log("error", data.message);
      return null;
    }

    console.log("error", data.message);

    return null;
  }
};

export const getServiceById = async (id) => {
  try {
    console.log("id del function", id);
    const response = await axios.get(
      instance.defaults.baseURL + `/service/getById-service/${id}`
    );
    return response.data;
  } catch (error) {
    const { data } = error;

    if (data.message === messages.login.errorCrendentials) {
      console.log("error", data.message);
      return null;
    }

    if (data.message === messages.login.errorServer) {
      console.log("error", data.message);
      return null;
    }

    console.log("error", data.message);

    return null;
  }
};
