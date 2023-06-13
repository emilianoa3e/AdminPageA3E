import React, { useState, useEffect } from "react";
import {
  MdCopyAll,
  MdInsertPhoto,
  MdMovie,
  MdReorder,
  MdDeleteForever,
} from "react-icons/md";
import { Row, Col, Container, Card } from "react-bootstrap";
import CustomButton from "./CustomButton";
import { getAllMedia, deleteMultimedia } from "../../utils/galeryFunctions";
import FileDropzone from "./Dropzone";

function Galery() {
  const [mediaList, setMediaList] = useState([
    {
      url: "",
      type: "",
    },
  ]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const getMedia = async () => {
      const data = await getAllMedia();
      setMediaList(data);
    };

    getMedia();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMultimedia(id);
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

  const handleFileUpload = (files) => {
    // Aquí puedes manejar los archivos subidos, por ejemplo, enviarlos al servidor
    console.log(files);
  };

  return (
    <Container className="fluid">
      <Row>
        <Col>
          <FileDropzone onFileUpload={handleFileUpload}/>
        </Col>
      </Row>
      <Card>
        <Card.Header>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <CustomButton
                text="Todos"
                disabled={filter === "all"}
                onClick={() => handleFilterChange("all")}
              />
            </Col>
            <Col style={{ textAlign: "center" }}>
              <CustomButton
                text="Imagenes"
                disabled={filter === "image"}
                onClick={() => handleFilterChange("image")}
              />
            </Col>
            <Col style={{ textAlign: "center" }}>
              <CustomButton
                text="Videos"
                disabled={filter === "video"}
                onClick={() => handleFilterChange("video")}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={{ overflowY: "auto", maxHeight: "490px" }}>
          <Row>
            {filteredMediaList.map((media) => (
              <Col xs={6}>
                <Card style={{ marginBottom: "15px" }} key={media._id}>
                  {media.type === "image" ? (
                    <img
                      src={media.multimedia}
                      className="card-img-top"
                      alt="..."
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
                    <video
                      src={media.multimedia}
                      className="card-img-top"
                      alt="..."
                      controls
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                  <Card.Footer style={{ textAlign: "center" }}>
                    <Col className="d-flex">
                      <MdCopyAll
                        onClick={() => copyToClipboard(media.multimedia)}
                        style={{
                          cursor: "pointer",
                          fontSize: "1.5rem",
                          flex: 0.5,
                        }}
                      />
                      <MdDeleteForever
                        onClick={() => handleDelete(media._id)}
                        style={{
                          cursor: "pointer",
                          fontSize: "1.5rem",
                          color: "#F5462F",
                          flex: 0.5,
                        }}
                      />
                    </Col>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Galery;
