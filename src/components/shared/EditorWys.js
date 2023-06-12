import React, { useRef, useState } from "react";
import CustomButton from "./CustomButton";
import "react-quill/dist/quill.snow.css";
import instance from "../../shared/Axios";
import Prueba from "../getWysInfo";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

function EditorWys() {
  const editorRef = useRef(null);
  const [content, setContent] = useState(null);

  const handleSubmit = () => {
    if (editorRef) {
      console.log(content);
      // Realizar la llamada a través de Axios
      axios
        .post(instance.defaults.baseURL + "/tiny/save", { content })
        .then((response) => {
          // Manejar la respuesta del servidor
          console.log(response.data);
        })
        .catch((error) => {
          // Manejar los errores
          console.error(error);
        });
    } else {
      console.log("hola");
    }
  };

  return (
    <>
      <Editor
        apiKey="mx8xfbfszwym72a4mhwdhb2czmco4whjp4bls89y26ov210t"
        initialValue=""
        init={{
          menubar: true,
          plugins: [
            "advlist",
            "anchor",
            "autolink",
            "autoresize",
            "charmap",
            "code",
            "codesample",
            "directionality",
            "emoticons",
            "fullscreen",
            "help",
            "image",
            "importcss",
            "insertdatetime",
            "link",
            "lists",
            "media",
            "nonbreaking",
            "pagebreak",
            "preview",
            "quickbars",
            "save",
            "searchreplace",
            "table",
            "visualblocks",
            "visualchars",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | " +
            "outdent indent | numlist bullist | " +
            "link unlink image | media | table | " +
            "forecolor backcolor | removeformat | code | fullscreen | help",
        }}
        onEditorChange={(content, editor) => {
          setContent(content);
        }}
      />
      <CustomButton text="Guardar" onClick={handleSubmit} />
      {/* <Prueba></Prueba> */}
    </>
  );
}

export default EditorWys;
