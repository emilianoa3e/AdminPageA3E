import React from "react";
import { Form as FormBt } from "react-bootstrap";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { TextInput } from "../../components/shared/TextInput";

function ChangePasswordForm({
  errors,
  values,
  touched,
  showPassword,
  toggleShowPassword,
}) {
  return (
    <>
      <FormBt.Group className="mb-2">
        <TextInput
          label="Contraseña actual"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Ingrese su contraseña actual"
          icon={showPassword ? IoMdEyeOff : IoMdEye}
          onIconClick={toggleShowPassword}
          isInvalid={!!errors.password && touched.password}
          error={errors.password}
        />
      </FormBt.Group>
      <FormBt.Group className="mb-2">
        <TextInput
          label="Nueva contraseña"
          name="newPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Ingrese su nueva contraseña"
          icon={showPassword ? IoMdEyeOff : IoMdEye}
          onIconClick={toggleShowPassword}
          isInvalid={!!errors.newPassword && touched.newPassword}
          error={errors.newPassword}
        />
      </FormBt.Group>
      <FormBt.Group className="mb-2">
        <TextInput
          label="Confirmar contraseña"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Confirme su nueva contraseña"
          icon={showPassword ? IoMdEyeOff : IoMdEye}
          onIconClick={toggleShowPassword}
          isInvalid={!!errors.confirmPassword && touched.confirmPassword}
          error={errors.confirmPassword}
        />
      </FormBt.Group>
    </>
  );
}

export default ChangePasswordForm;
