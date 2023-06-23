import axios from "axios";
import instance from "../shared/Axios";

export const getAllInterns = async () => {
  try {
    const response = await instance.get("/intern/getAll-intern");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
