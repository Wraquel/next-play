import Modal from '../../../../components/modal';
import { RefObject, memo } from "react";
import { useSession } from 'next-auth/react';
import style from "./style/more.module.scss";
import Icons from '@/components/icon';
import { generateElementId } from '@/utils/generateId';
import Button from '@/components/button';
type MoreModalProps = {
  onCloseMore: () => void;
  dialogRef: RefObject<HTMLDialogElement | null>;
};
const MoreModal = ({ onCloseMore, dialogRef }: MoreModalProps) => {
  const { data: session } = useSession();
  const {edit} = Icons;
  return (
    <Modal ref={dialogRef}
      header={{ text: 'more', icon: edit }}
      body={
        <div className={style.more}>
          <div className={style.userInfo}>
            <h1>{session?.user?.name}</h1>
            <div className={style.userId}>
              <span>User ID: </span>
              <span>{session?.user?.id}</span>
            </div>
          </div>
          <hr />
        </div>
      }
      footer={
        <Button id={generateElementId("more", "button", "close")} label="close" type="submit" onClick={onCloseMore} />
      }
    />
  );
};
export default memo(MoreModal)