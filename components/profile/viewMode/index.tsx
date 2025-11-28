import { memo } from "react";
import Button from '@/components/button';
import { useAppSelector } from "@/storage/hooks";
import style from "../../../pages/template/modals/profile/style/profile.module.scss";
import { generateElementId } from '@/utils/generateId';

type ProfileModalProps = {
  onCloseProfile: () => void;
  handleEdit: React.Dispatch<React.SetStateAction<boolean>>;
};
const ViewMode = ({ onCloseProfile, handleEdit }: ProfileModalProps) => {
  const data = useAppSelector((state) => state.user);
  const user = data.user;

   function handleClose() {
    onCloseProfile();
    handleEdit(false);
  }
  return (
    <>
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
      <div className={style.profileFooter}>
        <Button id={generateElementId("profile", "button", "close")} label="close" onClick={handleClose} />
        <Button id={generateElementId("profile", "button", "edit")} label="edit" onClick={() => handleEdit(true)} />
      </div>
    </>
  );
};
export default memo(ViewMode)