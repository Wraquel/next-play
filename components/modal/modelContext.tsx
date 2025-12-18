import { createContext, useState, useContext, useRef, useEffect, useMemo, useCallback } from "react";
import ProfileModal from "@/pages/template/modals/profile";
import MoreModal from "@/pages/template/modals/more";
type ModalType = "profile" | "moreModal";

type ModalContextType = {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({children}: {children:React.ReactNode})=>{
  const [modalType, setModalType] = useState<{type: ModalType | null}>({type: null});

  const dialogRef = useRef<HTMLDialogElement>(null);
  const openModal = useCallback((type: ModalType) => {
    setModalType({type})
  }, []);
  const closeModal = useCallback(() => {
    setModalType({type:null})
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    if (modalType.type && dialogRef.current) {
      dialogRef.current.show();
    }
  }, [modalType.type]);

  const contextValue = useMemo(() => ({ openModal, closeModal, dialogRef }), [openModal, closeModal, dialogRef]);

  return(
    <ModalContext.Provider value={contextValue}>
      {children}
      {modalType.type === "profile" && <ProfileModal dialogRef={dialogRef} onCloseProfile={closeModal} />}
      {modalType.type === "moreModal" && <MoreModal dialogRef={dialogRef} onCloseMore={closeModal} />}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if(!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}