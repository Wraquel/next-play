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

  useEffect(() => {
    const dialog = ref && 'current' in ref ? ref.current : null;
    const body = document.body;
    if(dialog) body.style.position = 'relative';
    body.style.overflow = 'hidden';

    console.log("Body dimensions:", body.getBoundingClientRect());

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const handleMouseDown = (event: MouseEvent) => {
      if (dialog && event.target === dialog.querySelector(`#draggable-profile`)) {
        dragging = true;
        // console.log("DOWN", event);
        const rect = dialog.getBoundingClientRect();
        // console.log("rect", rect);

        dialog.style.left = `${rect.left}px`;
        dialog.style.top = `${rect.top}px`;

        dialog.style.cursor = 'grabbing';
        dialog.style.transform = 'none';

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (dragging && dialog) {
        // console.log("MOVE", event);
        dialog.style.cursor = 'grabbing';
        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;

        const maxX = window.innerWidth - dialog.offsetWidth;
        const maxY = window.innerHeight - dialog.offsetHeight;

        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        dialog.style.left = `${x}px`;
        dialog.style.top = `${y}px`;
      }
    };

    const handleMouseUp = () => {
      dragging = false;
      if (dialog) {
        dialog.style.cursor = 'grab';
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [ref]);
  return (
    <>
      <div className={style.backdrop} aria-hidden="true"/>
      <div className={style.dialog}>
        <dialog ref={ref}>
          <div className={style.header} id="draggable-profile">
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
