import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import {
  getAllInterns,
  changeInternStatus,
  deleteIntern,
} from "../../../utils/internsFunctions";
import { columnsIntern } from "../../../components/columnsTables/columnsIntern";
import { Button } from "@mui/material";
import { MdArrowBackIosNew } from "react-icons/md";
import { showConfirmDialog } from "../../../shared/plugins/alert";
import SplashScreen from "../../../pages/utils/SplashScreen";
import DynamicTable from "../../../components/shared/DynamicTable";
import Colors from "../../../utils/Colors";

function InternMain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [interns, setInterns] = useState([]);

  const getInterns = async () => {
    setIsLoading(true);
    const data = await getAllInterns();
    setInterns(data.interns);
    setIsLoading(false);
  };

  useEffect(() => {
    getInterns();
  }, []);

  const handleChangeStatus = (id) => {
    showConfirmDialog(
      "¿Quieres cambiar el status del becario a completado?",
      "ESTA ACCIÓN NO SE PUEDE DESHACER.",
      "Sí, cambiar",
      "Cancelar",
      () => {
        changeInternStatus(id).then(() => {
          getInterns();
        });
      }
    );
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar al becario?",
      "Se eliminará permanentemente.",
      "Sí, eliminar",
      "Cancelar",
      () => {
        deleteIntern(id).then(() => {
          getInterns();
        });
      }
    );
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Container fluid>
      <Row>
        <div style={{ width: "230px" }}>
          <Button
            size="large"
            variant="contained"
            startIcon={<MdArrowBackIosNew size={20} />}
            style={{ backgroundColor: Colors.PalleteGrey }}
            onClick={() => navigate("/contacts-screen")}
          >
            Regresar
          </Button>
        </div>
      </Row>
      <Row className="mt-4">
        <Col lg={12} className="mt-1 p-0 m-0">
          <DynamicTable
            titleTable="Becarios"
            columns={columnsIntern}
            data={interns}
            handleChangeStatus={handleChangeStatus}
            handleDelete={handleDelete}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default InternMain;
