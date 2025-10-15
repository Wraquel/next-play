import { ReactElement } from "react";
import style from "./style/content.module.scss"

type HeaderProps={
  text?:string;
  icon?:string | ReactElement;
}
const Content = ({header, body}:{header:HeaderProps, body:ReactElement}) => {
  return (
    <div className={style.content}>
      <div className={style.header}>
        <h1>{header.text}</h1>
        <h1>{header.icon}</h1>
      </div>
      <div style={{padding:'0 2rem'}}>

      <hr />
      </div>
      <div className={style.body}>{body}</div>
    </div>
  )
}

export default Content;