import { memo, useCallback, useMemo } from "react";
import Button from '@/components/button';
import Input from '@/components/input';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { UserType } from '@/utils/user';
import { Newsletter } from '@/components/newsletter';
import { updateProfile } from '@/storage/slices/userSlice';
import { useAppDispatch,useAppSelector } from "@/storage/hooks";
import style from "../../../pages/template/modals/profile/style/profile.module.scss";
import { generateElementId } from '@/utils/generateId';

type ProfileModalProps = {
  onCloseProfile: () => void;
  handleEdit: React.Dispatch<React.SetStateAction<boolean>>;
};
const EditView = ({ onCloseProfile, handleEdit }: ProfileModalProps) => {
  const form = useForm<UserType>();
  const dispatch = useAppDispatch();
   const data = useAppSelector((state) => state.user);
  const user = data.user;
  const loading = data.loading;
  
  const handleCancel = useCallback(() => {
    handleEdit(false);
    form.reset(); 
  }, [form, handleEdit]);

  const onSubmit = useCallback<SubmitHandler<UserType>>((data) => {
    if (!user?.id) return
    dispatch(updateProfile({ ...user, ...data, id: user?.id}));
  }, [dispatch, user]);

  const handleSaveAndClose = useCallback(() => {
    form.handleSubmit((data: UserType) => {
      onSubmit(data);
      onCloseProfile();
      handleEdit(false);
    })();
  }, [onCloseProfile, handleEdit, onSubmit, form]);

  const formContent = useMemo(() => {
    return (
      <div className={style.data}>
        <div className={style.email}>
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
        <Newsletter id={generateElementId("profile", "checkbox", "newsletter")} showNotification />
      </div>
    )
  }, [user?.email, form]);

  const buttonsFooter = useMemo(() => {
    return (
      <div className={style.profileFooter}>
        <Button id={generateElementId("profile", "button", "cancel")} disabled={loading} label="cancel" onClick={handleCancel} />
        <Button id={generateElementId("profile", "button", "save")} disabled={loading} label="save" type="submit"/>
        <Button id={generateElementId("profile", "button", "saveAndClose")} disabled={loading} label="save & close" type="submit" onClick={handleSaveAndClose} />
      </div>
    )
  }, [handleCancel, handleSaveAndClose,loading]);
  return (
    <div className={style.profile}>
      <FormProvider {...form}>
        <form className={style.form} onSubmit={form.handleSubmit(onSubmit)}>
         {formContent}
         {buttonsFooter}
        </form> 
      </FormProvider>
    </div>
  );
};
export default memo(EditView)
