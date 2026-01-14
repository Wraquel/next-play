import style from "./style/modal.module.scss"
import { forwardRef, ReactElement, useEffect, useImperativeHandle, useRef} from "react";

export interface HeaderProps {
  text?:string;
  icon?:string | ReactElement;
}
export interface ModalProps {
  header:HeaderProps,
  body:ReactElement,
  footer?:ReactElement
}
const Modal = forwardRef<HTMLDialogElement | null, ModalProps>(({header, body, footer}, ref) => {
  const _ref= useRef<HTMLDivElement | null>(null);
  const dialogWrapper = useRef<HTMLDialogElement | null >(null);

  useImperativeHandle(ref, () => dialogWrapper.current!);

  const throttle = <CB extends (...args: unknown[]) => unknown, TimeInMs extends number>(cb: CB, limit?: TimeInMs) => {
    let inThrottle: boolean = false;
    return (...args: Parameters<CB>) => {
      if (inThrottle) return
      cb(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    };
  };
  
  useEffect(() => {
    const dialog = dialogWrapper.current;
    if (!dialog) return;
    const headerRef = _ref.current;
    const rect = dialog.getBoundingClientRect();
    document.body.style.position = 'relative';
    
    const maxX = window.innerWidth - dialog.offsetWidth;
    const maxY = window.innerHeight - dialog.offsetHeight;

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const handleMouseDown = (event: MouseEvent) => {
      dragging = true;

      dialog.style.left = `${rect.left}px`;
      dialog.style.top = `${rect.top}px`;

      dialog.style.transform = 'none';

      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
    };

    const handleMouseMove = (event: MouseEvent) => {
      return throttle(() => {
        if (dragging) {
          if (headerRef) headerRef.style.cursor = 'grabbing';
          let x = event.clientX - offsetX;
          let y = event.clientY - offsetY;
      
          x = Math.max(0, Math.min(x, maxX));
          y = Math.max(0, Math.min(y, maxY));

          dialog.style.left = `${x}px`;
          dialog.style.top = `${y}px`;
        }
      }, 20)();
    };
    const handleMouseUp = () => {
      dragging = false;
      if (headerRef) headerRef.style.cursor = 'move';
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  return (
    <>
      <div className={style.backdrop} aria-hidden="true"/>
      <div className={style.dialog}>
        <dialog ref={dialogWrapper}>
          <div className={style.header} ref={_ref}>
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
