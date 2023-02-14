import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import ModalOverlay from "./ModalOverlay/ModalOverlay";

import styles from "./Modal.module.css";

const modalRoot = document.getElementById("react-modals");

function Modal({ children, onCloseClick }) {
  const modalRef = React.useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onCloseClick();
    }
  };

  React.useEffect(() => {
    modalRef.current.focus();
  }, []);

  return ReactDOM.createPortal(
    <>
      <div
        ref={modalRef}
        className={`${styles.Modal} pr-10 pl-10`}
        tabIndex="0"
        onKeyDown={handleKeyDown}>
        {children}
      </div>
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
