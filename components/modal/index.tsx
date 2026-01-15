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
  // const resizeDiv = useRef<HTMLDivElement | null >(null);

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
    // const resizeD = resizeDiv.current;
    document.body.style.position = 'relative';
    // console.log('DIALOG MOUNTED', resizeD);
    const maxX = window.innerWidth - dialog.offsetWidth;
    const maxY = window.innerHeight - dialog.offsetHeight;

    let dragging = false;
    // let resize = false;
    let offsetX = 0;
    let offsetY = 0;
    // let initialWidth = 0;
    // let initialMouseX = 0;

    const handleMouseDown = (event: MouseEvent) => { // mouse positon
      // if (event.target === dialogWrapper.current?.parentElement?.querySelector(`.${style.resize}`)) {
        // if (event.target === resizeDiv.current) {
        //   console.log('RESIZE START');
        //   // Store initial values for resize
        //   return;
        // }
        // resize = true;
        // initialWidth = dialog.offsetWidth;
        // initialMouseX = event.clientX;
        
        // MOVE
        if (dialog && event.target === headerRef) {
          dragging = true;
          
          const rect = dialog.getBoundingClientRect();

          dialog.style.transform = 'none';
          dialog.style.left = `${rect.left}px`;
          dialog.style.top = `${rect.top}px`;
          // dialog.style.transform = `translate(${rect.left}px, -${rect.top}px)`;

          offsetX = event.clientX - rect.left; // VW horizontal ditance from the left edge of the dialog to whre i clicked
          offsetY = event.clientY - rect.top;
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
      return throttle(() => {
        if (dragging) {
          if (headerRef) headerRef.style.cursor = 'grabbing';

          // Calculate how much the mouse moved from initial position 
          let x = event.clientX - offsetX;
          let y = event.clientY - offsetY;
      
          x = Math.max(0, Math.min(x, maxX));
          y = Math.max(0, Math.min(y, maxY));

          dialog.style.left = `${x}px`;
          dialog.style.top = `${y}px`;

          // dialog.style.transform = `translate(${x}px, -${y}px)`;
          // console.log('Mouse Move', x, y);
          // console.log('TRANSFORM', dialog.style.transform);
        }
        // if (resize) {
        //   // Calculate how much the mouse moved from initial position 
        //   const mouseDelta = event.clientX - initialMouseX;
        //   const newWidth = Math.max(300, initialWidth + mouseDelta); // Min width 300px
          
        //   dialog.style.width = `${newWidth}px`;
        // }
      }, 20)();
    };
    const handleMouseUp = () => {
      dragging = false;
      // resize = false;
      if (headerRef) headerRef.style.cursor = 'move';
    };

    // document.addEventListener('mousedown', handleResize);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
    // document.addEventListener('mousedown', handleResize);

      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  return (
    <>
      <div className={style.backdrop} aria-hidden="true"/>
      <div className={style.dialog}>
        {/* <div className={style.resize}> */}
          <dialog ref={dialogWrapper}>
            <div className={style.header} ref={_ref}>
              <h1>{header.text}</h1>
              <span>{header.icon}</span>
            </div>
            <div className={style.body}>{body}</div>
            {footer && <div className={style.footer}>{footer}</div>}
          </dialog>
        {/* </div> */}
      </div>
    </>
  );
});

Modal.displayName = "Modal";

export default Modal;
