import Content from "@/components/content/content";
import Loading from "@/components/loader";
import Table from "@/components/table";
import { useAppSelector, useAppDispatch } from "@/storage/hooks";
import { getUsers } from "@/storage/slices/userSlice";
import { useEffect } from "react";

type Column = {
  id: number;
  title: string;
};

const columns: Column[] = [
  { id: 1, title: "Name" },
  { id: 2, title: "Email" },
  { id: 3, title: "Newsletter" },
];
const Search = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.users);
  const users = data.listUsers;
  const loading = data.loading;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Content
      header={{ text: "search", icon: "🎲" }}
      body={
        <>{loading ? <Loading /> : <Table columns={columns} rows={users} />}</>
      }
    />
  );
};

export default Search;
