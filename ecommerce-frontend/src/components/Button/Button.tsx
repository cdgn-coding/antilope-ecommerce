import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  type?: "primary" | "secondary";
  children?: React.ReactNode;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
}

const Button = ({
  type = "primary",
  size = "small",
  children,
  onClick,
}: ButtonProps) => {
  const typeClass = styles[type];
  const sizeClass = styles[size];

  return (
    <button
      className={`${styles.button} ${typeClass} ${sizeClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
