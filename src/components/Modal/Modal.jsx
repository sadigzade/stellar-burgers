import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import ModalOverlay from "./ModalOverlay/ModalOverlay";

import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

function Modal({ children, onClose }) {
  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return ReactDOM.createPortal(
    <div className={styles.Modal}>
      <div className={`${styles.ModalWrapper} pr-10 pl-10`}>
        <button className={styles.CloseIcon} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onCloseClick={onClose} />
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
