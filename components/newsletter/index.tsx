import React, { memo  } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Input from "@/components/input";
import { UserType } from "@/utils/user";
import Icons from "../icon";

type NewsletterProps = {
  value?: boolean;
  showNotification?: boolean;
  id: string;
};

export const Newsletter = memo(({value, showNotification, id}: NewsletterProps) => {
  const {register } = useFormContext<UserType>(); 
  const newsletter = useWatch({
    name:"newsletter", 
    defaultValue:value ? value: false
  });
  const {xMark, checkMark} = Icons;
  return (
    <>
      <div className="d-flex al-it-center just-cont-space-between">
        <Input id={id} checked={value} type="checkbox" label="receive newsletter" {...register("newsletter")} />
      </div>
      {
        !showNotification && (
          <div className="d-flex direction-col al-it-center">
            <div className="pad-top-1 pad-bottom-1 d-flex al-it-center gap-1">
              <h3>receive newsletter</h3>
              {newsletter ? (
                <span>{checkMark}</span>
              ) : (
                <span>{xMark}</span>
              )}
            </div>
          </div>
        ) 
      }
    </>
  );
});
Newsletter.displayName = "Newsletter"; 