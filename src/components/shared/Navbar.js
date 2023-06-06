import React from 'react'
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar as NavbarBt, NavDropdown } from 'react-bootstrap';
import { MdAssignmentTurnedIn, MdBook, MdHome, MdLabel } from 'react-icons/md';

function CustomNavbar() {
    return (
        <NavbarBt
            bg='dark'
            variant='dark'
            className='custom-navbar'
            expand='lg'
            sticky='top'
        >
            <Container>
                <NavbarBt.Brand href='/home'>

                    {/* <img
                    alt=''
                    src={logo}
                    width='45'
                    height='auto'
                    className='d-inline-block align-top'
                />{' '} */}
                    A3E
                </NavbarBt.Brand>
                <NavbarBt.Toggle aria-controls='basic-navbar-nav' />
                <NavbarBt.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <NavLink
                            to='/home'
                            className='d-flex align-items-center me-3 nav-link'
                        >
                            <MdHome className='me-1' />
                            Inicio
                        </NavLink>

                        <NavDropdown title={<span><MdBook className="me-1" /> Dropdown</span>} className=' align-items-center me-3' id="basic-nav-dropdown" >
                            <NavDropdown.Item >Action</NavDropdown.Item>
                            <NavDropdown.Item >
                                Filosofia
                            </NavDropdown.Item>
                            <NavDropdown.Item >
                                Politica de calidad
                            </NavDropdown.Item>
                            <NavDropdown.Item >
                                Certificado y licencias
                            </NavDropdown.Item>
                            <NavDropdown.Item >
                                Clientes
                            </NavDropdown.Item>
                            <NavDropdown.Item >
                                Equipo A3E
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavLink
                            to='/services'
                            className='d-flex align-items-center me-3 nav-link'
                        >
                            <MdLabel className='me-1' />
                            Servicios
                        </NavLink>

                        <NavLink
                            to='/news'
                            className='d-flex align-items-center me-3 nav-link'
                        >
                            <MdAssignmentTurnedIn className='me-1' />
                            Noticias
                        </NavLink>
                        <NavLink
                            to='/sismediart'
                            className='d-flex align-items-center me-3 nav-link'
                        >
                            <MdAssignmentTurnedIn className='me-1' />
                            SISMEDIA-RT
                        </NavLink>
                    </Nav>

                </NavbarBt.Collapse>
            </Container>
        </NavbarBt>
    )
}

export default CustomNavbar