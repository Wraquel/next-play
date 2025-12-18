import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Routes } from "@/utils/routes/index";
import Navbar from "../navbar";
import Button from "../button";
import Main from "../main";
import Toast from "../../pages/template/toasts";
import { generateElementId } from "@/utils/generateId";
import Icons from "../icon";

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const buttons = [{ name: "home" },{ name: "register" }, { name: "search" }, { name: "more" }];
  const {home} = Icons
  function handleButton(item: { name: string }) {
    if (item.name === "register") {
      router.push(Routes.REGISTER);
    } else if (item.name === "search") {
      router.push(Routes.SEARCH);
    } else if (item.name === "more") {
      router.push(Routes.MORE);
    }
  }

  const buttonsToShow = buttons.map((item) => {
    const buttonProps = {
      id: generateElementId("navbar", "button", item.name),
      onClick: () => handleButton(item),
      ...(item.name === "home" && { href: Routes.HOME})
    };
    
    return (
      <div key={item.name}>
        {item.name === "home" ? (
          <Button {...buttonProps}>{home}</Button>
        ):(
        <Button {...buttonProps}>{item.name}</Button>
        )}
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
