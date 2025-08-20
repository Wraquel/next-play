import { ReactNode } from "react";
import style from './style/button.module.scss'

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
};
const Button = ({ children, onClick }: ButtonProps) => {
  return <button className={style.button} onClick={onClick}>{children}</button>;
};

export default Button;
