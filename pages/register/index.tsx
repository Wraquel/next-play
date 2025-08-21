import Content from "../../components/content/content";
import Button from "@/components/button";
import InputBoolean from "@/components/input/inputboolean/inputboolean";
import InputText from "@/components/input/inputtext";
// import Form from "../../components/form/form";

const Register = () => {
  return (
    <Content header={{ text: "register", icon: "🗃️" }} 
    body={
        // {/* <div>
        //   Loading
        // </div> */}
      <div className="d-flex direction-col">
        <form>
          {/* <div className="d-flex direction-col">
            <label>Name</label>
            <input type="text"/>
          </div> */}
          <InputText label="name"/>
          <InputText label="email"/>
          {/* <div className="d-flex direction-col">
          <label>Email</label>
          <input type="text"/>
          </div> */}
          <InputBoolean label="newsletter"/>
          {/* <div className="d-flex">
          <input type="checkbox"/>
          <label>Newsletter</label>
          </div> */}
          <div className="d-flex direction-col al-it-center ">
            <h3 style={{padding:"1rem 0"}}>you will receive</h3>
            <div style={{padding:"1rem"}}>
              <Button label='save'/>
            </div>
          </div>
          <hr />
        </form>
        <div style={{paddingTop:"1rem", alignSelf:"end"}}>
          <Button label='get values'/>
        </div>
    </div>
    } />
  );
};

export default Register;
