import React from "react";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";

function SpeedDialButton({
  positionTooltip,
  speedDialItems,
  directionSD,
  buttonClassname,
  showIcon,
  hideIcon,
}) {
  return (
    <>
      <Tooltip
        target=".speeddial-bottom-right .p-speeddial-action"
        position={positionTooltip}
      />
      <SpeedDial
        model={speedDialItems}
        direction={directionSD}
        transitionDelay={80}
        style={{ position: "fixed", right: 10, bottom: 10, zIndex: 3 }}
        className="speeddial-bottom-right"
        buttonClassName={buttonClassname}
        showIcon={showIcon}
        hideIcon={hideIcon}
      />
    </>
  );
}

export default SpeedDialButton;
