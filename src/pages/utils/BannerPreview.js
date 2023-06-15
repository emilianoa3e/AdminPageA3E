import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Card } from "react-bootstrap";
import { MdChevronRight } from "react-icons/md";
import "../../assets/css/components/layouts/bannerPreview.css";

function BannerPreview() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <Row>
        <Col lg={12}>
          <Card
            className="banner-card"
            style={{ borderRadius: "20px" }}
            onClick={() => {
              navigate("/banners");
            }}
          >
            <Card.Img
              src="https://res.cloudinary.com/a3e-media/image/upload/v1686685628/galery/banner.png"
              alt="Banner"
              style={{ borderRadius: "20px" }}
              height={260}
              width="100%"
            />
            <Card.ImgOverlay>
              <div className="banner-overlay">
                <Card.Title
                  className="text-white"
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    marginLeft: "20px",
                  }}
                >
                  Banners
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

export default BannerPreview;
