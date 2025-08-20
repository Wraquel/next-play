import { ReactNode } from "react";

type NavProps = {
  children: ReactNode;
};

const Navbar = ({ children }: NavProps) => {
  return (
    <nav>
      <ul>{children}</ul>
    </nav>
  );
};
export default Navbar;
