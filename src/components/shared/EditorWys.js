import React, { useRef } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import instance from '../../shared/Axios';
import { Button } from 'react-bootstrap';
import Prueba from '../getWysInfo';
import { Editor } from '@tinymce/tinymce-react';




function EditorWys() {

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };


  return (
    <>
      <Editor
        apiKey="mx8xfbfszwym72a4mhwdhb2czmco4whjp4bls89y26ov210t"
        initialValue="<p>Escribe aquí...</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'anchor', 'autolink', 'autoresize', 'autosave',
            'charmap', 'code', 'codesample', 'directionality',
            'emoticons', 'fullscreen', 'help', 'hr', 'image', 'imagetools', 'importcss',
            'insertdatetime', 'link', 'lists', 'media', 'nonbreaking',
            'noneditable', 'pagebreak', 'paste', 'preview', 'print', 'quickbars', 'save',
            'searchreplace', 'tabfocus', 'table',
            'textpattern', 'toc', 'visualblocks', 'visualchars', 'wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | ' +
            'outdent indent | numlist bullist | ' +
            'link unlink image | media | table | ' +
            'forecolor backcolor | removeformat | code | fullscreen | help',
        }}
        onEditorChange={(content, editor) => {
          console.log(content);
        }}
      />
      
    </>
  );
}

export default EditorWys