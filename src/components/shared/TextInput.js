import React from "react";
import { ErrorMessage, useField } from "formik";
import { Form } from "react-bootstrap";

import styles from "../../assets/css/components/layouts/TextInput.module.css";

export const TextInput = ({ label, icon: Icon, onIconClick, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
      <div className={styles.inputWrapper}>
        <Form.Control {...field} {...props} />
        {Icon && (
          <div className={styles.iconWrapper}>
            {!meta.error && (
              <Icon className={styles.inputIcon} onClick={onIconClick} />
            )}
          </div>
        )}
      </div>
      {!!meta.touched && meta.error && (
        <Form.Control.Feedback type="invalid" className="d-block">
          <ErrorMessage name={props.name} />
        </Form.Control.Feedback>
      )}
    </>
  );
};
