import React from "react";
import "react-quill/dist/quill.snow.css";
import { Editor } from "@tinymce/tinymce-react";

function EditorText({ setContent, initialContent }) {
  return (
    <>
      <Editor
        apiKey="mx8xfbfszwym72a4mhwdhb2czmco4whjp4bls89y26ov210t"
        initialValue={initialContent}
        init={{
          height: 150,
          language: "es",
          menubar: false,
          plugins: ["paste", "wordcount"],
          toolbar:
            "undo redo | " +
            "bold italic underline strikethrough forecolor | fontsizeinput ",
          paste_as_text: true,
          maxlength: 10,
          highlight_on_focus: true,
        }}
        onEditorChange={(content) => {
          setContent(content);
        }}
      />
    </>
  );
}

export default EditorText;
