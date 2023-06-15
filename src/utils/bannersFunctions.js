import axios from "axios";
import instance from "../shared/Axios";

export const getAllBanners = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/banner/getAll-banners"
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
