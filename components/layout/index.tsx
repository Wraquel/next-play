import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Routes } from "@/utils/routes/index";
import Navbar from "../navbar";
import Button from "../button";
import Main from "../main";

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const buttons = [
    { name: "home" },
    { name: "register" },
    { name: "search" },
    { name: "other" },
  ];

  function handleButton(item: { name: string }) {
    if (item.name === "register") {
      router.push(Routes.REGISTER);
    } else if (item.name === "search") {
      router.push(Routes.SEARCH);
    } else if (item.name === "other") {
      router.push(Routes.OTHER);
    } else if (item.name === "home") {
      router.push(Routes.HOME);
    }
  }

  const buttonsToShow = buttons.map((item) => {
    return (
      <li key={item.name}>
        <Button onClick={() => handleButton(item)}>{item.name}</Button>
      </li>
    );
  });
  return (
    <>
      <Navbar>{buttonsToShow}</Navbar>
      <Main>{children}</Main>
    </>
  );
};
export default Layout;
