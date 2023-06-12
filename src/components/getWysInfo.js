import React from 'react'
import ReactQuill from 'react-quill';
import instance from '../shared/Axios';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Prueba() {
//todo el codigo es orueba, no usar como componente

    const [responseData, setResponseData] = useState(null);

    const getData = async () =>{
        try{
            const data = await axios.get('http://localhost:8080/api/tiny/getById/64874426e6c42543d92be8e7')
            console.log(data.data.tiny.content)
            setResponseData(data.data.tiny.content)
         }catch(error){
             console.log(error)
         }
    }
   
   getData()

    return (
        <>
            {responseData && (
                <div>
                    <h2>Datos obtenidos:</h2>
                    <div dangerouslySetInnerHTML={{ __html: responseData }}></div>
                </div>
            )}
        </>

    )
}

export default Prueba