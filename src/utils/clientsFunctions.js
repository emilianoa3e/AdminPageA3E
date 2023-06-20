import axios from "axios";
import instance from "../shared/Axios";

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
