import { useState } from "react";

interface ModalState {
  isOpen: boolean;
  data?: any;
}

export function useModal<T = any>() {
  const [modal, setModal] = useState<ModalState>({ isOpen: false });

  const openModal = (data?: T) => {
    setModal({ isOpen: true, data });
  };

  const closeModal = () => {
    setModal({ isOpen: false, data: undefined });
  };

  const toggleModal = () => {
    setModal(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  return {
    isOpen: modal.isOpen,
    data: modal.data as T,
    openModal,
    closeModal,
    toggleModal
  };
}