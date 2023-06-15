import React from "react";
import "../../assets/css/components/layouts/CustomButton.css";
function CustomButton({
  text,
  onClick,
  className = "",
  type,
  disabled,
  children,
  size = "medium",
  color = "primary",
  shape = "rounded",
  hidden,
}) {
  const isDisabled = () => disabled && "primary-btn-disabled";
  const buttonClassNames = `primary-btn primary-btn-${size} primary-btn-${color} primary-btn-${shape} ${className} ${isDisabled()}`;

  return (
    <button
      className={buttonClassNames}
      onClick={onClick}
      type={type}
      disabled={disabled}
      hidden={hidden}
    >
      {text}
      {children && children}
    </button>
  );
}

export default CustomButton;
