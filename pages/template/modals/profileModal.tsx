import Modal from '../../../components/modal';
import { RefObject, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Button from '@/components/button';
import Input from '@/components/input/input';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { UserType } from '@/utils/user';
import { Newsletter } from '@/components/newsletter';
import { updateProfile, getUser } from '@/storage/slices/userSlice';
import { useAppDispatch,useAppSelector } from "@/storage/hooks";
import Loading from '@/components/loader';
import style from "./style/profile.module.scss";

type ProfileModalProps = {
  onCloseProfile: () => void;
  dialogRef: RefObject<HTMLDialogElement | null>;
};
const ProfileModal = ({ onCloseProfile, dialogRef }: ProfileModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const form = useForm<UserType>();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.users);
  const user = data.user;
  const loading = data.loading;

  useEffect(()=>{
    if(session?.user?.id){
      dispatch(getUser(session?.user?.id));
    }
  },[session, dispatch])
  
  function handleCancel() {
    onCloseProfile();
    setIsEditing(false);
  }
  const onSubmit: SubmitHandler<UserType> = (data) => {
    dispatch(updateProfile({ ...user, ...data, id: user?.id }));
    setIsEditing(false);
  };
  return (
    <Modal ref={dialogRef}
      header={{ text: 'profile' }}
      body={
        <div className="container">
          <div className={style.profile}>
            <div className="pad-top-1" >
              <h1>{session?.user?.name}</h1>
              <div className={style.userId}>
                <span>User ID: </span>
                <span>{session?.user?.id}</span>
              </div>
            </div>
            <hr />
          {loading ? (<Loading/>):
          (<> 
            {isEditing ? (
              <FormProvider {...form}>
                <form className={style.form}>
                  <div className={style.email} >
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
                    defaultValue={user?.email}
                    error={form.formState.errors.email?.message}
                    />
                    </div>
                  <Newsletter value={user?.newsletter} showNotification />
              </form> 
                </FormProvider>
            ) : (
              <div className={style.data}>
                <div className="pad-top-1">
                  <label htmlFor="email">Email: </label>
                  <span>{user?.email}</span>
                </div>
                <div className="pad-top-1">
                  <label htmlFor="newsletter">Newsletter: </label>
                  <span>{user?.newsletter ? 'Subscribed' : 'Not Subscribed'}</span>
                </div>
              </div>
            )} </>
          )}
          </div>
        </div>
      }
      footer={
        <>
          <Button disabled={isEditing} label="go back" onClick={handleCancel} />
          {!isEditing && <Button label="edit" onClick={() => setIsEditing(true)} />}
          {isEditing && 
          <>
            <Button label="cancel" onClick={() => setIsEditing(false)} />
            <Button label="save" type="submit" onClick={form.handleSubmit(onSubmit)} />
          </>}
        </>
      }
      onCloseProfile={onCloseProfile}
    />
  );
};
export default ProfileModal;