import React, { useState, useEffect } from "react";
import { Col, Modal } from "react-bootstrap";
import { showConfirmDialog, showError400 } from "../../../shared/plugins/alert";
import {
  getAllPositions,
  changePositionStatus,
  deletePosition,
} from "../../../utils/positionsFunctions";
import { MdAdd } from "react-icons/md";
import { Button } from "@mui/material";
import { columnsPositionsVacancie } from "../../columnsTables/columnsPositionsVacancie";
import { ModalCreatePosition } from "./ModalCreatePosition";
import DynamicTable from "../../shared/DynamicTable";
import SplashScreen from "../../../pages/utils/SplashScreen";
import Colors from "../../../utils/Colors";

export const ModalPosition = ({ props, show, handleClose }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState(false);

  const handleShowCreate = () => setShowCreate(true);
  const handleCloseCreate = () => setShowCreate(false);

  const getPositions = async () => {
    setIsLoading(true);
    try {
      const data = await getAllPositions();
      setPositions(data.positions);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getPositions();
  }, []);

  const handleChangeStatus = (id) => {
    showConfirmDialog(
      "¿Estás seguro de cambiar el status del puesto?",
      "Se cambiará el status del puesto",
      "Si, cambiar status",
      "Cancelar",
      () => {
        changePositionStatus(id).then(() => {
          getPositions();
        });
      }
    );
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar el puesto?",
      "Se eliminará el puesto",
      "Si, eliminar",
      "Cancelar",
      () => {
        deletePosition(id).then(() => {
          getPositions();
        });
      }
    );
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-lg"
      >
        {isLoading ? (
          <SplashScreen />
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Puestos
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DynamicTable
                titleTable="Puestos para vacantes"
                columns={columnsPositionsVacancie}
                data={positions}
                handleChangeStatus={handleChangeStatus}
                handleDelete={handleDelete}
                showFilter={true}
                showPages={3}
              />
              <Col className="d-flex justify-content-end">
                <Button
                  variant="contained"
                  size="medium"
                  endIcon={<MdAdd />}
                  style={{
                    backgroundColor: Colors.PalletePrimary,
                  }}
                  onClick={() => handleShowCreate()}
                  className="mt-3"
                >
                  Agregar puesto
                </Button>
              </Col>
            </Modal.Body>
            {error && (
              <Modal.Footer>
                <p
                  style={{
                    color: Colors.PalleteDanger,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Error al cargar los puestos. Por favor, intente de nuevo más
                  tarde.
                </p>
              </Modal.Footer>
            )}
          </>
        )}
      </Modal>
      <ModalCreatePosition
        show={showCreate}
        handleClose={handleCloseCreate}
        getPositions={getPositions}
      />
    </>
  );
};
