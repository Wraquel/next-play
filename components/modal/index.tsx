import { useModal } from "./modelContext";
import style from "./style/modal.module.scss"
import { forwardRef, ReactElement, useEffect } from "react";

export interface HeaderProps {
  text?:string;
  icon?:string | ReactElement;
}
export interface ModalProps {
  header:HeaderProps, 
  body:ReactElement,
  footer?:ReactElement
}
const Modal = forwardRef<HTMLDialogElement, ModalProps>(({header, body, footer}, ref) => { 
  const {dialogRef } = useModal();
  const isOpen = dialogRef.current?.open

  useEffect(()=>{
    if(isOpen){
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen])

  return (
    <>
    {isOpen && (
      <div className={style.backdrop} aria-hidden="true"/>
    )}
    <div className={style.dialog}>
      <dialog ref={ref}>
        <div className={style.header}>
          <h1>{header.text}</h1>
          <span>{header.icon}</span>
        </div>
        <div className={style.body}>{body}</div>
        {footer && <div className={style.footer}>{footer}</div>}
      </dialog> 
    </div>
    </>
  );
});

Modal.displayName = "Modal";

export default Modal;
