// import style from "./style/toast.module.scss"
import { forwardRef, ReactElement, useEffect } from "react";

export interface HeaderProps {
  text?:string;
}
export interface ModalProps {
  header:HeaderProps, 
  body:ReactElement,
  onCloseProfile: () => void
}
const Modal = forwardRef<HTMLDialogElement, ModalProps>(({header, body, onCloseProfile}, ref) => { 
  useEffect(()=>{

  }, [])
  return (
    <dialog ref={ref}>
      <h2 className="pad-1">{header.text}</h2>
      <div>{body}</div>
      <button onClick={onCloseProfile}>Close</button>
    </dialog> 
  );
});
export default  Modal;
