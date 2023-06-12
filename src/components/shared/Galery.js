import React, { useState, useEffect } from "react";
import { MdCopyAll } from "react-icons/md";
import axios from "axios";

function Galery() {
  const [mediaList, setMediaList] = useState([
    {
      url: "",
      type: "",
    },
  ]);
  const [filter, setFilter] = useState("all"); // Estado para almacenar el tipo seleccionado (all, image, video)

  useEffect(() => {
    const getMedia = async () => {
      const response = await axios.get(
        "http://localhost:3001/api/galery/getAll-galery"
      );
      console.log(response.data.multimedia);
      setMediaList(response.data.multimedia);
    };

    getMedia();
  }, []);

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  // Aplicar el filtro en la lista de elementos
  const filteredMediaList = mediaList.filter((media) => {
    if (filter === "all") {
      return true; // Mostrar todos los elementos si el filtro es "all"
    } else {
      return media.type === filter; // Mostrar solo los elementos que coincidan con el filtro seleccionado
    }
  });

  return (
    <div className="gallery-container">
      <div className="card col-md-4">
        <p className="card-header">
          <div className="row">
            <div className="col-md-4" style={{ textAlign: "right" }}>
              <button
                className={`btn btn-primary ${
                  filter === "video" && "disabled"
                }`}
                onClick={() => handleFilterChange("video")}
              >
                Videos
              </button>
            </div>
            <div className="col-md-4" style={{ textAlign: "center" }}>
              <button
                className={`btn btn-primary ${
                  filter === "image" && "disabled"
                }`}
                onClick={() => handleFilterChange("image")}
              >
                Images
              </button>
            </div>
            <div className="col-md-4" style={{ textAlign: "left" }}>
              <button
                className={`btn btn-primary ${filter === "all" && "disabled"}`}
                onClick={() => handleFilterChange("all")}
              >
                All
              </button>
            </div>
          </div>
        </p>
        <div className="card-body">
          <div className="row">
            {filteredMediaList.map((media) => (
              <div className="col-md-6" key={media._id}>
                <div className="card" style={{ marginBottom: "15px" }}>
                  {media.type === "image" ? (
                    <img
                      src={media.multimedia}
                      className="card-img-top"
                      alt="..."
                      style={{ width: "100%", height: "160px" }}
                    />
                  ) : (
                    <video
                      src={media.multimedia}
                      className="card-img-top"
                      alt="..."
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                  <div className="card-footer" style={{ textAlign: "center" }}>
                    <MdCopyAll
                      onClick={() => copyToClipboard(media.multimedia)}
                      style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Galery;
