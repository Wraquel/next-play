import { ReactNode } from "react";
import Link from "next/link";
import style from "./style/navbar.module.scss";
import { Routes } from "@/utils/routes/index";
import { useSession  } from "next-auth/react";
import { useModal } from "../modal/modelContext";

type NavProps = {
  children: ReactNode;
  onClickProfile?: () => void;
};
const Navbar = ({ children }: NavProps) => {
  const { openModal } = useModal();
  const { data: session } = useSession();
  return (
    <nav className={style.navbar}>
      <div className="container">
        <div className="columns">
          <div className="col-2">
            <Link href={Routes.HOME} className="c-pointer">
              <h1>🔮Icon</h1>
            </Link>
          </div>
          <div className="col-8">
            <div className={style.buttons}>{children}</div>
          </div>
          {session?.user && (
            <div className="col-2 d-flex just-cont-end">
              <button className={style.profileButton} onClick={() => openModal("profile")}>
                <h3>{session?.user?.name}</h3> 
                <span>👩🏻‍🦱</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
