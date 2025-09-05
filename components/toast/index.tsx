// import style from "../toasts/style/toasts.module.scss"

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
        <div className="d-flex direction-col al-it-end">
          <button type="button" className="c-pointer" onClick={closeHandler}>
            <span className="c-pointer">✕</span>
          </button>
        </div>
        <h2 className="pad-1">{message}</h2>
      </div>
  );
};
export default Toast;
