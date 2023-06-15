import React, { useState, useEffect } from "react";
import {
  MdCopyAll,
  MdInsertPhoto,
  MdMovie,
  MdPermMedia,
  MdDeleteForever,
} from "react-icons/md";
import { Row, Col, Container, Card } from "react-bootstrap";
import {
  uploadMultimedia,
  getAllMedia,
  deleteMultimedia,
} from "../../utils/galeryFunctions";
import { showLoadingAlert, Toast } from "../../shared/plugins/alert";
import FileDropzone from "./Dropzone";

function Galery() {
  const [maxHeight, setMaxHeight] = useState(380);
  const [mediaList, setMediaList] = useState([
    {
      _id: "",
      url: "",
      type: "",
    },
  ]);
  const [filter, setFilter] = useState("all");
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const galleryHeight = windowHeight - 330;
      setMaxHeight(galleryHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getMedia = async () => {
      const data = await getAllMedia();
      setMediaList(data);
    };

    getMedia();
  }, []);

  const handleFileUpload = async (files) => {
    try {
      showLoadingAlert(
        "Cargando",
        "Por favor espera mientras se carga el multimedia..."
      );

      const response = await uploadMultimedia(files);

      if (response.msg === "Multimedia saved") {
        Toast.fire({
          icon: "success",
          title: "Multimedia cargado con éxito 😄",
        });
      }

      const updatedMediaList = await getAllMedia();
      setMediaList(updatedMediaList);
      setUploadedFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      showLoadingAlert(
        "Eliminando",
        "Por favor espera mientras se elimina el multimedia..."
      );

      const response = await deleteMultimedia(id);

      if (response.msg === "Multimedia deleted") {
        Toast.fire({
          icon: "success",
          title: "Multimedia eliminado con éxito 😄",
        });
      }

      const updatedMediaList = await getAllMedia();
      setMediaList(updatedMediaList);
    } catch (error) {
      console.log(error);
    }
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const filteredMediaList = mediaList.filter((media) => {
    if (filter === "all") {
      return true;
    } else {
      return media.type === filter;
    }
  });

  return (
    <Container className="fluid">
      <Row>
        <Col>
          <FileDropzone
            onFileUpload={handleFileUpload}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        </Col>
      </Row>
      <Card>
        <Card.Header>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <MdPermMedia
                onClick={() => handleFilterChange("all")}
                size={30}
                style={{
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: "#3B97D3",
                }}
              />
            </Col>
            <Col style={{ textAlign: "center" }}>
              <MdInsertPhoto
                onClick={() => handleFilterChange("image")}
                size={30}
                style={{
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: "#3B97D3",
                }}
              />
            </Col>
            <Col style={{ textAlign: "center" }}>
              <MdMovie
                onClick={() => handleFilterChange("video")}
                size={30}
                style={{
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: "#3B97D3",
                }}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={{ overflowY: "auto", maxHeight: `${maxHeight}px` }}>
          <Row>
            {filteredMediaList.map((media) => (
              <Card style={{ marginBottom: "15px" }} key={media._id}>
                <Card.Body style={{ padding: "0px" }}>
                  {media.type === "image" ? (
                    <img
                      src={media.multimedia}
                      alt="..."
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
                    <video
                      src={media.multimedia}
                      alt="..."
                      controls
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </Card.Body>
                <Card.Footer style={{ textAlign: "center" }}>
                  <Col style={{ alignItems: "center" }}>
                    <MdCopyAll
                      onClick={() => copyToClipboard(media.multimedia)}
                      style={{
                        cursor: "pointer",
                        fontSize: "1.5rem",
                        marginRight: "80px",
                      }}
                    />
                    <MdDeleteForever
                      onClick={() => handleDelete(media._id)}
                      style={{
                        cursor: "pointer",
                        fontSize: "1.5rem",
                        color: "#F5462F",
                      }}
                    />
                  </Col>
                </Card.Footer>
              </Card>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Galery;
