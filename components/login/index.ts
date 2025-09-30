import { useEffect , ReactNode} from "react";
import { getUser } from "@/storage/slices/userSlice";
import { useSession, signIn } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/storage/hooks";

const GlobalLoginProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const currentUser = useAppSelector((state) => state.user.user);
  //to do if not find this Id make the first index user
  const userId = "4019";

  useEffect(() => {
    if (!currentUser) {
      dispatch(getUser(userId))
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (!session && currentUser) {
      signIn("credentials", { name: currentUser.name, redirect: false });
    }
  }, [session, currentUser]);

  return children;
}
export default GlobalLoginProvider;