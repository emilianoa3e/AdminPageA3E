import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdAdd, MdMode, MdDelete, MdExpandMore } from "react-icons/md";
import { Button } from "@mui/material";
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
  Typography,
} from "@mui/material";
import Pagination from "../../components/shared/Pagination";
import Colors from "../../utils/Colors";
import SplashScreen from "../utils/SplashScreen";
import NotFound from "../../components/shared/NotFound";
import "../../assets/css/pages/CompanyNews.css";

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
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);

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
    setNewsList((prevNewsList) => {
      const updatedNews = [...prevNewsList];
      updatedNews[index].expanded = !updatedNews[index].expanded;
      return updatedNews;
    });
  };

  useEffect(() => {
    getNews();
  }, []);

  const newsPerPage = 1;
  const pageCount = Math.ceil(newsList.length / newsPerPage);

  useEffect(() => {
    const maxOffset = Math.max(0, newsList.length - newsPerPage);
    const newOffset = Math.min(itemOffset, maxOffset);
    setItemOffset(newOffset);
  }, [newsList]);

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
      <Row className="mb-3">
        <Col>
          <h3>Noticias</h3>
        </Col>
        <Col className="d-flex justify-content-end">
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
          {newsList
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
                <CardHeader title={news.title} subheader={news.type} />
                <CardContent>
                  <Typography
                    fontSize={17}
                    variant="body2"
                    color="text.secondary"
                  >
                    {news.summary}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
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
                  <ExpandMore
                    expand={news.expanded}
                    onClick={() => handleExpandClick(itemOffset + index)}
                    aria-expanded={news.expanded}
                    aria-label="show more"
                  >
                    <MdExpandMore />
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
          <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
        </Row>
      ) : (
        <NotFound
          text="No hay noticias registradas"
          textSize={30}
          iconSize={150}
        />
      )}
    </Container>
  );
}

export default CompanyNews;
