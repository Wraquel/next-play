import { useRouter } from "next/router";
import { ReactElement, useRef } from "react";
import { Routes } from "@/utils/routes/index";
import Navbar from "../navbar";
import Button from "../button";
import Main from "../main";
import Toast from "../../pages/template/toasts";
import Modal from "../../components/modal";

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openModal = () => {
    dialogRef.current?.showModal();
  };
  const closeModal = () => {
    dialogRef.current?.close();
  };
  const buttons = [{ name: "register" }, { name: "search" }, { name: "other" }];

  function handleButton(item: { name: string }) {
    if (item.name === "register") {
      router.push(Routes.REGISTER);
    } else if (item.name === "search") {
      router.push(Routes.SEARCH);
    } else if (item.name === "other") {
      router.push(Routes.OTHER);
    }
  }

  const buttonsToShow = buttons.map((item) => {
    return (
      <div key={item.name}>
        <Button onClick={() => handleButton(item)}>{item.name}</Button>
      </div>
    );
  });
  return (
    <>
      <Navbar onClickProfile ={openModal}>{buttonsToShow}</Navbar>
      <Main>{children}</Main>
      <Toast />
      <Modal ref={dialogRef}
      header={{ text: "Profile" }} 
      body={<>Profile Modal Content</>}
      onCloseProfile ={closeModal} />
    </>
  );
};
export default Layout;
