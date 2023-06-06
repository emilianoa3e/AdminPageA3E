import React from 'react'
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar as NavbarBt, NavDropdown } from 'react-bootstrap';
import { MdAssignmentTurnedIn, MdBook, MdHome, MdLabel} from 'react-icons/md';
import CustomDropdown from './CustomDropdown';
import '../../assets/css/components/layouts/navbar.css'
import logo from '../../assets/img/Logo_Blanco.png'
function CustomNavbar() {
    return (
        <NavbarBt
            variant='dark'
            className='custom-navbar '
            expand='lg'
            sticky='top'
        >
            <Container >
                <NavbarBt.Brand href='/home'>
                    <img src={logo} width={70} ></img>
                   
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

                        <NavDropdown title={<span><MdBook className="me-1" /> Nosotros</span>} className=' align-items-center me-3' id="basic-nav-dropdown" >                        
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
                            to='/news'
                            className='d-flex align-items-center me-3 nav-link'
                        >
                            <MdAssignmentTurnedIn className='me-1' />
                            Sismedia-RT
                        </NavLink>                
                    </Nav>
                    <Nav>
                        <CustomDropdown />
                    </Nav>
                </NavbarBt.Collapse>
            </Container>
        </NavbarBt>
    )
}
//

export default CustomNavbar