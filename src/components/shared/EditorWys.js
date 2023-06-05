import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import instance from '../../shared/Axios';
import { Button } from 'react-bootstrap';
import Prueba from '../getWysInfo';

//Functional JSON
const example =
{
    nameSection: "pruebira",
    topics: [
        {
            nameTopic: "Vision",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
            multimedia: [
                {
                    link: ""
                }
            ]
        }
    ]
}

function EditorWys() {

    

    const [content, setContent] = useState('');

    const handleChange = (value) => {
        setContent(value);
        console.log(content)

    };

    const handleOnSubmit = async () => {
        try {
            example.topics[0].description = content
            console.log(example)
          let response = await instance.post(
            `/topic/create-topic`,
            example
          );
      
          if (response.error) {
            console.log(response);
          } else {
            console.log('éxito');
          }
        } catch (error) {
          console.log(error);
        }
      };


    return (

        // <div>
        //     <ReactQuill value={content} onChange={handleChange} />
        //     <Button as="input" type="submit" value="Submit" onClick={handleOnSubmit}/>
        // </div>
        <div>
            <Prueba/>
        </div>
    )
}

export default EditorWys