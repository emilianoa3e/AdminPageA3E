import axios from "axios";
import { messages } from "./messages";
import instance from "../shared/Axios";

export const uploadMultimedia = async (file) => {
  try {
    const formData = new FormData();
    formData.append("multimedia", file);

    const response = await axios.post(
      instance.defaults.baseURL + "/galery/save",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

export const getAllMedia = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/galery/getAll-galery"
    );

    return response.data.multimedia;
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

export const deleteMultimedia = async (id) => {
  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/galery/delete/${id}`
    );

    return response.data.message;
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