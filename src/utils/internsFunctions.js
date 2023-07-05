import axios from "axios";
import instance from "../shared/Axios";

export const getAllInterns = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/intern/getAll-interns"
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};