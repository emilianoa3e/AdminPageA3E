import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import {Row, Col, Container, Dropdown, } from 'react-bootstrap'
import { MdAccountCircle, MdArrowDropDown, MdLogout } from 'react-icons/md';
import '../../assets/css/components/layouts/customDropdown.css'

function CustomDropdown() {
    const navigate = useNavigate();
    const { logout, authState } = useContext(AuthContext);

    const handleLogout = () => {
        // showConfirmDialog(
        //     'Cerrar sesión',
        //     '¿Estás seguro que deseas cerrar sesión?',
        //     'Confirmar',
        //     'Cancelar',
        //     logout
        // );
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <div className='dropdown__content '>
            <Container>
                <Row>
                    <Col md={12}>
                        <Dropdown className='custom-dropdown '>
                            <Dropdown.Toggle className='d-flex align-items-center dropdown-link text-left'>
                                <div className='profile-info'>
                                    <MdAccountCircle className='me-1 ms-0' />
                                    {/* {authState.fullName} */}
                                </div>
                                <MdArrowDropDown color='ccc' size='2em' />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    className='dropdown-item'
                                    onClick={handleProfile}
                                >
                                    <MdAccountCircle className='me-1' />
                                    Mi perfil
                                </Dropdown.Item>
                                <Dropdown.Item
                                    className='dropdown-item'
                                    onClick={handleLogout}
                                >
                                    <MdLogout className='me-1' />
                                    Cerrar sesión
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CustomDropdown