import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import {
  getAllVacancies,
  changeVacancieStatus,
  deleteVacancie,
} from "../../../utils/vacanciesFunctions";
import { columnsVacancie } from "../../../components/columnsTables/columnsVacancie";
import { showConfirmDialog } from "../../../shared/plugins/alert";
import SplashScreen from "../../../pages/utils/SplashScreen";
import CustomButton from "../../../components/shared/CustomButton";
import DynamicTable from "../../../components/shared/DynamicTable";

function VacancieMain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [vacancies, setVacancies] = useState([
    {
      fullName: "",
      phone: "",
      email: "",
      age: "",
      residence: "",
      education: "",
      position: "",
      source: "",
      curriculum: "",
    },
  ]);

  const getVacancies = async () => {
    setIsLoading(true);
    const data = await getAllVacancies();
    setVacancies(data.vacancies);
    setIsLoading(false);
  };

  useEffect(() => {
    getVacancies();
  }, []);

  const handleChangeStatus = (id) => {
    showConfirmDialog(
      "¿Estás seguro de cambiar el status de la vacante a completado?",
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
      "Se eliminará la vacante",
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

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col className="mt-1">
          <h1>Vacantes</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <CustomButton
            text="Regresar"
            color="secondary"
            size="medium"
            onClick={() => navigate("/contacts-screen")}
          />
        </Col>
      </Row>
      <Col className="mt-1">
        <Row className="mt-4">
          <Col lg={12} className="mt-1 p-0 m-0">
            <DynamicTable
              columns={columnsVacancie}
              data={vacancies}
              handleChangeStatus={handleChangeStatus}
              handleDelete={handleDelete}
            />
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default VacancieMain;
