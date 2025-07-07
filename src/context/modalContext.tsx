import { createContext, useContext, useState, useCallback } from "react";

const ModalContext = createContext<any>(null);

export const ModalProvider = ({ children }: any) => {
  const [modalType, setModalType] = useState(null);
  const [modalProps, setModalProps] = useState({});

  const openModal = (type: any, props = {}) => {
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  };

  const setProps = useCallback((props: any) => {
    setModalProps(prevProps => ({ ...prevProps, ...props }));
  }, []);

  return (
    <ModalContext.Provider value={{ modalType, modalProps, openModal, closeModal, setProps }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
