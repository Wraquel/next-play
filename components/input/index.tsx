import { forwardRef,memo } from "react";
import style from "./style/inputtext.module.scss";

type InputProps = {
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, error, placeholder, value, defaultValue, checked, name, id,...props }, ref) => {
    switch (type) {
      case "checkbox":
        return (
          <div className="d-flex">
            <label htmlFor={id} className={style.containerCheckbox}>
              <input ref={ref} id={id} name={name} defaultChecked={checked} type="checkbox" {...props} />
              <span className={style.checkmark}></span>
            </label>
            <span className="pad-l-2">{label}</span>
          </div>
        );
      case "search":
        return (
          <div className={style.input} >
            <input
              id={id} name={name} ref={ref}
              className={style.search}
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
            <label htmlFor={id}>{label}</label>
            <input id={id} name={name} ref={ref} placeholder={placeholder} type={type} {...props} defaultValue={defaultValue} />
            {error && (
              <span>
                <small style={{ color: "red" }}>{error}</small>
              </span>
            )}
          </div>
        );
      default:
        return (
          <input id={id} name={name} ref={ref} placeholder={placeholder} type={type} {...props} />
        );
    }
  }
);

Input.displayName = "Input";
export default memo(Input);
