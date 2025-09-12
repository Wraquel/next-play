import style from "./style/toast.module.scss"

export type ToastVariants = "error" | "success" | "warning";
export interface ToastProps {
  className?: string; 
  variant?: ToastVariants;
  message?: string;
  onHover?: () => void;
  onExit?: () => void;
  closeHandler?: () => void;
}
const Toast = ({message, variant, className, closeHandler, onHover, onExit}:ToastProps) => { 
  if (typeof message !== "string") return null; 
  return (
      <div className={className} onMouseEnter={onHover} onMouseLeave={onExit}>
        <div className={style.toastContent}>
          <button type="button" onClick={closeHandler}>
            <span className="c-pointer">X</span>
          </button>
          <div>
            <h2 className="pad-1">{message}</h2>
          </div>
        </div>
      </div>
  );
};
export default Toast;
