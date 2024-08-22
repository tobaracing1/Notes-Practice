import React, { SetStateAction, useContext } from "react";
import ModalContext from "@/contexts/modal-context";

interface Props {
  children: React.ReactNode;
}

interface ModalValueType {
  modalIsOpen: boolean;
  toggleModal: () => void;
}

const ModalProvider: React.FC<Props> = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const toggleModal = () => {
    setModalIsOpen((prev) => !prev);
  };

  const ModalValue: ModalValueType = {
    modalIsOpen,
    toggleModal,
  };
  return (
    <ModalContext.Provider value={ModalValue}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModal = () => {
  const ModalCtx = useContext(ModalContext);

  if (!ModalCtx) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return ModalCtx;
};
