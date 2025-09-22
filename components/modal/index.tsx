import style from "./style/modal.module.scss"
import { forwardRef, ReactElement } from "react";

export interface HeaderProps {
  text?:string;
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
        <h2 className={style.header}>{header.text}</h2>
        <div className={style.body}>{body}</div>
        <div className={style.footer}>{footer}</div>
      </dialog> 
    </div>
  );
});
export default Modal;
