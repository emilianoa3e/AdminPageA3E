import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { getAllSales } from "../../../utils/salesFunctions";
import SplashScreen from "../../../pages/utils/SplashScreen";
import CustomButton from "../../../components/shared/CustomButton";
import CustomTable from "../../../components/shared/CustomTable";

function SaleMain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sales, setSales] = useState([
    {
      fullName: "",
      email: "",
      phone: "",
      typeService: "",
      enterprise: "",
      address: "",
      info: "",
    },
  ]);

  const getSales = async () => {
    setIsLoading(true);
    const data = await getAllSales();
    setSales(data.sales);
    setIsLoading(false);
  };

  useEffect(() => {
    getSales();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col className="mt-1" xs={12} md={10}>
          <h1>Ventas</h1>
        </Col>
        <Col xs={12} md={2} className="d-flex justify-content-end">
          <CustomButton
            text="Regresar"
            color="secondary"
            size="medium"
            onClick={() => navigate("/contacts-screen")}
            className="me-2"
          />
        </Col>
      </Row>
      <Col className="mt-1">
        <Row className="mt-4">
          <Col lg={12} className="mt-1">
            <CustomTable data={sales} />
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default SaleMain;
