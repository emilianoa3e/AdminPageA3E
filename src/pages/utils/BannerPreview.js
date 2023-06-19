import React from "react";
import Carousel from "react-bootstrap/Carousel";

function BannerPreview({ title, description, image, link }) {
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
      <Carousel style={{ margin: 0, padding: 0 }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image}
            alt={title}
            height={"200px"}
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
