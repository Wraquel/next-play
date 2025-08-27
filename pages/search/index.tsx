import Content from "@/components/content/content";
import Table from "@/components/table";
import { useAppSelector,useAppDispatch } from "@/storage/hooks";
import { getUsers } from "@/storage/slices/userSlice";
import { useEffect } from "react";

type Column = {
    id: number;
    title: string;
}

const columns: Column[] = [
  {id:1, title: 'Name'},
  {id:2, title: 'Email'},
  {id:3, title: 'Newsletter'},
]
const Search = () => {
  const dispatch = useAppDispatch();
  const rows = useAppSelector(state => state.users.listUsers)
  useEffect(()=>{
    dispatch(getUsers())
  }, [dispatch])

  return <Content header={{ text: "search", icon: "🎲" }} 
    body={
      <Table columns={columns} rows={rows}/>
    } />;
};

export default Search;
