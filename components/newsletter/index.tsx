import React, { memo  } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Input from "@/components/input/input";
import { UserType } from "@/utils/user";

type NewsletterProps = {
  value?: boolean;
  showNotification?: boolean;
};
export const Newsletter = memo(({value, showNotification}: NewsletterProps) => {
  const {register } = useFormContext<UserType>(); 
  const newsletter = useWatch({
    name:"newsletter", 
    defaultValue:value ? value: false
  });
  return (
    <>
      <div className="d-flex al-it-center just-cont-space-between">
        <Input checked={value} type="checkbox" label="receive newsletter" {...register("newsletter")} />
      </div>
      {
        !showNotification && (
          <div className="d-flex direction-col al-it-center">
            <h3 className="pad-top-1 pad-bottom-1">
              {newsletter ? "receive newsletter ✅" : "receive newsletter ❌"}
            </h3>
          </div>
        ) 
      }
    </>
  );
});
Newsletter.displayName = "Newsletter"; 