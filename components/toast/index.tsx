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
//if toasts not null or 0 return, else return null
const Toast = ({message, variant, className}:ToastProps) => {
  //passar props
  return (
      <div className={className}>
        <h2>{message}</h2>
      </div>
  );
};
export default Toast;
