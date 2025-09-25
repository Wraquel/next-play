import { memo } from "react";
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
          <div className="col-11">
            <h2 className="">{message}</h2>
          </div>
          <div className="col-1">
          <button type="button" onClick={closeHandler}>
            <span className="c-pointer">X</span>
          </button>
          </div>
        </div>
      </div>
  );
};
export default memo(Toast);