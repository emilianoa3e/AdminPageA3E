import React from "react";
import Navbar from "../components/shared/Navbar";
import Galery from "../components/shared/Galery";
import EditorWys from "../components/shared/EditorWys";

function Home() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <div>
              <Galery />
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div>
              <EditorWys />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
