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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <div className="absolute w-full h-full top-1/2 left-1/2 transform-50">
      <div className="relative top-1/2 left-1/2 transform-50 z-20 rounded-[40px] max-w-[720px] w-full bg-[#1c1c21] px-[10px]">
        <button className="absolute cursor-pointer right-10 top-[60px]" onClick={onClose}>
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
