type InputProps = {
  label?:string
}

const InputBoolean=({...props}:InputProps)=>{
  return(
    <div className="d-flex">
      <input type="checkbox" className="c-pointer"/>
      <label style={{paddingLeft:'.5rem'}}>{props.label}</label>
    </div>

  )
}
export default InputBoolean