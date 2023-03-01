import React from "react";
import PropTypes from "prop-types";
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

ConstructorElementEmpty.propTypes = {
  position: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ConstructorElementEmpty;
