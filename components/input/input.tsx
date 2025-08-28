import { forwardRef } from "react";
import style from "./style/inputtext.module.scss";

type InputProps = {
  label?: string;
  type?: string;
  error?: string;
  placeholder?: string;
  value?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, error, placeholder, value, onChange, ...props }, ref) => {
    switch (type) {
      case "checkbox":
        return (
          <div className="d-flex">
            <input ref={ref} type="checkbox" className="c-pointer" {...props} />
            <label style={{ paddingLeft: ".5rem" }}>{label}</label>
          </div>
        );
      case "search":
        return (
          <div className={style.input} style={{ alignSelf: "end" }}>
            <input
              ref={ref}
              style={{
                border: "none",
                alignSelf: "end",
              }}
              className={style.search}
              onChange={onChange}
              value={value}
              placeholder={placeholder}
              type={type}
              {...props}
            />
          </div>
        );
      case "text":
        return (
          <div className={style.input}>
            <label>{label}</label>
            <input ref={ref} placeholder={placeholder} type={type} {...props} />
            {error && (
              <span>
                <small style={{ color: "red" }}>{error}</small>
              </span>
            )}
          </div>
        );
      default:
        return (
          <input ref={ref} placeholder={placeholder} type={type} {...props} />
        );
    }
  }
);

Input.displayName = "Input";
export default Input;
