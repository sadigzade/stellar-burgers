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
    <div className="fixed w-full h-full top-1/2 left-1/2 transform-50 z-20">
      <div
        id="modal"
        className="lg:relative lg:rounded-[40px] lg:max-w-[720px] w-full h-full lg:h-auto lg:top-1/2 lg:left-1/2 lg:transform-50 flex items-center justify-center z-20 bg-[#131317]"
      >
        <button
          id="modal-close"
          className="absolute cursor-pointer top-4 lg:top-[60px] right-2 lg:right-10"
          onClick={onClose}
        >
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
