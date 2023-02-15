import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import ModalOverlay from "./ModalOverlay/ModalOverlay";

import styles from "./Modal.module.css";

const modalRoot = document.getElementById("react-modals");

function Modal({ children, onCloseClick }) {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onCloseClick();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.Modal} pr-10 pl-10`}>{children}</div>
      <ModalOverlay onCloseClick={onCloseClick} />
    </>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

export default Modal;
