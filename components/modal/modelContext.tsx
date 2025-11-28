import { createContext, useState, useContext, useRef, useEffect } from "react";
import ProfileModal from "@/pages/template/modals/profile";

type ModalType = "profile" | "settings";

type ModalContextType = {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({children}: {children:React.ReactNode})=>{
  const [modalType, setModalType] = useState<{type: ModalType | null}>({type: null});

  const dialogRef = useRef<HTMLDialogElement>(null);
  const openModal = (type: ModalType) => {
    setModalType({type})
  };
  const closeModal = () => {
    setModalType({type:null})
    dialogRef.current?.close();
  };

  useEffect(() => {
    if (modalType.type && dialogRef.current) {
      dialogRef.current.show();
    }
  }, [modalType.type]);

  return(
    <ModalContext.Provider value={{ openModal, closeModal, dialogRef }}>
      {children}
      {modalType.type === "profile" && <ProfileModal dialogRef={dialogRef} onCloseProfile={closeModal} />}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if(!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}