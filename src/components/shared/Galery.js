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
import { showConfirmDialog } from "../../shared/plugins/alert";
import FileDropzone from "./Dropzone";
import SplashScreen from "../../pages/utils/SplashScreen";
import NotFound from "./NotFound";

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
  const [isLoading, setIsLoading] = useState(false);
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

  const getMedia = async () => {
    setIsLoading(true);
    const data = await getAllMedia();
    setMediaList(data.multimedia);
    setIsLoading(false);
  };

  useEffect(() => {
    getMedia();
  }, []);

  const handleFileUpload = (file) => {
    uploadMultimedia(file).then(() => {
      getAllMedia().then((updatedMediaList) => {
        setMediaList(updatedMediaList.multimedia);
      });
      setUploadedFile(null);
    });
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar este archivo?",
      "Se eliminará el archivo",
      "Si, eliminar",
      "Cancelar",
      () => {
        deleteMultimedia(id).then(() => {
          getAllMedia().then((updatedMediaList) => {
            setMediaList(updatedMediaList.multimedia);
          });
        });
      }
    );
  };

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
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
            onContext="multimedia"
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
            {isLoading ? (
              <SplashScreen isLoading={isLoading} />
            ) : (
              <div>
                {filteredMediaList.length === 0 ? (
                  <NotFound
                    text="No hay multimedia disponible"
                    textSize={20}
                    iconSize={80}
                  />
                ) : (
                  <div>
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
                  </div>
                )}
              </div>
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Galery;
