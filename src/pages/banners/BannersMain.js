import React, { useState, useEffect, useRef } from "react";
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
import Colors from "../../utils/Colors";
import SplashScreen from "../utils/SplashScreen";
import DynamicTable from "../../components/shared/DynamicTable";

function BannerMain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [bannerList, setBannerList] = useState([]);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const refStep1 = useRef(null);
  const refStep2 = useRef(null);

  const steps = [
    {
      title: "Tabla de datos",
      description:
        "En esta página se muestran todos los banners que se han creado. " +
        "Puede cambiar el status, eliminar, crear o editar un banner.",
      target: () => refStep1.current,
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Filtro de status",
      description:
        "El filtro de status permite filtrar los banners por status. Los que estan activos o inactivos.",
      placement: "left",
      target: () => refStep2.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Finalizar" },
    },
  ];

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

    document.title = "A3E P.A. | Banners";
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
          opacity: 0.65,
          color: "white",
        }}
        buttonClassName="p-button-secondary"
        onClick={() => setOpen(true)}
      />
      <Row>
        <Col className="d-flex justify-content-between">
          <Button
            size="large"
            variant="contained"
            startIcon={<MdArrowBackIosNew />}
            style={{ backgroundColor: Colors.PalleteGrey }}
            onClick={() => navigate("/home")}
            className="me-1"
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
      <Row className="mt-3">
        <Col lg={12} className="mt-1 p-0 m-0">
          <DynamicTable
            titleTable="Banners"
            columns={columnsBanner}
            data={bannerList}
            handleChangeStatus={handleChangeStatus}
            handleDelete={handleDelete}
            showFilter={true}
            navigate={navigate}
            steps={steps}
            open={open}
            setOpen={setOpen}
            refStep1={refStep1}
            refStep2={refStep2}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default BannerMain;
