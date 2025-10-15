import style from "./style/modal.module.scss"
import { forwardRef, ReactElement } from "react";

export interface HeaderProps {
  text?:string;
  icon?:string | ReactElement;
}
export interface ModalProps {
  header:HeaderProps, 
  body:ReactElement,
  footer:ReactElement
}
const Modal = forwardRef<HTMLDialogElement, ModalProps>(({header, body, footer}, ref) => { 

  return (
    <div className={style.dialog}>
      <dialog ref={ref} >
        <div className={style.header}>
          <h1>{header.text}</h1>
          <span>{header.icon}</span>
        </div>
        <div className={style.body}>{body}</div>
        <div className={style.footer}>{footer}</div>
      </dialog> 
    </div>
  );
});

Modal.displayName = "Modal";

export default Modal;
