import axios from "axios";
import instance from "../shared/Axios";

export const getUser = async (id) => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + `/user/getById-user/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
