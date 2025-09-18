import style from "./style/modal.module.scss"
import { forwardRef, ReactElement, useEffect } from "react";

export interface HeaderProps {
  text?:string;
}
export interface ModalProps {
  header:HeaderProps, 
  body:ReactElement,
  footer:ReactElement,
  onCloseProfile: () => void
}
const Modal = forwardRef<HTMLDialogElement, ModalProps>(({header, body, footer, onCloseProfile}, ref) => { 
useEffect(()=>{
}, [])
  return (
    <div className={style.dialog}>
      <dialog ref={ref} >
        <h2 className={style.header}>{header.text}</h2>
        <div className={style.body}>{body}</div>
        <div className={style.footer}>{footer}</div>
      </dialog> 
    </div>
  );
});
export default Modal;
