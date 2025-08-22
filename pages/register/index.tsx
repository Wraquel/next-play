import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Content from "../../components/content/content";
import Button from "@/components/button";
import Input from "@/components/input/input";

type UserInputs = {
  name: string,
  email:string,
  newsletter: boolean,
}
const Register = () => {
  const {register, handleSubmit, watch, getValues, formState: { errors }}= useForm<UserInputs>({
    defaultValues:{
      newsletter: false
    }
  })
  const onSubmit: SubmitHandler<UserInputs>=(data)=> console.log(data)
  const newsletter  = watch("newsletter");

  return (
    <Content
      header={{ text: "register", icon: "🗃️" }}
      body={
        <div className="d-flex direction-col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" label="name" {...register("name", {required: "field required"})} error = {errors.name?.message} />
            <Input type="text" label="email" {...register("email", {required: "field required"})} error = {errors.email?.message} />
            
            <Input
              type="checkbox"
              label="newsletter"
              {...register("newsletter")}
            />
            <div className="d-flex direction-col al-it-center">
              <h3 style={{ padding: "1rem 0" }}>
                {newsletter
                  ? "receive newsletter ✅"
                  : "receive newsletter ❌"}
              </h3>
              <div style={{ padding: "1rem" }}>
                <Button type="submit" label="save" />
              </div>
            </div>
            <hr />
          </form>
          <div style={{ paddingTop: "1rem", alignSelf: "end" }}>
            <Button type="button" label="get values" onClick={()=> console.log(getValues())}/>
          </div>
        </div>
      }
    />
  );
};

export default Register;
