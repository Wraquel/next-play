import React, { memo  } from "react";
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


const testeStyle = { paddingTop: "1rem", alignSelf: "end" };

export const Newsletter = memo(() => {
  const { control, register } = useFormContext<UserType>(); //analyze a better or easier solution
  const newsletter = useWatch({
    control,
    name:"newsletter",
    defaultValue:false});
  return (
    <>
      <div className="d-flex al-it-center just-cont-space-between">
        <Input type="checkbox" label="newsletter" {...register("newsletter")} />
      </div>
      <div className="d-flex direction-col al-it-center">
        <h3 style={{ padding: "1rem 0" }}>
          {newsletter ? "receive newsletter ✅" : "receive newsletter ❌"}
        </h3>
      </div>
    </>
  );
});
Newsletter.displayName = "Newsletter"; // why necessary?
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
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "invalid email address",
            },
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
  // const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.users);
  const usersList = data.listUsers;   // think better about it... newUser might be not needed
  const newUser = data.newUser;
  const loading = data.loading;
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<UserType>();

  // const onSubmit: SubmitHandler<UserType> = (data) => {
  //   dispatch(addUser(data));
  //   dispatch(setUser(data));
  // };

  function handleClick() {
    console.log("Users______", usersList); //call if its needed
  }

  return (
    <Content
      header={{ text: "register", icon: "🗃️" }}
      body={
        <div className="d-flex direction-col">
          {loading ? (
            <Loading />
          ) : (
            <div className="d-flex direction-col">
              <Form />
              <hr />
            </div>
            // display if the response ok from BE ____IT NEEDS TO BE OUTIDE THE LOADING PROBABLY
            // <div className="container">
            //   <span className="d-flex direction-col al-it-center">
            //     user successfully registered
            //   </span>
            // </div>
          )}
          <div style={testeStyle}>
            <Button
              type="button"
              disabled={!newUser}
              label="get list of users"
              onClick={handleClick}
            />
          </div>
        </div>
      }
    />
  );
};

export default Register;
