import {memo} from "react"
import { useAppSelector, useAppDispatch } from "@/storage/hooks";
import { closeToast, freezeToast} from "@/storage/slices/toastSlice";
import Toast  from "../toast";
import style from "./style/toasts.module.scss"

//if toasts not null or 0 return, else return null
const Toasts= () => {
  // ONHOVER FREEZE TOAST WHEN AUTOCLOSE
  // WHEN NOT AUTOCLOSE SHOW EXIT BTN
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.toasts.toasts);
  if(!toasts?.length ) return null
  return (
   <div className={style.toasts}>
    {toasts.map(t => 
    <Toast key={t.id} 
      message={t.message} 
      variant={t.variant} 
      className={`${style.toast} ${t.variant ? style[t.variant] : ''}`}
      onHover={t.autoClose ? () => dispatch(freezeToast({freeze:true,id:t.id!})) : undefined}
      onExit={t.autoClose ? () => dispatch(freezeToast({freeze:false,id:t.id!})) : undefined}
      closeHandler={() => dispatch(closeToast(t.id))}/>
      )}
   </div>
  );
};
export default memo(Toasts);
