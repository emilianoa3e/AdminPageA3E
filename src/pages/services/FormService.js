import React from 'react'
import Galery from '../../components/shared/Galery'
import EditorWys from '../../components/shared/EditorWys'
import { Col, Row, Container } from 'react-bootstrap'
function FormService() {


  return (
    <>
      <div className='container-fluid p-0'>
        <h2 className='text-center'>Nuevo Servicio</h2>
        <Row>
          <Col style={{backgroundColor:'gray'}}>
            <Galery/>
          </Col>
          <Col xs='9' md='9'>
            <EditorWys />
          </Col>
        </Row>
      </div>




    </>
  )
}

export default FormService