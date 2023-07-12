import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

export const saveBanner = async (values, file, navigate) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("image", file);
  formData.append("link", values.link);

  showLoadingAlert("Creando banner...", "Espere un momento por favor.");

  try {
    const response = await axios.post(
      instance.defaults.baseURL + "/banner/create-banner",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.msg === "Banner saved") {
      Toast.fire({
        icon: "success",
        title: "Banner creado exitosamente 😄",
      });

      navigate("/banners");
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "Banner already exists") {
      Toast.fire({
        icon: "error",
        title: "Ya existe un banner con ese título 🫤",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
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

export const getBannerById = async (id) => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + `/banner/getById-banner/${id}`
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const updateBanner = async (id, values, file, navigate) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("image", file);
  formData.append("link", values.link);

  showLoadingAlert("Actualizando banner...", "Espere un momento por favor.");

  try {
    const response = await axios.put(
      instance.defaults.baseURL + `/banner/updateById-banner/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.msg === "Banner updated") {
      Toast.fire({
        icon: "success",
        title: "Banner actualizado exitosamente 😄",
      });

      navigate("/banners");
    }
  } catch (error) {
    console.log("error", error);

    if (error.response.data.msg === "Banner already exists") {
      Toast.fire({
        icon: "error",
        title: "Ya existe un banner con ese título 😞",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
};

export const updateStatus = async (id) => {
  showLoadingAlert("Actualizando status...", "Espere un momento por favor.");

  try {
    const response = await axios.patch(
      instance.defaults.baseURL + `/banner/updateStatus-banner/${id}`
    );

    if (response.data.msg === "Banner status updated") {
      Toast.fire({
        icon: "success",
        title: "Status cambiado con éxito 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    Toast.fire({
      icon: "error",
      title: "Error del servidor 😞",
    });
  }
};

export const deleteBanner = async (id) => {
  showLoadingAlert("Eliminando banner...", "Espere un momento por favor.");

  try {
    const response = await axios.delete(
      instance.defaults.baseURL + `/banner/deleteById-banner/${id}`
    );

    if (response.data.msg === "Banner deleted") {
      Toast.fire({
        icon: "success",
        title: "Banner eliminado con éxito 😄",
      });
    }
  } catch (error) {
    console.log("error", error);

    Toast.fire({
      icon: "error",
      title: "Error del servidor 😞",
    });
  }
};
