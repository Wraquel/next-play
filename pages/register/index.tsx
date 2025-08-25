import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/storage/hooks";
import { setUser } from "@/storage/slices/userSlice";
import Content from "../../components/content/content";
import Button from "@/components/button";
import Input from "@/components/input/input";

type UserInputs = {
  name: string,
  email:string,
  newsletter: boolean,
}
const Register = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user)
  const {register, handleSubmit, watch, reset, formState: { errors }}= useForm<UserInputs>()
  const onSubmit: SubmitHandler<UserInputs> = (data)=> {
    dispatch(setUser(data))
  }
  const newsletter  = watch("newsletter");
  return (
    <Content
      header={{ text: "register", icon: "🗃️" }}
      body={
        <div className="d-flex direction-col">
          {!user
            ? <form onSubmit={handleSubmit(onSubmit)}>
              <Input type="text" label="name" {...register("name", {required: "field required"})} error = {errors.name?.message} />
              <Input type="text" label="email" {...register("email", {required: "field required"})} error = {errors.email?.message} />
              <div className="d-flex al-it-center just-cont-space-between">
              <Input
                type="checkbox"
                label="newsletter"
                {...register("newsletter")}
                />
              <div className="d-flex direction-col al-it-start">
                <div style={{ padding: "1rem" }}>
                  <Button type="submit" label="reset" onClick={()=> reset()}/>
                </div>
                </div>
              </div>
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
            : <div className="container">
                <span className="d-flex direction-col al-it-center">
                  user successfully registered
                </span>
              </div>}
              
          <div style={{ paddingTop: "1rem", alignSelf: "end" }}>
            <Button type="button" disabled={!user} label="get data user" onClick={()=> console.log( "User______", user)}/>
          </div>
        </div>
      }
    />
  );
};

export default Register;
