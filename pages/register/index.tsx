import React from "react";
import { useAppSelector } from "@/storage/hooks";
import Content from "../../components/content/content";
import Loading from "@/components/loader";
import RegisterForm from "@/components/register";
import Icons from "@/components/icon"

const Register = () => {
  const data = useAppSelector((state) => state.users);  
  const loading = data.loading;
  const {userPlus} = Icons;

  return (
    <Content
      header={{ text: "register", icon: userPlus }}
      body={
        <div className="d-flex direction-col">
          {loading ? (
            <Loading />
          ) : (
            <div>
              <RegisterForm />
            </div>
          )}
          <hr />
        </div>
      }
    />
  );
};

export default Register;
