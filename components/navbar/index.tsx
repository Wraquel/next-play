import { ReactNode } from "react";
import style from "./style/navbar.module.scss";
import { useSession  } from "next-auth/react";
import { useModal } from "../modal/modelContext";
import Icons from "../icon";
type NavProps = {
  children: ReactNode;
  onClickProfile?: () => void;
};
const Navbar = ({ children }: NavProps) => {
  const { openModal } = useModal();
  const { data: session } = useSession();
  const {userCircle} = Icons;
  return (
    <nav className={style.navbar}>
      <div className="container">
        <div className="columns">
          <div className="col-10">
            <div className={style.buttons}>{children}</div>
          </div>
          {session?.user && (
            <div className={`col-2 ${style.profileButton}`}>
              <button onClick={() => openModal("profile")}>
                {userCircle}
                <h4>{session?.user?.name}</h4>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
