import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import {
  getAllBanners,
  updateStatus,
  deleteBanner,
} from "../../utils/bannersFunctions";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { MdAdd, MdArrowBackIosNew } from "react-icons/md";
import { Button } from "@mui/material";
import { columnsBanner } from "../../components/columnsTables/columnsBanner";
import Colors from "../../utils/Colors";
import SplashScreen from "../utils/SplashScreen";
import "../../assets/css/pages/BannersMain.css";
import DynamicTable from "../../components/shared/DynamicTable";

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

  const handleChangeStatus = (id) => {
    showConfirmDialog(
      "¿Estás seguro de cambiar el status del banner?",
      "Se cambiará el status del banner",
      "Si, cambiar status",
      "Cancelar",
      () => {
        updateStatus(id).then(() => {
          getBanners();
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
          getBanners();
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
        <Col className="banner-main-buttons-top">
          <Button
            size="large"
            variant="contained"
            startIcon={<MdArrowBackIosNew />}
            style={{ backgroundColor: Colors.PalleteGrey }}
            onClick={() => navigate("/home")}
            className="me-2"
          >
            Regresar
          </Button>
          <Button
            size="large"
            variant="contained"
            endIcon={<MdAdd />}
            style={{ backgroundColor: Colors.PalletePrimary }}
            onClick={() => {
              navigate("/create-banner");
            }}
          >
            Crear banner
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={12} className="mt-1 p-0 m-0">
          <DynamicTable
            titleTable="Banners"
            columns={columnsBanner}
            data={bannerList}
            handleChangeStatus={handleChangeStatus}
            handleDelete={handleDelete}
            showFilter={true}
            navigate={navigate}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default BannerMain;
