import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { getAllInterns } from "../../../utils/internsFunctions";
import SplashScreen from "../../../pages/utils/SplashScreen";
import CustomButton from "../../../components/shared/CustomButton";
import CustomTable from "../../../components/shared/CustomTable";

function InternMain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [interns, setInterns] = useState([
    {
      fullName: "",
      email: "",
      phone: "",
      age: "",
      institution: "",
      period: "",
      typePractice: "",
      degree: "",
      info: "",
    },
  ]);
}

export default InternMain;
