import { memo } from "react";
import style from "./style/toast.module.scss"
import Icons from "../icon";

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
  const {xMark} = Icons;
  return (
      <div className={className} onMouseEnter={onHover} onMouseLeave={onExit}>
        <div className={style.toastContent}>

          <div className="">
            <h2 className="">{message}</h2>
          </div>
          <div className="s">
          <button type="button" onClick={closeHandler}>
            <span>{xMark}</span>
          </button>
          </div>
          
        </div>
      </div>
  );
};
export default memo(Toast);