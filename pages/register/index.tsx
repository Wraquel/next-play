import React, { memo, useCallback  } from "react";
import { SubmitHandler, useForm, FormProvider, useFormContext, useWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/storage/hooks";
import {
  addUser,
  setUser
} from "@/storage/slices/userSlice";
import Content from "../../components/content/content";
import Button from "@/components/button";
import Input from "@/components/input/input";
import Loading from "@/components/loader";
import { UserType } from "@/utils/user";

export const Newsletter = memo(() => {
  const {register } = useFormContext<UserType>(); 
  const newsletter = useWatch({
    name:"newsletter",
    defaultValue:false});
  return (
    <>
      <div className="d-flex al-it-center just-cont-space-between">
        <Input type="checkbox" label="newsletter" {...register("newsletter")} />
      </div>
      <div className="d-flex direction-col al-it-center">
        <h3 className="pad-top-1 pad-bottom-1">
          {newsletter ? "receive newsletter ✅" : "receive newsletter ❌"}
        </h3>
      </div>
    </>
  );
});
Newsletter.displayName = "Newsletter"; 

const Form = () => {
  const dispatch = useAppDispatch();
  const form = useForm<UserType>();
  
  const onSubmit: SubmitHandler<UserType> = (data) => {
    console.log(data,"PAYLOAD")
    dispatch(addUser(data));
    dispatch(setUser(data));
  };
 
  // TO DO...EVERYTIME I start writing or full erase the input, the component re renders
  return (
    <FormProvider {...form}> 
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="name"
          {...form.register("name", { required: "field required" })}
          error={form.formState.errors.name?.message}
        />
        <Input
          type="text"
          label="email"
          {...form.register("email", {
            required: "field required",
            // pattern: {
            //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            //   message: "invalid email address",
            // },
          })}
          error={form.formState.errors.email?.message}
        />
        <Newsletter />
        <div className="d-flex direction-col al-it-center">
          <div className=" d-flex direction-col pad-1">
            <Button type="submit" label="save" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

const Register = () => {
  const data = useAppSelector((state) => state.users);  
  const newUser = data.newUser;
  const loading = data.loading;

  
  const handleClick = useCallback(()=> console.log("User______", newUser),[newUser])

  return (
    <Content
      header={{ text: "register", icon: "🗃️" }}
      body={
        <div className="d-flex direction-col">
          {loading ? (
            <Loading />
          ) : (
            <div>
              <Form />
            </div>
            // display if the response ok from BE 
            // <div className="container">
            //   <span className="d-flex direction-col al-it-center">
            //     user successfully registered
            //   </span>
            // </div>
          )}
          <hr />
          <div className="d-flex direction-col al-it-end pad-top-1">
            <Button
              type="button"
              disabled={!newUser}
              label="get newUser"
              onClick={handleClick}
            />
          </div>
        </div>
      }
    />
  );
};

export default Register;
