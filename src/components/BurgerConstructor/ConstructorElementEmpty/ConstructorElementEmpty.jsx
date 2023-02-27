import React from "react";
import styles from "./ConstructorElementEmpty.module.css";

const ConstructorElementEmpty = ({ position, borderColor, text }) => {
  return (
    <div
      className={`${styles.ConstructorElementEmpty} ${styles[position]}`}
      style={{ borderColor }}>
      <p className="text text_type_main-medium">{text}</p>
    </div>
  );
};

export default ConstructorElementEmpty;
