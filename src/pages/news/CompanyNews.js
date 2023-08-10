import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  MdAdd,
  MdMode,
  MdDelete,
  MdExpandMore,
  MdNewspaper,
  MdGolfCourse,
  MdWorkspacesFilled,
  MdHelpOutline,
} from "react-icons/md";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import { showConfirmDialog, showError400 } from "../../shared/plugins/alert";
import { deleteNew, getAllNews } from "../../utils/newsFunctions";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
} from "@mui/material";
import { Tour } from "antd";
import { SpeedDial } from "primereact/speeddial";
import Pagination from "../../components/shared/Pagination";
import Colors from "../../utils/Colors";
import SplashScreen from "../utils/SplashScreen";
import NotFound from "../../components/shared/NotFound";

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

function CompanyNews() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [filteredNewsList, setFilteredNewsList] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("Novedades");
  const [open, setOpen] = useState(false);
  const refStepInfo = useRef(null);
  const refStepActions = useRef(null);
  const refStepExpand = useRef(null);
  const refStepPagination = useRef(null);
  const refStepFilter = useRef(null);

  const steps = [
    {
      title: "Información de la noticia",
      description:
        "Esta parte muestra la información de la noticia. Titulo, categoría, resume, autor y contenido.",
      target: () => refStepInfo.current,
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Acciones",
      description:
        "En esta parte se encuentran las acciones que se pueden realizar con la noticia. Editar y eliminar.",
      placement: "right",
      target: () => refStepActions.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Expandir",
      description:
        "Al expandir el servicio se muestra la información completa de la noticia (Contenido de la noticia). ",
      placement: "left",
      target: () => refStepExpand.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Paginación",
      description:
        "Esta parte muestra la paginación de las noticias. Puedes navegar entre las noticias con los botones de paginación.",
      placement: "top",
      target: () => refStepPagination.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Siguiente" },
    },
    {
      title: "Filtros de noticias",
      description:
        "En esta parte se encuentran los filtros de noticias. Puedes filtrar las noticias por tipo.",
      placement: "bottom",
      target: () => refStepFilter.current,
      prevButtonProps: { children: "Anterior" },
      nextButtonProps: { children: "Finalizar" },
    },
  ];

  const getNews = async () => {
    setIsLoading(true);
    try {
      const data = await getAllNews();
      setNewsList(data.news);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  const handleExpandClick = (index) => {
    setFilteredNewsList((prevNewsList) => {
      const updatedNews = [...prevNewsList];
      updatedNews[index].expanded = !updatedNews[index].expanded;
      return updatedNews;
    });
  };

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
    setItemOffset(0);
    setCurrentPage(1);

    const filteredNews = newsList.filter((news) => {
      if (
        newValue === "Novedades" ||
        newValue === "Cursos" ||
        newValue === "Convocatorias"
      ) {
        return news.type === newValue;
      }
      return false;
    });

    setFilteredNewsList(filteredNews);
    getNews();
  };

  const filterNews = () => {
    const filteredNews = newsList.filter((news) => {
      if (
        filter === "Novedades" ||
        filter === "Cursos" ||
        filter === "Convocatorias"
      ) {
        return news.type === filter;
      }
      return false;
    });

    setFilteredNewsList(filteredNews);
    setItemOffset(0);
    setCurrentPage(1);
  };

  useEffect(() => {
    filterNews();
  }, [newsList, filter]);

  useEffect(() => {
    getNews();

    document.title = "A3E P.A. | Noticias";
  }, []);

  const newsPerPage = 1;
  const pageCount = Math.ceil(filteredNewsList.length / newsPerPage);

  useEffect(() => {
    const maxOffset = Math.max(0, filteredNewsList.length - newsPerPage);
    const newOffset = Math.min(itemOffset, maxOffset);
    setItemOffset(newOffset);
  }, [filteredNewsList]);

  const handlePageClick = (e) => {
    const newOffset = e.selected * newsPerPage;
    setItemOffset(newOffset);
    setCurrentPage(e.selected + 1);
  };

  const handleDelete = (id) => {
    console.log("clic");
    showConfirmDialog(
      "¿Estás seguro de eliminar esta noticia?",
      "Se eliminará la noticia",
      "Si, eliminar noticia",
      "Cancelar",
      () => {
        deleteNew(id).then(() => {
          getNews();
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
      <SpeedDial
        style={{ position: "fixed", left: 10, bottom: 10 }}
        showIcon={<MdHelpOutline size={30} />}
        title="¿Como funciona?"
        buttonStyle={{
          backgroundColor: Colors.PalleteGreenA3E,
          opacity: 0.65,
          color: "white",
        }}
        buttonClassName="p-button-secondary"
        onClick={() => setOpen(true)}
      />
      <Row className="mb-3">
        <Col>
          <h3>Noticias</h3>
        </Col>
        <Col>
          <BottomNavigation
            sx={{ width: "100%" }}
            value={filter}
            onChange={handleFilterChange}
            ref={refStepFilter}
          >
            <BottomNavigationAction
              label="Novedades"
              value="Novedades"
              icon={<MdNewspaper size={35} />}
            />
            <BottomNavigationAction
              label="Cursos"
              value="Cursos"
              icon={<MdGolfCourse size={35} />}
            />
            <BottomNavigationAction
              label="Convocatorias"
              value="Convocatorias"
              icon={<MdWorkspacesFilled size={35} />}
            />
          </BottomNavigation>
        </Col>
        <Col className="d-flex justify-content-end h-75">
          <Button
            size="large"
            variant="contained"
            endIcon={<MdAdd />}
            style={{ backgroundColor: Colors.PalletePrimary }}
            onClick={() => navigate("/news/create-new")}
          >
            Crear noticia
          </Button>
        </Col>
      </Row>
      {newsList.length !== 0 ? (
        <Row>
          {filteredNewsList
            .slice(itemOffset, itemOffset + newsPerPage)
            .map((news, index) => (
              <Card
                className="mb-2"
                sx={{
                  width: "100%",
                  backgroundColor: Colors.PalletePrimaryLight,
                }}
                key={news._id}
              >
                <div ref={index === 0 ? refStepInfo : null}>
                  <CardHeader
                    title={news.title}
                    subheader={`${news.type} | ${news.author} | ${news.date}`}
                  />
                  <CardContent>
                    <div
                      dangerouslySetInnerHTML={{ __html: news.summary }}
                    ></div>
                  </CardContent>
                </div>
                <CardActions disableSpacing>
                  <div ref={index === 0 ? refStepActions : null}>
                    <Button
                      size="small"
                      variant="contained"
                      endIcon={<MdMode />}
                      style={{ backgroundColor: Colors.PalletePrimary }}
                      onClick={() => navigate(`/news/edit-new/${news._id}`)}
                      className="me-1"
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      endIcon={<MdDelete />}
                      style={{ backgroundColor: Colors.PalleteDanger }}
                      onClick={() => handleDelete(news._id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                  <ExpandMore
                    expand={news.expanded}
                    onClick={() => handleExpandClick(itemOffset + index)}
                    aria-expanded={news.expanded}
                    aria-label="show more"
                  >
                    <div ref={index === 0 ? refStepExpand : null}>
                      <MdExpandMore size={40} />
                    </div>
                  </ExpandMore>
                </CardActions>
                <Collapse in={news.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <div
                      className="content"
                      dangerouslySetInnerHTML={{ __html: news.content }}
                    ></div>
                  </CardContent>
                </Collapse>
              </Card>
            ))}
          <Pagination
            pageCount={pageCount}
            handlePageClick={handlePageClick}
            refStep={refStepPagination}
          />
        </Row>
      ) : (
        <NotFound
          text="No hay noticias registradas"
          textSize={30}
          iconSize={150}
        />
      )}
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </Container>
  );
}

export default CompanyNews;
