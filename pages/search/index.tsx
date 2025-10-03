import Content from "@/components/content/content";
import Loading from "@/components/loader";
import Table from "@/components/table";
import { useAppSelector, useAppDispatch } from "@/storage/hooks";
import { getUsers } from "@/storage/slices/usersSlice";
import { useEffect } from "react";

const columns = [
  { key: "name", title: "Name" },
  { key: "email", title: "Email" },
  { key: "newsletter", title: "Newsletter" },
];
const Search = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.users);
  const users = Object.values(data.listUsers);
  const loading = data.loading;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Content
      header={{ text: "search", icon: "🎲" }}
      body={
        <>{loading ? <Loading /> : <Table filter columns={columns} rows={users} />}</>
      }
    />
  );
};

export default Search;
