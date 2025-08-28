import { UserType } from "@/utils/user";
import Input from "../input/input";
import { useState } from "react";
import style from "./style/table.module.scss";

type Column = {
  id: number;
  title: string;
};

type TableProps = {
  columns: Column[];
  rows: UserType[];
};

const Table = ({ columns, rows }: TableProps) => {
  const [queryName, setQueryName] = useState("");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQueryName(e.target.value);
  }

  const filteredUsers = rows.filter((row) =>
    [row.name].some((f) =>
      f.toLocaleLowerCase().includes(queryName.toLocaleLowerCase())
    )
  );

  return (
    <div className="d-flex direction-col">
      {rows.length & filteredUsers.length  ? (
        <table className={style.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.id}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td style={{ textTransform: "none" }}>{user.email}</td>
              <td style={{ borderRight: "none" }}>
                {user.newsletter ? "✅" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ):(
        <div className="container"><h3>No users found 🤨</h3></div>
      )}
     {rows.length !=0 && (
      <div className="d-flex direction-col al-it-center">
        <Input
          type="search"
          placeholder="search name"
          value={queryName}
          onChange={handleSearch}
        />
      </div>
     )} 
    </div>
  );
};

export default Table;
