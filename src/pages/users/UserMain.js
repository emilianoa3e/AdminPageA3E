import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { showConfirmDialog, showError400 } from "../../shared/plugins/alert";
import {
  getAllUsers,
  changeStatus,
  deleteUser,
} from "../../utils/usersFunctions";
import { columnsUser } from "../../components/columnsTables/columnsUser";
import { MdAdd } from "react-icons/md";
import { ModalCreateUser } from "../../components/user/ModalCreateUser";
import SplashScreen from "../../pages/utils/SplashScreen";
import DynamicTable from "../../components/shared/DynamicTable";
import Colors from "../../utils/Colors";

function UserMain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data.users);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChangeStatus = (id) => {
    showConfirmDialog(
      "¿Estás seguro de cambiar el status del usuario?",
      "Se cambiará el status del usuario",
      "Si, cambiar status",
      "Cancelar",
      () => {
        changeStatus(id).then(() => {
          getUsers();
        });
      }
    );
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      "¿Estás seguro de eliminar el usuario?",
      "Se eliminará el usuario",
      "Si, eliminar",
      "Cancelar",
      () => {
        deleteUser(id).then(() => {
          getUsers();
        });
      }
    );
  };

  const filterRole = users.filter((user) => user.role !== "superadmin");

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
      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            variant="contained"
            color="primary"
            endIcon={<MdAdd />}
            onClick={() => handleShow()}
            style={{
              backgroundColor: Colors.PalletePrimary,
              marginBottom: 20,
            }}
          >
            Agregar usuario
          </Button>
        </Col>
      </Row>
      <Row>
        <DynamicTable
          titleTable="Usuarios"
          columns={columnsUser}
          data={filterRole}
          handleDelete={handleDelete}
          handleChangeStatus={handleChangeStatus}
          showFilter={true}
        />
      </Row>
      <ModalCreateUser
        show={show}
        handleClose={handleClose}
        getUsers={getUsers}
      />
    </Container>
  );
}

export default UserMain;
