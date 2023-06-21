import React, { useState, useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import { getAllMedia } from "../../utils/galeryFunctions";
import "react-quill/dist/quill.snow.css";
import Prueba from "../getWysInfo";
import { Editor } from "@tinymce/tinymce-react";

function EditorWys({ setContentEditor, initialContent }) {
  return (
    <>
      <Container>
        <Col>
          <Editor
            apiKey="mx8xfbfszwym72a4mhwdhb2czmco4whjp4bls89y26ov210t"
            initialValue={initialContent}
            init={{
              menubar: true,
              plugins: [
                "advlist",
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
                "undo redo fullscreen | formatselect |" +
                "bold italic underline strikethrough forecolor backcolor fontsize fontfamily |" +
                "alignleft aligncenter alignright alignjustify lineheight | " +
                "blocks | numlist bullist | " +
                "removeformat | ltr rtl |",
            }}
            onEditorChange={(content, editor) => {
              setContentEditor(content);
            }}
          />
        </Col>
      </Container>
    </>
  );
}

export default EditorWys;
