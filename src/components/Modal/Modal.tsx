import { FC, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModalProps {
  children?: ReactNode;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {
  const handleKeyDown = (e: globalThis.KeyboardEvent): void => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
};

export default Modal;
