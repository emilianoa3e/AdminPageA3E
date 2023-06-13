import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdCloudUpload } from "react-icons/md";
import CustomButton from "./CustomButton";
import "../../assets/css/components/layouts/fileDropzone.css";

const FileDropzone = ({ onFileUpload }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];
        onFileUpload(file);
        setUploadedFile(file);
      }
    },
    [onFileUpload]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: ".jpg, .jpeg, .png, .mp4",
    multiple: false,
  });

  const getDropzoneClass = () => {
    if (isDragAccept) {
      return "dropzone accept";
    }
    if (isDragReject) {
      return "dropzone reject";
    }
    if (isDragActive) {
      return "dropzone active";
    }
    return "dropzone";
  };

  const handleUpload = () => {
    if (uploadedFile) {
      // Realizar la acción de subir el archivo
      // Aquí puedes llamar a la función para subir el archivo a través de Axios u otra librería
      console.log("Subiendo archivo:", uploadedFile);
      setUploadedFile(null);
    }
  };

  return (
    <>
      <div className={getDropzoneClass()} {...getRootProps()}>
        {!uploadedFile && <MdCloudUpload size={60} color="#3B97D3" />}
        <input {...getInputProps()} />
        {isDragAccept && <p> Suelta el archivo aquí...</p>}
        {isDragReject && <p>Formato de archivo no válido.</p>}
        {!isDragActive && !uploadedFile && (
          <p>
            Arrastra y suelta el archivo aquí, o haz clic para seleccionarlo.
          </p>
        )}
        {uploadedFile && (
          <>
            <p>{uploadedFile.name}</p>
          </>
        )}
      </div>
      {uploadedFile && (
        <div
          className="container"
          style={{ textAlign: "center", marginBottom: "10px" }}
        >
          <CustomButton
            text="Subir multimedia"
            type="button"
            onClick={handleUpload}
          />
        </div>
      )}
    </>
  );
};

export default FileDropzone;
