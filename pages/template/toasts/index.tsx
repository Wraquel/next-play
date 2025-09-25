import {memo} from "react"
import { useAppSelector, useAppDispatch } from "@/storage/hooks";
import { closeToast, freezeToast, selectToastsArray} from "@/storage/slices/toastSlice";
import Toast  from "../../../components/toast";
import style from "./style/toasts.module.scss"

const Toasts= () => {

  const dispatch = useAppDispatch();
  const toasts = useAppSelector(selectToastsArray);
  if(!toasts?.length ) return null
  return (
   <div className={style.toasts}>
    {toasts.map(t => 
    <Toast key={t.id} 
      message={t.message} 
      variant={t.variant} 
      className={`${style.toast} ${t.variant ? style[t.variant] : ''} ${style.exit}`}
      onHover={t.autoClose ? () => dispatch(freezeToast({freeze:true,id:t.id!})) : undefined}
      onExit={t.autoClose ? () => dispatch(freezeToast({freeze:false,id:t.id!})) : undefined}
      closeHandler={() => dispatch(closeToast(t.id))}/>
      )}
   </div>
  );
};
export default memo(Toasts);
