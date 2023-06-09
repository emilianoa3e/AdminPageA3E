import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import instance from '../../shared/Axios';
import { Button } from 'react-bootstrap';
import Prueba from '../getWysInfo';



function EditorWys() {

    

    const [content, setContent] = useState('');

    const handleChange = (value) => {
        setContent(value);
        console.log(content)

    };

    const handleOnSubmit = async () => {
    }


    return (
      <>
          <div>Holi</div>
      </>
    )
}

export default EditorWys