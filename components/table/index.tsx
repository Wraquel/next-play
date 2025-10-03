import { UserType } from "@/utils/user";
import Input from "../input";
import { useState } from "react";
import style from "./style/table.module.scss";

type Column = {
  key: string;
  title: string;
};

type TableProps = {
  columns: Column[];
  rows: UserType[];
  filter?:boolean;
};

const Table = ({ columns, rows, ...props }: TableProps) => {
  const [queryName, setQueryName] = useState("");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQueryName(e.target.value);
  }

  const filteredUsers = rows.filter((row) =>
    [row.name, row.email].some((f) =>
      f.toLocaleLowerCase().includes(queryName.toLocaleLowerCase())
    )
  );

  return (
    <div className="d-flex direction-col ">
      <table className={style.table}>
        <thead>
          <tr className="columns">
            {columns.map((col) => (
              <th className="col-4" key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr className="columns" key={user.id}>
              <td className="col-4" data-column="name">{user.name}</td>
              <td className="col-4" data-column="email">{user.email}</td>
              <td className="col-4" data-column="newsletter">
                {user.newsletter ? "✅" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(rows.length == 0 || filteredUsers.length == 0) && (
        <div className={style.noFound}>
          <h3>No users found 🤨</h3>
        </div>
      )}
      {(props.filter && rows.length != 0) && (
        <Input
          type="search"
          placeholder="search name"
          value={queryName}
          onChange={handleSearch}
        />
      )}
    </div>
  );
};

export default Table;
