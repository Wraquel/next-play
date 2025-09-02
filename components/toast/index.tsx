import { useAppDispatch, useAppSelector } from "@/storage/hooks";
import style from "./style/toast.module.scss"
import { memo} from "react"

export type ToastVariants = "brand" | "error" | "success" | "warning";
export interface ToastProps {
  className?: string;
  variant?: ToastVariants;
  message?: string;
  onHover?: () => void;
  onExit?: () => void;
  closeHandler?: () => void;
}
//if toasts not null or 0 return, else return null
const Toast= () => {
  // const dispatch =useAppDispatch();
  const toasts = useAppSelector((state) => Object.values(state.toasts));
  if(!toasts?.length ) return null
  return (
   <div className={style.toasts}>
    {toasts.map(t => (
      <div key={t.id} className={style.toast}>
        <h2>{t.message}</h2>
      </div>
    ))}
   </div>
  );
};
export default memo(Toast);
