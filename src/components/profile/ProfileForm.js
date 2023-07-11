import React from "react";
import { Form as FormBt, Col, Row } from "react-bootstrap";
import { TextInput } from "../../components/shared/TextInput";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";

function ProfileForm({ errors, values, touched, isEdit }) {
  return (
    <>
      <Row>
        <Col>
          <FormBt.Group className="mb-2">
            <TextInput
              maxLength="22"
              label="Nombre"
              name="name"
              placeholder="Nombre"
              isInvalid={!!errors.name && touched.name}
              disabled={!isEdit}
              icon={MdDriveFileRenameOutline}
            />
          </FormBt.Group>
        </Col>
        <Col>
          <FormBt.Group className="mb-2">
            <TextInput
              maxLength="22"
              label="Apellido"
              name="lastname"
              placeholder="Apellido"
              isInvalid={!!errors.lastname && touched.lastname}
              disabled={!isEdit}
              icon={MdDriveFileRenameOutline}
            />
          </FormBt.Group>
        </Col>
      </Row>
      <FormBt.Group className="mb-2">
        <TextInput
          maxLength="50"
          label="Correo electrónico"
          name="email"
          placeholder="Correo electrónico"
          isInvalid={!!errors.email && touched.email}
          disabled={!isEdit}
          icon={MdOutlineEmail}
        />
      </FormBt.Group>
    </>
  );
}

export default ProfileForm;
