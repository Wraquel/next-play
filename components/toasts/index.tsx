import {memo} from "react"
import { useAppSelector } from "@/storage/hooks";
import Toast  from "../toast";
import style from "./style/toasts.module.scss"

//if toasts not null or 0 return, else return null
const Toasts= () => {
  // const dispatch =useAppDispatch();
  const toasts = useAppSelector((state) => state.toasts.toasts);
  if(!toasts?.length ) return null
  return (
   <div className={style.toasts}>
    {toasts.map(t => 
    <Toast key={t.id} message={t.message} variant={t.variant} className={`${style.toast} ${t.variant ? style[t.variant] : ''}`}/>
    )}
   </div>
  );
};
export default memo(Toasts);
