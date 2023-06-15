import React from "react";
import { FallingLines } from "react-loader-spinner";

const SplashScreen = ({ isLoading }) => {
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ height: "600px" }}
    >
      <div>
        <FallingLines
          color="#4fa94d"
          width="150"
          visible={isLoading}
          ariaLabel="falling-lines-loading"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
