import React from "react";
import styles from "./Button.css";

export const ButtonTypes = {
  Default: "default",
  Round: "round",
};

const getButtonClass = (type) => {
  switch (type) {
    default:
    case ButtonTypes.Default:
      return styles.button;
    case ButtonTypes.Round:
      return `${styles.button} ${styles.round}`;
  }
};

const Button = ({
  children,
  type = ButtonTypes.Default,
  active = false,
  highlighted = false,
  outline = false,
  onClick = () => {},
  className = "",
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        ${getButtonClass(type)}
        ${active ? styles.active : ""}
        ${highlighted ? styles.highlighted : ""}
        ${outline ? styles.outline : ""}
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
