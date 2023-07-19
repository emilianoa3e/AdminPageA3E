import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd, MdArrowBackIosNew } from "react-icons/md";
import { Container, Col, Row } from "react-bootstrap";
import {
  deleteCertification,
  getAllCertifications,
  updateStatusCertification,
} from "../../utils/certificationFunctions";
import { showConfirmDialog, showError400 } from "../../shared/plugins/alert";
import { columnsCertification } from "../../components/columnsTables/columnsCertifications";
import { Button } from "@mui/material";
import Colors from "../../utils/Colors";
import DynamicTable from "../../components/shared/DynamicTable";
import SplashScreen from "../utils/SplashScreen";

function CertificationsMain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [certificationList, setCertificationList] = useState([]);
  const [error, setError] = useState(false);

  const getCertifications = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCertifications();
      setCertificationList(data.certifications);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getCertifications();
  }, []);

  const handleChangeStatus = (id) => {
    showConfirmDialog(
      "¿Estás seguro de cambiar el status del banner?",
      "Se cambiará el status del banner",
      "Si, cambiar status",
      "Cancelar",
      () => {
        updateStatusCertification(id).then(() => {
          getCertifications();
        });
      }
    );
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar el certificado?",
      "Se eliminará el certificado",
      "Si, eliminar certificado",
      "Cancelar",
      () => {
        deleteCertification(id).then(() => {
          getCertifications();
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
      <Row className="mb-3">
        <Col
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
            onClick={() => navigate("/certifications/create-certification")}
            style={{ backgroundColor: Colors.PalletePrimary }}
          >
            Registrar
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={12} className="mt-1 p-0 m-0">
          <DynamicTable
            titleTable="Certificaciones"
            columns={columnsCertification}
            data={certificationList}
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

export default CertificationsMain;
