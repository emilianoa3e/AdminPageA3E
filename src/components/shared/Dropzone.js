import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdCloudUpload } from "react-icons/md";
import CustomButton from "./CustomButton";
import "../../assets/css/components/layouts/fileDropzoneGalery.css";

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

    validator: (file) => {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "video/mp4",
      ];

      if (!allowedTypes.includes(file.type)) {
        return "Solo se permiten imágenes y videos.";
      }
      return null;
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
          className="row"
          style={{ textAlign: "center", marginBottom: "10px" }}
        >
          <div className="col">
            <CustomButton
              text="Guardar"
              type="button"
              color="primary"
              size="medium"
              onClick={() => onFileUpload(uploadedFile)}
            />
          </div>
          <div className="col">
            <CustomButton
              text="Cancelar"
              type="button"
              color="danger"
              size="medium"
              onClick={() => setUploadedFile(null)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FileDropzone;
