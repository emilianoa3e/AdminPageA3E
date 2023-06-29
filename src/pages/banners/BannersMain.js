import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import {
  getAllBanners,
  updateStatus,
  deleteBanner,
} from "../../utils/bannersFunctions";
import { showConfirmDialog } from "../../shared/plugins/alert";
import SplashScreen from "../utils/SplashScreen";
import CustomButton from "../../components/shared/CustomButton";
import BannerPreview from "../utils/BannerPreview";
import NotFound from "../../components/shared/NotFound";
import "../../assets/css/pages/BannersMain.css";

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

  const getBanners = async () => {
    setIsLoading(true);
    const data = await getAllBanners();
    setBannerList(data.banners);
    setIsLoading(false);
  };

  useEffect(() => {
    getBanners();
  }, []);

  const handleStatus = (id) => {
    showConfirmDialog(
      "¿Estás seguro de cambiar el status del banner?",
      "Se cambiará el status del banner",
      "Si, cambiar status",
      "Cancelar",
      () => {
        updateStatus(id).then(() => {
          getAllBanners().then((updatedList) => {
            setBannerList(updatedList.banners);
          });
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
        deleteBanner(id).then(() => {
          getAllBanners().then((updatedList) => {
            setBannerList(updatedList.banners);
          });
        });
      }
    );
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col xs={12} md={8} lg={10}>
          <h1 className="title">Banners</h1>
        </Col>
        <Col xs={12} md={4} lg={2} className="buttons-top">
          <CustomButton
            text="Regresar"
            color="secondary"
            size="medium"
            onClick={() => navigate("/home")}
            className="me-2"
          />
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
      <Col className="mt-5">
        {bannerList.length !== 0 ? (
          <Row>
            {bannerList.map((banner) => (
              <Row key={banner._id} className="mb-4">
                <Col sm={12} lg={10}>
                  <BannerPreview
                    title={banner.title}
                    description={banner.description}
                    image={banner.image}
                    link={banner.link}
                    onContext="bannersMain"
                  />
                </Col>
                <Col
                  sm={12}
                  lg={2}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Row className="justify-content-center mt-2">
                    <CustomButton
                      text="Editar"
                      color="primary"
                      size="medium"
                      onClick={() => navigate(`/banners/${banner._id}`)}
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
          <NotFound
            text="No hay banners registrados"
            textSize={30}
            iconSize={150}
          />
        )}
      </Col>
    </Container>
  );
}

export default BannerMain;
