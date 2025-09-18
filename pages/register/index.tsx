import React, {useCallback  } from "react";
import { useAppSelector } from "@/storage/hooks";
import Content from "../../components/content/content";
import Button from "@/components/button";
import Loading from "@/components/loader";
import Form from "@/components/form";

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
