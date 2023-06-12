import React from 'react'
import CustomButton from '../../components/shared/CustomButton'
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import CustomTable from '../../components/shared/CustomTable';
function Services() {
  const navigate = useNavigate();
  return (
    <>
      <Row className='mb-3'>
        <Col xs={7} sm={8} md={10}>
          <h2>Servicios</h2>
        </Col>
        <Col xs={5} sm={4} md={2}>
          <CustomButton text={'Crear servicio'} onClick={() => navigate('/editor')} />
        </Col>
      </Row>
      <CustomTable/>


    </>
  )
}

export default Services