import React from "react";
import { Form as FormBt, Col, Row } from "react-bootstrap";
import { TextInput } from "../../components/shared/TextInput";
import { MdPerson, MdMailOutline } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { SelectInput } from "../shared/SelectInput";

function UserForm({
  errors,
  values,
  touched,
  optionsGender,
  optionsRole,
  showPassword,
  toggleShowPassword,
}) {
  return (
    <>
      <Row className="mb-2">
        <Col md={6} lg={6} className="mb-2">
          <FormBt.Group>
            <TextInput
              maxLength="50"
              label="Nombre(s)"
              name="name"
              icon={MdPerson}
              placeholder="Ingrese su nombre(s)"
              isInvalid={!!errors.name && touched.name}
            />
          </FormBt.Group>
        </Col>
        <Col md={6} lg={6} className="mb-2">
          <FormBt.Group>
            <TextInput
              maxLength="50"
              label="Apellido(s)"
              name="lastname"
              icon={MdPerson}
              placeholder="Ingrese su apellido(s)"
              isInvalid={!!errors.lastname && touched.lastname}
            />
          </FormBt.Group>
        </Col>
      </Row>
      <Row className="mb-2">
        <FormBt.Group>
          <TextInput
            maxLength="50"
            label="Correo electrónico"
            name="email"
            icon={MdMailOutline}
            placeholder="Ingrese su correo electrónico"
            isInvalid={!!errors.email && touched.email}
          />
        </FormBt.Group>
      </Row>
      <Row className="mb-2">
        <Col md={6} lg={6} className="mb-2">
          <FormBt.Group>
            <TextInput
              maxLength="20"
              label="Contraseña"
              name="password"
              type={showPassword ? "text" : "password"}
              icon={IoMdEye}
              placeholder="Ingrese su contraseña"
              isInvalid={!!errors.password && touched.password}
              onIconClick={toggleShowPassword}
            />
          </FormBt.Group>
        </Col>
        <Col md={6} lg={6} className="mb-2">
          <FormBt.Group>
            <TextInput
              maxLength="20"
              label="Confirmar contraseña"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              icon={IoMdEye}
              placeholder="Confirme su contraseña"
              isInvalid={!!errors.confirmPassword && touched.confirmPassword}
              onIconClick={toggleShowPassword}
            />
          </FormBt.Group>
        </Col>
        <p
          className="mt-1 text-muted text-center"
          style={{ fontSize: 12.5, fontStyle: "italic" }}
        >
          Una vez que se haya registrado, se recomienda que el
          usuario cambie su contraseña.
        </p>
      </Row>
      <Row className="mb-2">
        <Col>
          <FormBt.Group>
            <SelectInput
              label="Género"
              name="gender"
              defaultText="Seleccione un género..."
              options={optionsGender}
              isInvalid={!!errors.gender && touched.gender}
            />
          </FormBt.Group>
        </Col>
        <Col>
          <FormBt.Group>
            <SelectInput
              label="Rol"
              name="role"
              defaultText="Seleccione un rol..."
              options={optionsRole}
              isInvalid={!!errors.role && touched.role}
            />
          </FormBt.Group>
        </Col>
      </Row>
    </>
  );
}

export default UserForm;
