import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import {
  getAllSales,
  changeSaleStatus,
  deleteSale,
} from "../../../utils/salesFunctions";
import { columnsSale } from "../../../components/columnsTables/columnsSale";
import { Button } from "@mui/material";
import { MdArrowBackIosNew } from "react-icons/md";
import { showConfirmDialog, showError400 } from "../../../shared/plugins/alert";
import SplashScreen from "../../../pages/utils/SplashScreen";
import DynamicTable from "../../../components/shared/DynamicTable";
import Colors from "../../../utils/Colors";

function SaleMain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(false);

  const getSales = async () => {
    setIsLoading(true);
    try {
      const data = await getAllSales();
      setSales(data.sales);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  const handleChangeStatus = (id) => {
    showConfirmDialog(
      "¿Quieres cambiar el status de la venta a completado?",
      "ESTA ACCIÓN NO SE PUEDE DESHACER.",
      "Sí, cambiar",
      "Cancelar",
      () => {
        changeSaleStatus(id).then(() => {
          getSales();
        });
      }
    );
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar esta venta?",
      "Se eliminará permanentemente.",
      "Sí, eliminar",
      "Cancelar",
      () => {
        deleteSale(id).then(() => {
          getSales();
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
      <Row className="mb-4">
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
            titleTable="Ventas"
            columns={columnsSale}
            data={sales}
            handleChangeStatus={handleChangeStatus}
            handleDelete={handleDelete}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default SaleMain;
