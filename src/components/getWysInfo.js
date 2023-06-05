import React from 'react'
import ReactQuill from 'react-quill';
import instance from '../shared/Axios';
import { useEffect, useState } from 'react';
function Prueba() {

    const [exampleData, setExampleData] = useState(null);

    useEffect(() => {
        getExampleData();
    }, []);

    const getExampleData = async () => {
        try {
            const response = await instance.get('/topic/getAll-topics'); // Actualiza con la ruta específica de tu API

            if (response.error) {
                console.log(response.error);
            } else {
                console.log(response); // Aquí puedes acceder a los datos devueltos por la API
            }

            setExampleData(response)

        } catch (error) {
            console.log(error);
        }
    };

    if (!exampleData) {
        return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
      }

    const htmlContent =exampleData.topics[0].topics[0].description || 'vacio';
    console.log(htmlContent);


    return (
        <div>
            {exampleData ? (
                <div>
                    {/* Aquí puedes acceder a las propiedades del ejemploData y mostrarlas */}

                    <div>
                        {/* <ReactQuill value={htmlContent} readOnly={true} /> */} 
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>

                    {/* ... */}
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    )
}

export default Prueba