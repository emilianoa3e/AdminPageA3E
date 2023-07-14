import axios from "axios";
import instance from "../shared/Axios";

export const getAllCertifications = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/certification/getAll-certifications"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
