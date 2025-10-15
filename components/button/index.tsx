import { forwardRef, ReactNode,memo } from "react";
import style from "./style/button.module.scss";
import Link from "next/link";

type ButtonProps = {
  children?: ReactNode;
  id?: string;
  label?: string;
  type?: string;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, children, label, id, href,...props }, ref) => {
    if(href) {
      return(
        <Link href={href} id={id} type="link" className="c-pointer d-flex just-cont-center">
          {children}
        </Link>
      )
    }
    return (
      <button ref={ref} id={id} type={type || "button"} className={style.button} {...props}>
        {label ? label : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default memo(Button);