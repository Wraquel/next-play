import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/storage/hooks";
import { addUser, setUser, getUsers } from "@/storage/slices/userSlice";
import Content from "../../components/content/content";
import Button from "@/components/button";
import Input from "@/components/input/input";
import Loading from "@/components/loader";

type UserInputs = {
  name: string;
  email: string;
  newsletter: boolean;
};
const Register = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.users);
  const usersList = data.listUsers;
  const newUser = data.newUser;
  const loading = data.loading;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserInputs>();

  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    dispatch(addUser(data));
    dispatch(setUser(data));
  };
  const newsletter = watch("newsletter");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <Content
      header={{ text: "register", icon: "🗃️" }}
      body={
        <div className="d-flex direction-col">
          {loading ? (
            <Loading/>
          ) : (
            <div className="d-flex direction-col">
              {!newUser ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    type="text"
                    placeholder="name..."
                    label="name"
                    {...register("name", { required: "field required" })}
                    error={errors.name?.message}
                  />
                  <Input
                    type="text"
                    placeholder="email..."
                    label="email"
                    {...register("email", { required: "field required" })}
                    error={errors.email?.message}
                  />
                  <div className="d-flex al-it-center just-cont-space-between">
                    <Input
                      type="checkbox"
                      label="newsletter"
                      {...register("newsletter")}
                    />
                  </div>
                  <div className="d-flex direction-col al-it-center">
                    <h3 style={{ padding: "1rem 0" }}>
                      {newsletter
                        ? "receive newsletter ✅"
                        : "receive newsletter ❌"}
                    </h3>
                    <div className=" d-flex direction-col pad-1">
                      <div style={{ marginBottom: "1rem" }}>
                        <Button
                          type="submit"
                          label="reset"
                          onClick={() => reset()}
                        />
                      </div>
                      <Button type="submit" label="save" />
                    </div>
                  </div>
                  <hr />
                </form>
              ) : (
                <div className="container">
                  <span className="d-flex direction-col al-it-center">
                    user successfully registered
                  </span>
                </div>
              )}
            </div>
          )}
          <div style={{ paddingTop: "1rem", alignSelf: "end" }}>
            <Button
              type="button"
              disabled={!newUser}
              label="get list of users"
              onClick={() => console.log("Users______", usersList)}
            />
          </div>
        </div>
      }
    />
  );
};

export default Register;
