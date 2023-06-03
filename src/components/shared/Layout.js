import React from 'react'
import { Container } from 'react-bootstrap';

function Layout({children}) {
    return (
        <>
            {/* <Navbar /> */}
            <Container className='mt-4 px-4'>{children}</Container>
        </>
    )
}

export default Layout