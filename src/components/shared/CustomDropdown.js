import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import { getUser } from "../../utils/profileFunctions";
import { MdAccountCircle, MdArrowDropDown, MdLogout } from "react-icons/md";
import { ModalProfile } from "../profile/ModalProfile";
import { showConfirmDialog } from "../../shared/plugins/alert";
import { Avatar, Divider, Chip } from "@mui/material";
import "../../assets/css/components/layouts/customDropdown.css";

function CustomDropdown() {
  const { logout, authState } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({});
  const [phrase, setPhrase] = useState("");

  const handleTime = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 0 && hour < 12) {
      setPhrase("Buenos días");
    } else if (hour >= 12 && hour < 19) {
      setPhrase("Buenas tardes");
    } else {
      setPhrase("Buenas noches");
    }
  };

  const handleClose = () => {
    setShow(false);
    setIsEdit(false);
  };
  const handleShow = () => setShow(true);
  const handleEdit = () => setIsEdit(!isEdit);

  const getUserProfile = async () => {
    if (!authState.id) return;
    const response = await getUser(authState.id);
    setUserData(response.user);
  };

  useEffect(() => {
    getUserProfile();
    handleTime();
  }, [authState]);

  const handleLogout = () => {
    showConfirmDialog(
      "¿Está seguro que desea cerrar sesión?",
      "Se cerrará su sesión",
      "Cerrar sesión",
      "Cancelar",
      () => {
        logout();
      }
    );
  };

  return (
    <div className="dropdown__content ">
      <Container>
        <Row>
          <Col md={12}>
            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle className="d-flex align-items-center dropdown-link text-left">
                <Avatar
                  alt={userData.name}
                  src={userData.photo ? userData.photo : "x"}
                  sx={{ width: 50, height: 50, fontSize: 25 }}
                />
                <MdArrowDropDown color="ccc" size="2em" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header style={{ textAlign: "center" }}>
                  {authState.fullName}
                </Dropdown.Header>
                <Divider className="mt-2 mb-2">
                  <Chip label={authState.role} />
                </Divider>
                <Dropdown.Item className="dropdown-item" onClick={handleShow}>
                  <MdAccountCircle className="me-1" size={25} />
                  Mi perfil
                </Dropdown.Item>
                <Dropdown.Item className="dropdown-item" onClick={handleLogout}>
                  <MdLogout className="me-1" size={25} />
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <ModalProfile
          show={show}
          handleClose={handleClose}
          handleEdit={handleEdit}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          userData={userData}
          getUserProfile={getUserProfile}
          phrase={phrase}
        />
      </Container>
    </div>
  );
}

export default CustomDropdown;
