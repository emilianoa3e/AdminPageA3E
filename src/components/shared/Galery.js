import React, { useState, useEffect } from "react";
import {
  MdCopyAll,
  MdInsertPhoto,
  MdMovie,
  MdPermMedia,
  MdDeleteForever,
} from "react-icons/md";
import { Row, Col, Card } from "react-bootstrap";
import {
  uploadMultimedia,
  getAllMedia,
  deleteMultimedia,
} from "../../utils/galeryFunctions";
import { showConfirmDialog } from "../../shared/plugins/alert";
import {
  Drawer,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import FileDropzone from "./Dropzone";
import SplashScreen from "../../pages/utils/SplashScreen";
import NotFound from "./NotFound";
import Colors from "../../utils/Colors";
import "../../assets/css/components/layouts/Galery.css";

function Galery({ anchor, state, toggleDrawer }) {
  const [mediaList, setMediaList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const getMedia = async () => {
    setIsLoading(true);
    const data = await getAllMedia();
    setMediaList(data.multimedia);
    setIsLoading(false);
  };

  useEffect(() => {
    getMedia();
  }, []);

  const handleFileUpload = (file) => {
    uploadMultimedia(file).then(() => {
      getMedia();
      setUploadedFile(null);
    });
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar este archivo?",
      "Se eliminará el archivo",
      "Si, eliminar",
      "Cancelar",
      () => {
        deleteMultimedia(id).then(() => {
          getMedia();
        });
      }
    );
  };

  const copyToClipboard = (link, id) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2500);
    });
  };

  const handleFilterChange = (event, type) => {
    setFilter(type);
  };

  const filteredMediaList = mediaList.filter((media) => {
    if (filter === "all") {
      return true;
    } else {
      return media.type === filter;
    }
  });

  return (
    <Drawer
      anchor={anchor}
      open={state[anchor]}
      onClose={toggleDrawer(anchor, false)}
    >
      <Box sx={{ width: 550, padding: "15px" }} role="presentation">
        <Row className="m-1">
            <FileDropzone
              onFileUpload={handleFileUpload}
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
              onContext="multimedia"
            />
        </Row>
        <Card>
          <Card.Header className="p-0">
            <BottomNavigation
              sx={{ width: "100%" }}
              value={filter}
              onChange={handleFilterChange}
            >
              <BottomNavigationAction
                label="Todos"
                value="all"
                icon={<MdPermMedia size={30} color={Colors.PalletePrimary} />}
              />
              <BottomNavigationAction
                label="Imágenes"
                value="image"
                icon={<MdInsertPhoto size={30} color={Colors.PalletePrimary} />}
              />
              <BottomNavigationAction
                label="Videos"
                value="video"
                icon={<MdMovie size={30} color={Colors.PalletePrimary} />}
              />
            </BottomNavigation>
          </Card.Header>
          <Card.Body>
            <Row>
              {isLoading ? (
                <SplashScreen isLoading={isLoading} />
              ) : (
                <>
                  {filteredMediaList.length === 0 ? (
                    <NotFound
                      text="No hay multimedia disponible"
                      textSize={20}
                      iconSize={80}
                    />
                  ) : (
                    <ImageList variant="masonry" cols={2} gap={3}>
                      {filteredMediaList.map((media) => (
                        <ImageListItem key={media._id}>
                          {media.type === "image" ? (
                            <img
                              src={media.multimedia}
                              alt="..."
                              style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: 5,
                                border: "1px solid rgb(180, 180, 180)",
                              }}
                              loading="lazy"
                            />
                          ) : (
                            <video
                              src={media.multimedia}
                              alt="..."
                              controls
                              controlsList="nodownload"
                              style={{
                                width: "100%",
                                height: "auto",
                                border: "1px solid rgb(180, 180, 180)",
                              }}
                            />
                          )}
                          <ImageListItemBar
                            style={{
                              backgroundColor: Colors.PalletePrimaryLight,
                              backfaceVisibility: "hidden",
                              borderEndStartRadius: 5,
                              borderEndEndRadius: 5,
                              border: "1px solid rgb(180, 180, 180)",
                            }}
                            actionPosition="left"
                            actionIcon={
                              <>
                                <MdCopyAll
                                  onClick={() =>
                                    copyToClipboard(media.multimedia, media._id)
                                  }
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "1.5rem",
                                    marginLeft: "5.3rem",
                                  }}
                                  size={18}
                                />
                                <MdDeleteForever
                                  onClick={() => handleDelete(media._id)}
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "1.5rem",
                                    color: Colors.PalleteDanger,
                                  }}
                                  size={18}
                                  className="ms-5"
                                />
                              </>
                            }
                          />
                          {copiedId === media._id && (
                            <div
                              id={`copied-${media._id}`}
                              className="copied-style fade-out-animation"
                            >
                              ¡Copiado!
                            </div>
                          )}
                        </ImageListItem>
                      ))}
                    </ImageList>
                  )}
                </>
              )}
            </Row>
          </Card.Body>
        </Card>
      </Box>
    </Drawer>
  );
}

export default Galery;
