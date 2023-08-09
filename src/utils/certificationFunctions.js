import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

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

export const getCertificationById = async (id) => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + `/certification/getById-certification/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveCertification = async (values, resumeContent, file, navigate) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", resumeContent);
  formData.append("image", file);
  formData.append("link", values.link);
  showLoadingAlert("Creando certificado...", "Espere un momento por favor.");

  try {
    const response = await axios.post(
      instance.defaults.baseURL + "/certification/create-certification",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.msg === "Certification saved") {
      Toast.fire({
        icon: "success",
        title: "¡Certificado creado exitosamente! 😄",
      });

      navigate("/certifications");
    }
  } catch (error) {
    console.log(error);
    if (error.response.data.msg === "Certification already exists") {
      Toast.fire({
        icon: "error",
        title: "Ya existe un certificado con ese título 🫤",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
};

export const updateCertification = async(id, values,resumeContent, file, navigate)=>{
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", resumeContent);
  formData.append("image", file);
  formData.append("link", values.link);

  showLoadingAlert("Actualizando certificado...", "Espere un momento por favor.");
  try{
    const response = await axios.put(
      instance.defaults.baseURL + `/certification/updateById-certification/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.msg === "Certification updated") {
      Toast.fire({
        icon: "success",
        title: "¡Certificado actualizado exitosamente! 😄",
      });

      navigate("/certifications");
    }
  }catch(error){
    console.log(error);
    if (error.response.data.msg === "Certification already exists") {
      Toast.fire({
        icon: "error",
        title: "Ya existe un certificado con ese título 🫤",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
}

export const updateStatusCertification = async (id)=>{
  showLoadingAlert("Actualizando status...", "Espere un momento por favor.");
  try{
    const response = await axios.patch(
      instance.defaults.baseURL + `/certification/updateStatus-certification/${id}`
    );

    if (response.data.msg === "Certification status updated") {
      Toast.fire({
        icon: "success",
        title: "¡Status cambiado con éxito! 😄",
      });
    }
  }catch(error){
    console.log(error);
    Toast.fire({
      icon: "error",
      title: "Error del servidor 😞",
    });
  }
} 

export const deleteCertification = async (id)=>{
  showLoadingAlert("Eliminando certificado...", "Espere un momento por favor.");

  try{
    const response = await axios.delete(
      instance.defaults.baseURL + `/certification/deleteById-certification/${id}`
    );

    if (response.data.msg === "Certification deleted") {
      Toast.fire({
        icon: "success",
        title: "¡Certificado eliminado con éxito! 😄",
      });
    }
  }catch(error){
    console.log(error);
    Toast.fire({
      icon: "error",
      title: "Error del servidor 😞",
    });
  }
}