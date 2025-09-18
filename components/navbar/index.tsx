import { ReactNode } from "react";
import style from "./style/navbar.module.scss";
import { Routes } from "@/utils/routes/index";
import { useRouter } from "next/router";
import { useSession  } from "next-auth/react";

type NavProps = {
  children: ReactNode;
  onClickProfile: () => void;
};
const Navbar = ({ children, onClickProfile }: NavProps) => {
  const router = useRouter();
  const { data: session } = useSession();
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
          <div className="col-8">
            <div className={style.btns}>{children}</div>
          </div>
          <div className="col-2 c-pointer" onClick={onClickProfile}>
            <div className={style.profile}>
                <h3>{session?.user?.name}</h3>
                <span>👩🏻‍🦱</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
