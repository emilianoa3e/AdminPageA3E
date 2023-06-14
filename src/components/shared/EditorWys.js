import React from "react";
import { Col, Container } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import Prueba from "../getWysInfo";
import { Editor } from "@tinymce/tinymce-react";


function EditorWys({ setContentEditor, initialContent }) {
  return (
    <>
      <Container>
        {/* <Col style={{ marginBottom: "15px", textAlign: "right" }}>
          <CustomButton text="Guardar" onClick={handleSubmit} />
        </Col> */}
        <Col>
          <Editor
            apiKey="mx8xfbfszwym72a4mhwdhb2czmco4whjp4bls89y26ov210t"
            initialValue={initialContent}
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
              setContentEditor(content);
            }}
          />
        </Col>
        {/* <Prueba></Prueba> */}
      </Container>
    </>
  );
}

export default EditorWys;
