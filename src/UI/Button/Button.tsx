import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  type?: "secondary" | "primary";
  htmlType?: "button" | "submit" | "reset";
  href?: string;
}

const Button: FC<ButtonProps> = ({ children, type, htmlType = "button", href }) => {
  const Component = href ? "a" : "button";

  return (
    <Component
      {...(href ? { href } : { type: htmlType })}
      className={classNames(styles.button, {
        [styles["button--secondary"]]: type === "secondary",
        [styles["button--primary"]]: type === "primary",
      })}
    >
      {children}
    </Component>
  );
};

export default Button;
