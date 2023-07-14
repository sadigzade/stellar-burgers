import React, { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  type?: "secondary" | "primary";
  htmlType?: "button" | "submit" | "reset";
  href?: string;
}

const Button: FC<ButtonProps> = ({ children, type, htmlType = "button", href }) => {
  const className = classNames(styles.button, {
    [styles["button--secondary"]]: type === "secondary",
    [styles["button--primary"]]: type === "primary",
  });

  const Component = href ? (
    <Link to={href} className={className}>
      {children}
    </Link>
  ) : (
    <button type={htmlType} className={className}>
      {children}
    </button>
  );

  return Component;
};

export default Button;
