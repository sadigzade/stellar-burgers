import { FC, ReactNode, useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

type ModalProps = {
  children?: ReactNode;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const handleKeyDown = (e: globalThis.KeyboardEvent): void => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return ReactDOM.createPortal(
    <div className="absolute w-full h-full top-1/2 left-1/2 transform-50 z-10">
      <div
        id="modal"
        className="relative top-1/2 left-1/2 transform-50 z-20 rounded-[40px] max-w-[720px] w-full bg-[#1c1c21] px-[10px]">
        <button
          id="modal-close"
          className="absolute cursor-pointer right-10 top-[60px]"
          onClick={onClose}>
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
