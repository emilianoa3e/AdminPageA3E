import React from "react";
import { Form as FormBt, Col, Row } from "react-bootstrap";
import { TextInput } from "../../components/shared/TextInput";

function ProfileForm({ errors, values, touched, isEdit }) {
  return (
    <>
      <Row>
        <Col>
          <FormBt.Group className="mb-2">
            <TextInput
              maxLength="80"
              label="Nombre"
              name="name"
              placeholder="Nombre"
              isInvalid={!!errors.name && touched.name}
              disabled={!isEdit}
            />
          </FormBt.Group>
        </Col>
        <Col>
          <FormBt.Group className="mb-2">
            <TextInput
              maxLength="100"
              label="Apellido"
              name="lastname"
              placeholder="Apellido"
              isInvalid={!!errors.lastname && touched.lastname}
              disabled={!isEdit}
            />
          </FormBt.Group>
        </Col>
      </Row>
      <FormBt.Group className="mb-2">
        <TextInput
          maxLength="240"
          label="Correo electrónico"
          name="email"
          placeholder="Correo electrónico"
          isInvalid={!!errors.email && touched.email}
          disabled={!isEdit}
        />
      </FormBt.Group>
    </>
  );
}

export default ProfileForm;
