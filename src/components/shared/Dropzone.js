import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdCloudUpload } from "react-icons/md";
import CustomButton from "./CustomButton";
import "../../assets/css/components/layouts/fileDropzone.css";

const FileDropzone = ({ onFileUpload, uploadedFile, setUploadedFile }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];
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
    accept: "image/*, video/*",
    multiple: false,
    // Agrega una función de validación personalizada para rechazar otros tipos de archivo
    validator: (file) => {
      // Lista de tipos MIME y extensiones de archivo permitidos
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "video/mp4",
      ];
      // Verificar si el tipo de archivo está permitido
      if (!allowedTypes.includes(file.type)) {
        return "Solo se permiten imágenes y videos.";
      }
      return null; // El archivo es válido
    },
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

  return (
    <>
      <div className={getDropzoneClass()} {...getRootProps()}>
        {!uploadedFile && <MdCloudUpload size={50} color="#3B97D3" />}
        <input {...getInputProps()} />
        {isDragAccept && <p>Suelta el archivo aquí...</p>}
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
            onClick={() => onFileUpload(uploadedFile)}
          />
        </div>
      )}
    </>
  );
};

export default FileDropzone;
