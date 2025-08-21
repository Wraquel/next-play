import style from "./style/inputtext.module.scss"
type InputProps = {
  label?:string
}

const InputText=({...props}:InputProps)=>{
  return(
    <div className={style.input}>
      <label>{props.label}</label>
      <input type="text"/>
    </div>

  )
}
export default InputText