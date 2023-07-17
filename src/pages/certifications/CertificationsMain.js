import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { MdAdd, MdDelete, MdArrowBackIosNew } from "react-icons/md";
import { Container, Col, Row } from "react-bootstrap";
import Colors from "../../utils/Colors";
import { columnsCertification } from "../../components/columnsTables/columnsCertifications";
import DynamicTable from "../../components/shared/DynamicTable";
import { Button } from "@mui/material";
import SplashScreen from "../utils/SplashScreen";
import { deleteCertification, getAllCertifications, updateStatusCertification } from "../../utils/certificationFunctions";
import { showConfirmDialog } from "../../shared/plugins/alert";
function CertificationsMain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const[certificationList, setCertificationList] = useState([])

  const getCertifications = async()=>{
    setIsLoading(true);
    const data = await getAllCertifications();
    setCertificationList(data.certifications);
    setIsLoading(false)
  }

  useEffect(()=>{
    getCertifications();
  },[])

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
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col xs={12} md={7} lg={8}>
          
        </Col>
        <Col xs={12} md={5} lg={4} className="client-buttons">
          <Button
            size="large"
            variant="contained"
            startIcon={<MdArrowBackIosNew />}
            style={{ backgroundColor: Colors.PalleteGrey }}
            onClick={() => navigate( window. history. back())}
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
