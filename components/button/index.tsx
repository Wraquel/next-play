import { forwardRef, ReactNode,memo } from "react";
import style from "./style/button.module.scss";

type ButtonProps = {
  children?: ReactNode;
  id?: string;
  label?: string;
  type?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, children, label, id, ...props }, ref) => {
    return (
      <button ref={ref} id={id} type={type || "button"} className={style.button} {...props}>
        {label ? label : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default memo(Button);