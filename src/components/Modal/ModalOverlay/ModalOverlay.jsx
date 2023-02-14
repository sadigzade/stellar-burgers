import React from "react";
import PropTypes from "prop-types";

import styles from "./ModalOverlay.module.css";

function ModalOverlay({ onCloseClick }) {
  return <div className={styles.ModalOverlay} onClick={onCloseClick}></div>;
}

ModalOverlay.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
