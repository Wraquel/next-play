import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Routes } from "@/utils/routes/index";
import Navbar from "../navbar";
import Button from "../button";
import Main from "../main";
import Toast from "../toasts";

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

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
      <Navbar>{buttonsToShow}</Navbar>
      <Main>{children}</Main>
      <Toast />
    </>
  );
};
export default Layout;
