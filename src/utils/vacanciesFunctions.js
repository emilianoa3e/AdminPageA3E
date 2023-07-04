import axios from "axios";
import instance from "../shared/Axios";

export const getAllVacancies = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/vacancie/getAll-vacancies"
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
