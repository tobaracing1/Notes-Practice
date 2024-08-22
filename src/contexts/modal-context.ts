import { createContext } from "react";

interface ModalValueType {
    modalIsOpen: boolean;
    toggleModal: () => void;
  }

const ModalContext = createContext<ModalValueType | null>(null);

export default ModalContext;