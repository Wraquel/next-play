import { useEffect , ReactNode} from "react";
import { getUsers } from "@/storage/slices/userSlice";
import { useSession, signIn } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/storage/hooks";

const GlobalLoginProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const users = useAppSelector((state) => state.users.listUsers);
  const user4019 = users["4019"];
  const usersArray = Object.values(users);

  useEffect(() => {
    if (!usersArray || usersArray.length === 0) {
      dispatch(getUsers());
    }
  }, [dispatch, usersArray]);

  useEffect(() => {
    if (!session && user4019) {
      signIn("credentials", { name: user4019.name, redirect: false });
    }
  }, [session, user4019]);

  return children;
}
export default GlobalLoginProvider;