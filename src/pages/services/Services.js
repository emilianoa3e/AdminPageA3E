import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllServices, deleteService } from "../../utils/serviceFunctions";
import { MdAdd, MdMode, MdDelete, MdExpandMore } from "react-icons/md";
import { Button } from "@mui/material";
import { showConfirmDialog, showError400 } from "../../shared/plugins/alert";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import Pagination from "../../components/shared/Pagination";
import Colors from "../../utils/Colors";
import SplashScreen from "../utils/SplashScreen";
import NotFound from "../../components/shared/NotFound";
import "../../assets/css/pages/Services.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Services() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);

  const getServices = async () => {
    setIsLoading(true);
    try {
      const data = await getAllServices();
      setServicesList(data.services);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  const handleExpandClick = (index) => {
    setServicesList((prevServicesList) => {
      const updatedServices = [...prevServicesList];
      updatedServices[index].expanded = !updatedServices[index].expanded;
      return updatedServices;
    });
  };

  useEffect(() => {
    getServices();
  }, []);

  const servicesPerPage = 1;
  const pageCount = Math.ceil(servicesList.length / servicesPerPage);

  useEffect(() => {
    const maxOffset = Math.max(0, servicesList.length - servicesPerPage);
    const newOffset = Math.min(itemOffset, maxOffset);
    setItemOffset(newOffset);
  }, [servicesList]);

  const handlePageClick = (e) => {
    const newOffset = e.selected * servicesPerPage;
    setItemOffset(newOffset);
    setCurrentPage(e.selected + 1);
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar este servicio?",
      "Se eliminará el servicio",
      "Si, eliminar servicio",
      "Cancelar",
      () => {
        deleteService(id).then(() => {
          getServices();
          setItemOffset(0);
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
        <Col>
          <h3 style={{ fontWeight: "bold" }}>Servicios</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            size="large"
            variant="contained"
            endIcon={<MdAdd />}
            style={{ backgroundColor: Colors.PalletePrimary }}
            onClick={() => navigate("/services/create-service")}
          >
            Crear servicio
          </Button>
        </Col>
      </Row>
      {servicesList.length !== 0 ? (
        <Row>
          {servicesList
            .slice(itemOffset, itemOffset + servicesPerPage)
            .map((service, index) => (
              <Card
                className="mb-2"
                sx={{
                  width: "100%",
                  backgroundColor: Colors.PalletePrimaryLight,
                }}
                key={service._id}
              >
                <CardHeader
                  title={service.title}
                  subheader={service.subtitle}
                />
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{ __html: service.summary }}
                  ></div>
                </CardContent>
                <CardActions disableSpacing>
                  <Button
                    size="small"
                    variant="contained"
                    endIcon={<MdMode />}
                    style={{ backgroundColor: Colors.PalletePrimary }}
                    onClick={() =>
                      navigate(`/services/edit-service/${service._id}`)
                    }
                    className="me-1"
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    endIcon={<MdDelete />}
                    style={{ backgroundColor: Colors.PalleteDanger }}
                    onClick={() => handleDelete(service._id)}
                  >
                    Eliminar
                  </Button>
                  <ExpandMore
                    expand={service.expanded}
                    onClick={() => handleExpandClick(itemOffset + index)}
                    aria-expanded={service.expanded}
                    aria-label="show more"
                  >
                    <MdExpandMore size={40} />
                  </ExpandMore>
                </CardActions>
                <Collapse in={service.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <div
                      className="content"
                      dangerouslySetInnerHTML={{ __html: service.content }}
                    ></div>
                  </CardContent>
                </Collapse>
              </Card>
            ))}
          <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </Row>
      ) : (
        <NotFound
          text="No hay servicios registrados"
          textSize={30}
          iconSize={150}
        />
      )}
    </Container>
  );
}

export default Services;
