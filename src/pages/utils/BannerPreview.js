import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../../assets/css/components/BannerPreview.css";
import { Row, Col } from "react-bootstrap";
function BannerPreview({ title, description, image, link, onContext }) {
  if (onContext === "bannerPreview") {
    if (!image) {
      return (
        <div className="justify-content-center">
          <p
            className="text-center"
            style={{
              fontSize: "0.8rem",
              fontStyle: "italic",
              color: "grey",
              opacity: "0.7",
            }}
          >
            No hay imagen
          </p>
        </div>
      );
    } else {
      return (
        <Carousel
          controls={false}
          style={{ margin: 0, padding: 0 }}
          className="carousel"
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image}
              alt={title}
              style={{ objectFit: "cover" }}
            />
            {link && (
              <Carousel.Caption
                className=" text-start w-100 h-50 "
                style={{ position: "absolute", left: 0 }}
              >
                <Row className="w-100 h-100 p-0 m-0 align-items-center justify-content-left">
                  <Col className="text-center ">
                    <a className="carousel-btn">Ver más</a>
                  </Col>
                </Row>
              </Carousel.Caption>
            )}
          </Carousel.Item>
        </Carousel>
      );
    }
  }

  if (onContext === "certificationPreview") {
    if (!image) {
      return (
        <div className="justify-content-center">
          <p
            className="text-center"
            style={{
              fontSize: "0.8rem",
              fontStyle: "italic",
              color: "grey",
              opacity: "0.7",
            }}
          >
            No hay imagen
          </p>
        </div>
      );
    } else {
      return (
        <Carousel
          controls={false}
          style={{ margin: 0, padding: 0 }}
          className="carousel"
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image}
              alt={title}
              style={{ objectFit: "cover" }}
            />
            <Carousel.Caption
              className="text-start w-100 h-50"
              style={{ position: "absolute", left: 0 }}
            >
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  className="carousel-btn btn"
                  style={{
                    position: "relative",
                    top: 10,
                    left: 50,
                    backgroundColor: "#00743B",
                    color: "white",
                    padding: "0.6% 4% 0.6% 4%",
                    borderRadius: "0px 20px 20px 20px",
                  }}
                >
                  VER MÁS
                </a>
              ) : (
                ""
              )}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    }
  }

  if (onContext === "bannersMain") {
    return (
      <Carousel controls={false} style={{ margin: 0, padding: 0 }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image}
            alt={title}
            height={"200px"}
            style={{ objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>{title}</h3>
            <p>{description}</p>
            {link ? (
              <a href={link} target="_blank" className="btn btn-success">
                Ver más
              </a>
            ) : (
              ""
            )}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default BannerPreview;
