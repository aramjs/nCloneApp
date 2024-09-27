import { createContext, useContext } from "react";
import { modals } from "@/modals";

export type ModalName = keyof typeof modals;
export type ModalProps<M extends ModalName = ModalName> = Parameters<
  (typeof modals)[M]
>[0];

export type IModalContext = {
  modalName?: ModalName;
  modalProps?: ModalProps;
  closeModal: () => void;
  openModal: <M extends ModalName>(
    modalName: M,
    modalProps: ModalProps<M>
  ) => void;
};

export const ModalContext = createContext<IModalContext>({
  openModal: () => null,
  closeModal: () => null,
});

export const useModal = () => useContext(ModalContext);
