import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { getAllBanners } from "../../utils/bannersFunctions";
import SplashScreen from "../utils/SplashScreen";
import CustomButton from "../../components/shared/CustomButton";
import { MdCancel } from "react-icons/md";

function BannerMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [bannerList, setBannerList] = useState([
    {
      _id: "",
      title: "",
      description: "",
      image: "",
      link: "",
      status: "",
    },
  ]);

  useEffect(() => {
    const getBanners = async () => {
      const data = await getAllBanners();
      setBannerList(data.banners);
    };

    getBanners();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen isLoading={isLoading} />;
  }

  return (
    <div className="container-fluid">
      <Row className="mb-4">
        <Col xs={12} md={10}>
          <h1>Banners</h1>
        </Col>
        <Col xs={12} md={2} className="d-flex justify-content-end">
          <CustomButton
            text="Crear banner"
            color="primary"
            size="large"
            onClick={() => {}}
          />
        </Col>
      </Row>
      <Col>
        {bannerList.length !== 0 ? (
          <Row>
            {bannerList.map((banner) => (
              <Row key={banner._id}>
                <Col xs={8} sm={8} md={8} lg={8}>
                  <Card style={{ marginBottom: "20px" }}>
                    <div
                      className="align-items-center d-flex"
                      style={{ maxHeight: "240px", overflow: "hidden" }}
                    >
                      <Card.Img variant="top" src={banner.image} />
                    </div>
                    <Card.Body>
                      <Card.Title
                        className="text-center"
                        style={{ fontWeight: "bold", fontSize: "2rem" }}
                      >
                        {banner.title}
                      </Card.Title>
                      <Card.Text
                        className="text-center"
                        style={{ fontSize: "1.2rem" }}
                      >
                        {banner.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="d-flex align-items-center justify-content-center mt-3">
                  <Row>
                    <Col>
                      <CustomButton
                        type="button"
                        text="Editar"
                        size="large"
                        color="primary"
                        onClick={() => {}}
                      />
                    </Col>
                    <Col>
                      <CustomButton
                        type="button"
                        text="Desactivar"
                        size="large"
                        color="secondary"
                        onClick={() => {}}
                      />
                    </Col>
                    <Col>
                      <CustomButton
                        type="button"
                        text="Eliminar"
                        size="large"
                        color="danger"
                        onClick={() => {}}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))}
          </Row>
        ) : (
          <Container>
            <Row>
              <Col xs={12} className="d-flex justify-content-center">
                <Col>
                  <Row>
                    <MdCancel
                      className="no-services-icon"
                      size={150}
                      opacity={0.5}
                    />
                  </Row>
                  <Row>
                    <h3 className="text-center" style={{ opacity: 0.5 }}>
                      No hay banners registrados
                    </h3>
                  </Row>
                </Col>
              </Col>
            </Row>
          </Container>
        )}
      </Col>
    </div>
  );
}

export default BannerMain;
