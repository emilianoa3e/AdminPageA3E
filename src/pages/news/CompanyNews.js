import React, { useEffect, useState } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdAdd, MdMode, MdDelete } from "react-icons/md";
import { Button } from "@mui/material";
import { showConfirmDialog } from "../../shared/plugins/alert";
import Colors from "../../utils/Colors";
import SplashScreen from "../utils/SplashScreen";
import NotFound from "../../components/shared/NotFound";
import { deleteNew, getAllNews } from "../../utils/newsFunctions";
import '../../assets/css/pages/CompanyNews.css'

function CompanyNews() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [newsList, setNewsList] = useState([
    {
      _id: "",
      title: "",
      summary: "",
      type: "",
      date: "",
      author: "",
      content: "",
    },
  ]);

  const getNews = async () => {
    setIsLoading(true);
    const data = await getAllNews();
    setNewsList(data.dataNew)
    setIsLoading(false);
  };

  useEffect(() => {
    getNews();
  }, []);

  const handleDelete = (id) => {
    console.log("clic");
    showConfirmDialog(
      "¿Estás seguro de eliminar esta noticia?",
      "Se eliminará la noticia",
      "Si, eliminar noticia",
      "Cancelar",
      () => {
        deleteNew(id).then(() => {
          getNews()
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
        <Col xs={12} md={7} lg={8}>
          <h1 className="new-title">Noticias</h1>
        </Col>
        <Col xs={12} md={5} lg={4} className="new-buttons-top">
          <Button
            size="large"
            variant="contained"
            endIcon={<MdAdd size={20} />}
            style={{ fontSize: 13, backgroundColor: Colors.PalletePrimary }}
            onClick={() => navigate("/news/create-new")}
          >
            Crear noticia
          </Button>
        </Col>
      </Row>
      {newsList.length !== 0 ? (
        <Row>
          {newsList.map((notice) => (
            <Col key={notice._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="new-card mt-2">
                <Card.Body>
                  <Card.Title
                    className="new-name p-1"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {notice.title}
                  </Card.Title>
                  <Card.Text className="text-center">
                    {notice.summary}
                  </Card.Text>
                  <div className="d-flex justify-content-center">
                    <Button
                      size="small"
                      variant="contained"
                      endIcon={<MdMode size={15} />}
                      style={{ fontSize: 12, backgroundColor: Colors.PalletePrimary }}
                      onClick={() =>
                        navigate(`/news/edit-new/${notice._id}`)
                      }
                      className="me-1"
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      endIcon={<MdDelete size={15} />}
                      style={{ fontSize: 12, backgroundColor: Colors.PalleteDanger }}
                      onClick={() => handleDelete(notice._id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
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
