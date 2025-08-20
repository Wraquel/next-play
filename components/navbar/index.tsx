import { ReactNode } from "react";
import style from "./style/navbar.module.scss";
import { Routes } from "@/utils/routes/index";
import { useRouter } from "next/router";

type NavProps = {
  children: ReactNode;
};
const Navbar = ({ children }: NavProps) => {
  const router = useRouter();
  return (
    <nav className={style.navbar}>
      <div className="container">
        <div className="columns">
          <div className="col-2">
            <span
              className="c-pointer"
              onClick={() => router.push(Routes.HOME)}
            >
              <h1>🔮Icon</h1>
            </span>
          </div>
          <div className="col-10">
            <div className={style.btns}>{children}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
