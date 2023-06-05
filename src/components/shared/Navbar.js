import React from 'react'
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar as NavbarBt } from 'react-bootstrap';
import { MdAssignmentTurnedIn, MdBook, MdHome, MdLabel } from 'react-icons/md';

function Navbar() {
    return (
        <NavbarBt
            bg='dark'
            variant='dark'
            className='custom-navbar'
            expand='lg'
            sticky='top'
        >
            <Container>
                <NavbarBt.Brand href='/'>

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

                        <NavLink
                            to='/courses'
                            className='d-flex align-items-center me-3 nav-link'
                        >
                            <MdBook className='me-1' />
                            Cursos
                        </NavLink>

                        <NavLink
                            to='/categories'
                            className='d-flex align-items-center me-3 nav-link'
                        >
                            <MdLabel className='me-1' />
                            Categorías
                        </NavLink>

                        <NavLink
                            to='/surveys'
                            className='d-flex align-items-center me-3 nav-link'
                        >
                            <MdAssignmentTurnedIn className='me-1' />
                            Encuestas
                        </NavLink>
                    </Nav>
                
                </NavbarBt.Collapse>
            </Container>
        </NavbarBt>
    )
}

export default Navbar