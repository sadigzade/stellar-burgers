import { FC } from "react";

type ModalOverlayProps = {
  onCloseClick: () => void;
};

const ModalOverlay: FC<ModalOverlayProps> = ({ onCloseClick }) => {
  return (
    <div
      className="hidden lg:block absolute top-0 left-0 w-full h-full bg-[#000000]/60 z-10"
      onClick={onCloseClick}
    />
  );
};

export default ModalOverlay;
