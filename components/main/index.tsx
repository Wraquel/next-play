import { ReactNode } from "react";
import style from './style/main.module.scss'

type MainProps = {
  children?: ReactNode;
};
const Main = ({ children }: MainProps) => {
  return <main className={style.main}>{children}</main>;
};

export default Main;
