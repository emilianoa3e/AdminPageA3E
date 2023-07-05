import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { getAllInterns } from "../../../utils/internsFunctions";
import { columnsIntern } from "../../../components/columnsTables/columnsIntern";
import SplashScreen from "../../../pages/utils/SplashScreen";
import CustomButton from "../../../components/shared/CustomButton";
import DynamicTable from "../../../components/shared/DynamicTable";

function InternMain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [interns, setInterns] = useState([
    {
      fullName: "",
      phone: "",
      email: "",
      age: "",
      institution: "",
      typePractice: "",
      degree: "",
      period: "",
      info: "",
    },
  ]);

  const getInterns = async () => {
    setIsLoading(true);
    const data = await getAllInterns();
    setInterns(data.interns);
    setIsLoading(false);
  };

  useEffect(() => {
    getInterns();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col className="mt-1">
          <h1>Becarios</h1>
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
            <DynamicTable columns={columnsIntern} data={interns} />
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default InternMain;
