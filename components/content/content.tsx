import { ReactElement } from "react";

type HeaderProps={
  text?:string
}
const Content = ({header, body}:{header:HeaderProps, body:ReactElement}) => {
  return(
    <section>
      <div>
        <h1>{header.text}</h1>
      </div>
      <div>
        <h3>{body}</h3>
      </div>
    </section>
  )
}

export default Content;