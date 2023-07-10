import axios from "axios";
import instance from "../shared/Axios";
import { showLoadingAlert, Toast } from "../shared/plugins/alert";

export const getAllNews = async () => {
  try {
    const response = await axios.get(
      instance.defaults.baseURL + "/new/getAll-news/"
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getNewById = async (id)=>{
  try{
    const response = await axios.get(
      instance.defaults.baseURL + `/new/getById-new/${id}`
    );
    return response.data;
    
  }catch(error){
    console.log("error", error)
  }
}

export const saveNew = async (values, content, navigate) => {
  showLoadingAlert("Creando noticia...", "Espere un momento por favor.");
  try {
    const response = await axios.post(
      instance.defaults.baseURL + "/new/create-new",
      {
        title: values.title,
        type: values.type,
        summary: values.summary,
        content,
      }
    );

    if (response.data.msg === "New saved") {
      Toast.fire({
        icon: "success",
        title: "Noticia creada exitosamente 😄",
      });

      navigate("/news");
    }
  } catch (error) {
    console.log("error", error);
    if (error.response.data.msg === "New already exists") {
      Toast.fire({
        icon: "error",
        title: "Ya existe una Noticia con ese título 😞",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
};

export const updateNew = async (id, values, content, navigate) =>{
  showLoadingAlert("Actualizando noticia...", "Espere un momento por favor.");
  try{  
    const response = await axios.put(
      instance.defaults.baseURL + `/new/updateById-new/${id}` ,
      {
        title: values.title,
        type: values.type,
        summary: values.summary,
        content,
      }
    );

    if (response.data.msg === "New updated") {
      Toast.fire({
        icon: "success",
        title: "Noticia actualizado exitosamente 😄",
      });

      navigate("/news");
    }
  }catch(error){
    console.log("error", error)
    if (error.response.data.msg === "New already exists") {
      Toast.fire({
        icon: "error",
        title: "Ya existe una noticia con ese título 😞",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error del servidor 😞",
      });
    }
  }
}

export const deleteNew = async (id)=>{
  try{
    const response = await axios.delete(
      instance.defaults.baseURL + `/new/deleteById-new/${id}`
    );

    if (response.data.msg === "New deleted") {
      Toast.fire({
        icon: "success",
        title: "Noticia eliminado exitosamente 😄",
      });
    }
  }catch(error){
    console.log("error", error)
    Toast.fire({
      icon: "error",
      title: "Error al eliminar la noticia 😞",
    });
  }
}