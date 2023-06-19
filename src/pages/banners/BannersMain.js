import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Card } from "react-bootstrap";
import {
  getAllBanners,
  updateStatus,
  deleteBanner,
} from "../../utils/bannersFunctions";
import {
  Toast,
  showConfirmDialog,
  showLoadingAlert,
} from "../../shared/plugins/alert";
import SplashScreen from "../utils/SplashScreen";
import CustomButton from "../../components/shared/CustomButton";
import { MdCancel } from "react-icons/md";

function BannerMain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const getBanners = async () => {
      const data = await getAllBanners();
      setBannerList(data.banners);
      setIsLoading(false);
    };
    getBanners();
  }, []);

  const handleStatus = (id) => {
    showConfirmDialog(
      "¿Estás seguro de cambiar el status del banner?",
      "Se cambiará el status del banner",
      "Si, cambiar status",
      "Cancelar",
      () => {
        updateStatus(id).then((data) => {
          if (data.msg === "Banner status updated") {
            Toast.fire({
              icon: "success",
              title: "Status cambiado con éxito 😄",
            });
            getAllBanners().then((updatedList) => {
              setBannerList(updatedList.banners);
            });
          } else {
            Toast.fire({
              icon: "error",
              title: "Error al cambiar el status 😞",
            });
          }
        });
      }
    );
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar el banner?",
      "Se eliminará el banner",
      "Si, eliminar banner",
      "Cancelar",
      () => {
        deleteBanner(id).then((data) => {
          showLoadingAlert(
            "Eliminando banner...",
            "Se está eliminando el banner, por favor espere."
          );
          if (data.msg === "Banner deleted") {
            Toast.fire({
              icon: "success",
              title: "Banner eliminado con éxito 😄",
            });
            getAllBanners().then((updatedList) => {
              setBannerList(updatedList.banners);
            });
          } else {
            Toast.fire({
              icon: "error",
              title: "Error al eliminar el banner 😞",
            });
          }
        });
      }
    );
  };

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
            size="medium"
            onClick={() => {
              navigate("/create-banner");
            }}
          />
        </Col>
      </Row>
      <Col>
        {bannerList.length !== 0 ? (
          <Row>
            {bannerList.map((banner) => (
              <Row key={banner._id}>
                <Col lg={9}>
                  <Card
                    style={{
                      marginBottom: "20px",
                      borderColor: "#00743B",
                      borderStyle: "solid",
                      borderWidth: "1px",
                    }}
                  >
                    <div
                      className="align-items-center d-flex"
                      style={{ maxHeight: "180px", overflow: "hidden" }}
                    >
                      <Card.Img variant="top" src={banner.image} />
                    </div>
                    <Card.Body>
                      <Card.Title
                        className="text-center"
                        style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                      >
                        {banner.title}
                      </Card.Title>
                      <Card.Text
                        className="text-center"
                        style={{ fontSize: "1rem" }}
                      >
                        {banner.description}
                      </Card.Text>
                      <Card.Text
                        className="text-center"
                        style={{ fontSize: "1rem" }}
                      >
                        <a href={banner.link} target="_blank">
                          {banner.link}
                        </a>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col
                  lg={3}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Row className="justify-content-center">
                    <CustomButton
                      text="Editar"
                      color="primary"
                      size="medium"
                      onClick={() => {}}
                      className="mb-2 col-8"
                    />
                    <CustomButton
                      text="Eliminar"
                      color="danger"
                      size="medium"
                      onClick={() => handleDelete(banner._id)}
                      className="mb-2 col-8"
                    />
                    {banner.status ? (
                      <CustomButton
                        text="Desactivar"
                        color="secondary"
                        size="medium"
                        onClick={() => handleStatus(banner._id)}
                        className="mb-2 col-8"
                      />
                    ) : (
                      <CustomButton
                        text="Activar"
                        color="success"
                        size="medium"
                        onClick={() => handleStatus(banner._id)}
                        className="mb-2 col-8"
                      />
                    )}
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
