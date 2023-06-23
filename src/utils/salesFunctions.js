import axios from "axios";
import instance from "../shared/Axios";

export const getAllSales = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/sale/getAll-sales"
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
