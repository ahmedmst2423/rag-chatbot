// src/components/ModalRenderer.jsx
import { useModal } from "../context/modalContext";
import ConfirmModal from "./confirmModal";
import UploadModal from "./uploadModal";



const MODAL_COMPONENTS: any = {
  confirm: ConfirmModal,
  upload:UploadModal
};

export default function ModalRenderer() {
  const { modalType, modalProps, closeModal } = useModal();

  if (!modalType) return null;

  const ModalComponent = MODAL_COMPONENTS[modalType];

  return <ModalComponent open={!!modalType} onClose={closeModal} {...modalProps} />;
}
