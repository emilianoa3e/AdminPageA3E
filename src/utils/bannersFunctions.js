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

export const updateStatus = async (id) => {
  try {
    const response = await axios.patch(
      instance.defaults.baseURL + `/banner/updateStatus-banner/${id}`
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export const deleteBanner = async (id) => {
  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/banner/deleteById-banner/${id}`
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}
