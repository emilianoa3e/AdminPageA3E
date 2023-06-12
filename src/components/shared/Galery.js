import React, { useState, useEffect } from "react";
import { MdCopyAll } from "react-icons/md";
import { Row, Col, Container, Card } from "react-bootstrap";
import CustomButton from "./CustomButton";
import axios from "axios";
import instance from "../../shared/Axios";

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
      const response = await axios.get(
        instance.defaults.baseURL + "/galery/getAll-galery"
      );
      setMediaList(response.data.multimedia);
    };

    getMedia();
  }, []);

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
    <Container>
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
              <Col className="col-lg-6 col-md-12" key={media._id}>
                <Card style={{ marginBottom: "15px" }}>
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
                    <MdCopyAll
                      onClick={() => copyToClipboard(media.multimedia)}
                      style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    />
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
