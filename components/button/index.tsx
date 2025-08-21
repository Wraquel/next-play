import { ReactNode } from "react";
import style from './style/button.module.scss'

type ButtonProps = {
  label?:string;
}
type ButtonTest = {
  children?: ReactNode;
  onClick?: () => void;
  label?:string
};
const Button = ({ children, onClick, label }: ButtonTest) => {
  return(
       <button className={style.button} onClick={onClick}>{label ? label : children}</button>
    )
};

export default Button;
