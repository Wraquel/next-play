import { forwardRef } from "react";
import style from "./style/inputtext.module.scss";

type InputProps = {
  label?: string;
  type?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, error, ...props }, ref) => {
    if (type === "checkbox") {
      return (
        <div className="d-flex">
          <input ref={ref} type="checkbox" className="c-pointer" {...props} />
          <label style={{ paddingLeft: ".5rem" }}>{label}</label>
        </div>
      );
    }
    return (
      <div className={style.input}>
        <label>{label}</label>
        <input ref={ref} type={type} {...props} />
        {error && (
          <span>
            <small style={{ color: "red" }}>{error}</small>
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
