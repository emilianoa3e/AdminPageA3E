import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import {
  getAllBanners,
  updateStatus,
  deleteBanner,
} from "../../utils/bannersFunctions";
import { showConfirmDialog, showError400 } from "../../shared/plugins/alert";
import { MdAdd, MdArrowBackIosNew, MdHelpOutline } from "react-icons/md";
import { Button } from "@mui/material";
import { columnsBanner } from "../../components/columnsTables/columnsBanner";
import { SpeedDial } from "primereact/speeddial";
import { ModalHelp } from "../../components/shared/ModalHelp";
import { stepsBannerMain } from "../../components/stepsTutorial/stepsBannerMain";
import Colors from "../../utils/Colors";
import SplashScreen from "../utils/SplashScreen";
import DynamicTable from "../../components/shared/DynamicTable";
import "../../assets/css/pages/BannersMain.css";

function BannerMain() {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bannerList, setBannerList] = useState([]);
  const [error, setError] = useState(false);

  const handleShowHelp = () => setShowHelp(true);
  const handleCloseHelp = () => setShowHelp(false);

  const getBanners = async () => {
    setIsLoading(true);
    try {
      const data = await getAllBanners();
      setBannerList(data.banners);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
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

  if (error) {
    showError400(() => {
      navigate("/home");
    });
  }

  return (
    <Container fluid>
      <SpeedDial
        style={{ position: "fixed", left: 10, bottom: 10 }}
        showIcon={<MdHelpOutline size={30} />}
        title="¿Como funciona?"
        buttonStyle={{
          backgroundColor: Colors.PalleteGreenA3E,
          opacity: 0.85,
          color: "white",
        }}
        buttonClassName="p-button-secondary"
        onClick={handleShowHelp}
      />
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
      <ModalHelp
        show={showHelp}
        handleClose={handleCloseHelp}
        stepsTutorial={stepsBannerMain}
      />
    </Container>
  );
}

export default BannerMain;
