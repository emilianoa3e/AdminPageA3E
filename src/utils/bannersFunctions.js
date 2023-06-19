import axios from "axios";
import instance from "../shared/Axios";

export const saveBanner = async (title, description, image, link) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("link", link);

    const response = await axios.post(
      instance.defaults.baseURL + "/banner/create-banner",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
    return error.response.data;
  }
};

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
