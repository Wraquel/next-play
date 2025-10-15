import Modal from '../../../components/modal';
import { RefObject, useState } from "react";
import { useSession } from 'next-auth/react';
import Button from '@/components/button';
import Input from '@/components/input';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { UserType } from '@/utils/user';
import { Newsletter } from '@/components/newsletter';
import { updateProfile } from '@/storage/slices/userSlice';
import { useAppDispatch,useAppSelector } from "@/storage/hooks";
import style from "./style/profile.module.scss";
import { generateElementId } from '@/utils/generateId';
import Icons from '@/components/icon';

type ProfileModalProps = {
  onCloseProfile: () => void;
  dialogRef: RefObject<HTMLDialogElement | null>;
};
const ProfileModal = ({ onCloseProfile, dialogRef }: ProfileModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const form = useForm<UserType>();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.user);
  const user = data.user;
  const loading = data.loading;
  const {edit} = Icons;

  function handleClose() {
    onCloseProfile();
    setIsEditing(false);
  }
  function handleCancel() {
    setIsEditing(false);
    form.reset(); 
  }
  function handleSaveAndClose(data: UserType, event?: React.BaseSyntheticEvent) {
    onSubmit(data, event);
    onCloseProfile();
    setIsEditing(false);
  }
  const onSubmit: SubmitHandler<UserType> = (data) => {
    if (!user?.id) return
    dispatch(updateProfile({ ...user, ...data, id: user?.id}));
  };
  return (
    <Modal ref={dialogRef}
      header={{ text: 'profile', icon: edit }}
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
                  <Newsletter id={generateElementId("profile", "checkbox", "newsletter")} value={user?.newsletter} showNotification />
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
            )}
          </div>
        </div>
      }
      footer={
        <>
          {!isEditing && 
          <>
            <Button id={generateElementId("profile", "button", "close")} label="close" onClick={handleClose} />
            <Button id={generateElementId("profile", "button", "edit")} label="edit" onClick={() => setIsEditing(true)} />
            </>}
          {isEditing && 
          <>
            <Button id={generateElementId("profile", "button", "cancel")} disabled={loading} label="cancel" onClick={handleCancel} />
            <Button id={generateElementId("profile", "button", "save")} disabled={loading} label="save" type="submit" onClick={form.handleSubmit(onSubmit)} />
            <Button id={generateElementId("profile", "button", "saveAndClose")} disabled={loading} label="save & close" type="submit" onClick={form.handleSubmit(handleSaveAndClose)} />
          </>}
        </>
      }
    />
  );
};
export default ProfileModal;