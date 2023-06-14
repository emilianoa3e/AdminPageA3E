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
import FileDropzone from "./Dropzone";

function Galery() {
  const [maxHeight, setMaxHeight] = useState(380);
  const [mediaList, setMediaList] = useState([
    {
      url: "",
      type: "",
    },
  ]);
  const [filter, setFilter] = useState("all");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      console.log("data galery", data);
      setMediaList(data);
    };

    getMedia();
  }, []);

  const handleFileUpload = async (files) => {
    try {
      setIsLoading(true);
      const response = await uploadMultimedia(files);
      const updatedMediaList = await getAllMedia();
      setMediaList(updatedMediaList);
      setUploadedFile(null);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await deleteMultimedia(id);
      const updatedMediaList = await getAllMedia();
      setMediaList(updatedMediaList);
      setIsLoading(false);
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
            isLoading={isLoading}
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
              <Card style={{ marginBottom: "15px" }} key={media.id}>
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
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Galery;
