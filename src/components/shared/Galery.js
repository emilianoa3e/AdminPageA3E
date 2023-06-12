import React, { useState, useEffect } from "react";
import { MdCopyAll } from "react-icons/md";
import axios from "axios";

function Sidebar() {
  const [mediaList, setMediaList] = useState([
    {
      url: "",
      type: "",
    },
  ]);

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

  console.log(mediaList);

  return (
    <div className="sidebar">
      <h2>Media Gallery</h2>
      <ul>
        {mediaList.map((media) => (
          <li key={media._id}>
            {media.type === "image" ? (
              <img
                src={media.multimedia}
                style={{ width: "30%", height: "auto" }}
              />
            ) : (
              <video
                src={media.multimedia}
                style={{ width: "30%", height: "auto" }}
                controls
              />
            )}
            <p>
              URL
              <MdCopyAll
                onClick={() => copyToClipboard(media.multimedia)}
                style={{ cursor: "pointer", fontSize: "2rem" }}
              />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
