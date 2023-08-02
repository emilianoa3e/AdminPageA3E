import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../../assets/css/components/BannerPreview.css"
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
                    <a href={link} target="_blank" className="linkButton">
                      Ver más
                    </a>
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
          className="certification"
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image}
              alt={title}
              style={{ objectFit: "cover" }}
            />
            <Carousel.Caption              
              style={{ top: 0, right: 0 }}
            >
              <div
                className="contentCaption h-100"
                style={{ position: "absolute", right: 0 }}
              >
                <Row className="justify-content-center ">
                  <Col className="col-12">
                    <h1>{title}</h1>
                  </Col>
                  <Col className="col-12">
                    <p>{description}</p>
                  </Col>
                  {link ? (
                    <Col className="col-12 text-center ">
                      <a href={link} className="linkButton">
                        Ver más
                      </a>
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    }
  }
}

export default BannerPreview;
