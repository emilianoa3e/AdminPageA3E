import React from "react";
import { Col, Container } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import { Editor } from "@tinymce/tinymce-react";

function EditorWys({ setContent, initialContent }) {
  return (
    <>
      <Container>
        <Col>
          <Editor
            apiKey="mx8xfbfszwym72a4mhwdhb2czmco4whjp4bls89y26ov210t"
            initialValue={initialContent}
            init={{
              language: "es",
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
                "bold italic underline strikethrough forecolor backcolor fontsizeinput fontfamily |" +
                "alignleft aligncenter alignright alignjustify lineheight | " +
                "blocks | numlist bullist | " +
                "removeformat codesample |",
              font_size_input_default_unit: "px",
              line_height_formats: "1 1.1 1.2 1.3 1.4 1.5 2 2.5 3",
              color_cols: 9,
              font_family_formats:
                "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde;" +
                "Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier;" +
                "Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; JetBrains Mono=monospace; Montagu Slab=serif; Montserrat=sans-serif; Symbol=symbol;" +
                "Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times;" +
                "Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
              images_file_types: "",
            }}
            onEditorChange={(content) => {
              setContent(content);
            }}
          />
        </Col>
      </Container>
    </>
  );
}

export default EditorWys;
