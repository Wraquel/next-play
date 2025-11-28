import Modal from '../../../../components/modal';
import { RefObject, useState, memo } from "react";
import { useSession } from 'next-auth/react';
import style from "./style/profile.module.scss";
import Icons from '@/components/icon';
import EditView from '@/components/profile/editView';
import ViewMode from '@/components/profile/viewMode';

type ProfileModalProps = {
  onCloseProfile: () => void;
  dialogRef: RefObject<HTMLDialogElement | null>;
};
const ProfileModal = ({ onCloseProfile, dialogRef }: ProfileModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const {edit} = Icons;
  return (
    <Modal ref={dialogRef}
      header={{ text: 'profile', icon: edit }}
      body={
          <div className={style.profile}>
            <div className={style.userInfo}>
              <h1>{session?.user?.name}</h1>
              <div className={style.userId}>
                <span>User ID: </span>
                <span>{session?.user?.id}</span>
              </div>
            </div>
            <hr />
            {isEditing ? (
              <EditView onCloseProfile={onCloseProfile} handleEdit={setIsEditing} />
            ) : (
              <ViewMode onCloseProfile={onCloseProfile} handleEdit={setIsEditing} />
            )}
          </div>
      }
    />
  );
};
export default memo(ProfileModal)