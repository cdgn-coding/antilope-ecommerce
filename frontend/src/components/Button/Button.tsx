import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  type?: "primary" | "secondary" | "disabled";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
}

const Button = ({
  type = "primary",
  size = "small",
  className = "",
  children,
  onClick,
}: ButtonProps) => {
  const typeClass = styles[type];
  const sizeClass = styles[size];

  return (
    <button
      className={`${styles.button} ${typeClass} ${sizeClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
