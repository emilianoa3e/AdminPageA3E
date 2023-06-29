import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import { MdChevronRight } from "react-icons/md";
import "../../assets/css/components/layouts/BannerToNavigate.css";

function BannerToNavigate({ image, title, navigate, route }) {
  return (
    <div className="container-fluid">
      <Row>
        <Col lg={12}>
          <Card
            className="banner-to-navigate-main"
            style={{ borderRadius: "20px" }}
            onClick={() => navigate(route)}
          >
            <Card.Img
              src={image}
              alt="Banner"
              style={{ borderRadius: "20px", objectFit: "cover" }}
              height={170}
              width="100%"
            />
            <Card.ImgOverlay>
              <div className="banner-to-navigate-overlay">
                <Card.Title className="banner-to-navigate-title text-white">
                  {title}
                </Card.Title>
                <MdChevronRight
                  size={100}
                  style={{
                    color: "#fff",
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                  }}
                />
              </div>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default BannerToNavigate;
