import React from 'react'
import "react-quill/dist/quill.snow.css";
import { Editor } from "@tinymce/tinymce-react";

function EditorText({setContent, initialContent}) {

  return (
    <>
      <Editor
        apiKey="mx8xfbfszwym72a4mhwdhb2czmco4whjp4bls89y26ov210t"
        initialValue={initialContent}
        init={{
          language: "es",
          menubar: false, // Set menubar to false to hide the menu bar
          plugins: ["paste", "autoresize", "wordcount"], // Keep only the "paste" plugin for plain text editing
          toolbar:
            "undo redo | " + // Only keep undo and redo buttons
            "bold italic underline strikethrough forecolor | fontsizeinput " , // Keep basic text formatting options
             // Keep the option to remove formatting
          paste_as_text: true, // This will paste content as plain text
          maxlength: 10,
          highlight_on_focus: true
        }}
        onEditorChange={(content) => {
          setContent(content);
        }}
      />
    </>
  )
}

export default EditorText