import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdCloudUpload } from "react-icons/md";
import { Button } from "@mui/material";
import { MdCheckCircleOutline, MdHighlightOff } from "react-icons/md";
import Colors from "../../utils/Colors";
import "../../assets/css/components/layouts/fileDropzoneGalery.css";

const FileDropzone = ({
  onFileUpload,
  uploadedFile,
  setUploadedFile,
  onContext,
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
      }
    },
    [onFileUpload]
  );

  const getAcceptedFileTypes = () => {
    if (onContext === "multimedia") {
      return ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
    }
    if (onContext === "banner" || onContext === "client") {
      return ["image/jpeg", "image/png", "image/jpg"];
    }
    return "";
  };

  const getFiles = () => {
    if (onContext === "multimedia") {
      return "image/*, video/*";
    }
    if (onContext === "banner" || onContext === "client") {
      return "image/*";
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: getFiles(),
    multiple: false,
    validator: (file) => {
      const allowedTypes = getAcceptedFileTypes();

      if (!allowedTypes.includes(file.type)) {
        return "Formato de archivo no válido.";
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

  if (onContext === "multimedia") {
    return (
      <>
        <div className={getDropzoneClass()} {...getRootProps()}>
          {!uploadedFile && (
            <MdCloudUpload size={50} color={Colors.PalletePrimary} />
          )}
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
              <Button
                variant="contained"
                size="medium"
                endIcon={<MdCheckCircleOutline />}
                onClick={() => onFileUpload(uploadedFile)}
                style={{ fontSize: 12, backgroundColor: Colors.PalletePrimary }}
              >
                Guardar
              </Button>
            </div>
            <div className="col">
              <Button
                variant="contained"
                size="medium"
                endIcon={<MdHighlightOff />}
                onClick={() => setUploadedFile(null)}
                style={{ fontSize: 12, backgroundColor: Colors.PalleteRed }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }

  if (onContext === "banner" || onContext === "client") {
    return (
      <>
        <div className={getDropzoneClass()} {...getRootProps()}>
          {!uploadedFile && (
            <MdCloudUpload size={50} color={Colors.PalletePrimary} />
          )}
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
              <Button
                variant="contained"
                size="medium"
                endIcon={<MdHighlightOff />}
                onClick={() => setUploadedFile(null)}
                style={{ fontSize: 12, backgroundColor: Colors.PalleteRed }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default FileDropzone;
