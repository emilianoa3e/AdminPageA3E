import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import {
  getAllVacancies,
  changeVacancieStatus,
  deleteVacancie,
} from "../../../utils/vacanciesFunctions";
import { ModalPosition } from "../../../components/contact/vacanciePositions/ModalPosition";
import { Button } from "@mui/material";
import { columnsVacancie } from "../../../components/columnsTables/columnsVacancie";
import { showConfirmDialog, showError400 } from "../../../shared/plugins/alert";
import { MdArrowBackIosNew } from "react-icons/md";
import SplashScreen from "../../../pages/utils/SplashScreen";
import DynamicTable from "../../../components/shared/DynamicTable";
import Colors from "../../../utils/Colors";

function VacancieMain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [error, setError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getVacancies = async () => {
    setIsLoading(true);
    try {
      const data = await getAllVacancies();
      setVacancies(data.vacancies);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getVacancies();
  }, []);

  const handleChangeStatus = (id) => {
    showConfirmDialog(
      "¿Quieres cambiar el status de la vacante a completado?",
      "ESTA ACCIÓN NO SE PUEDE DESHACER.",
      "Sí, cambiar",
      "Cancelar",
      () => {
        changeVacancieStatus(id).then(() => {
          getVacancies();
        });
      }
    );
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar la vacante?",
      "Se eliminará permanentemente.",
      "Sí, eliminar",
      "Cancelar",
      () => {
        deleteVacancie(id).then(() => {
          getVacancies();
        });
      }
    );
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (error) {
    showError400(() => {
      navigate("/contacts-screen");
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
            startIcon={<MdArrowBackIosNew size={20} />}
            style={{ backgroundColor: Colors.PalleteGrey }}
            onClick={() => navigate("/contacts-screen")}
          >
            Regresar
          </Button>
          <Button
            size="large"
            variant="contained"
            // startIcon={<MdAdd size={20} />}
            style={{ backgroundColor: Colors.PalleteBlueGreen }}
            onClick={handleShow}
          >
            Ver puestos para vacantes
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={12} className="mt-1 p-0 m-0">
          <DynamicTable
            titleTable="Vacantes"
            columns={columnsVacancie}
            data={vacancies}
            handleChangeStatus={handleChangeStatus}
            handleDelete={handleDelete}
          />
        </Col>
      </Row>
      <ModalPosition show={show} handleClose={handleClose} />
    </Container>
  );
}

export default VacancieMain;
