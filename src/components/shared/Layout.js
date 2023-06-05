import React from 'react'
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';
import  '../../assets/css/components/layouts/layout.css'

function Layout({children}) {
    return (
        <>
            <Navbar/> 
            <Container className='mt-4 px-4'>{children}</Container>
        </>
    )
}

export default Layout