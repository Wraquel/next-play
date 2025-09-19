import React from "react";
import { SubmitHandler, useForm, FormProvider} from "react-hook-form";
import { useAppDispatch } from "@/storage/hooks";
import {addUser} from "@/storage/slices/usersSlice";
import Button from "@/components/button";
import Input from "@/components/input/input";
import { UserType } from "@/utils/user";
import { Newsletter} from "@/components/newsletter";

const Form = () => {
  const dispatch = useAppDispatch();
  const form = useForm<UserType>();
  
  const onSubmit: SubmitHandler<UserType> = (data) => {
    dispatch(addUser(data));
  };
 
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
        <Newsletter/>
        <div className="d-flex direction-col al-it-center">
          <div className=" d-flex direction-col pad-1">
            <Button type="submit" label="save" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
export default Form;