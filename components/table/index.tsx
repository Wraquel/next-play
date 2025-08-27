import { UserType } from "@/utils/user";
import Input from "../input/input";
import { useState } from "react";

  type Column = {
      id: number;
      title: string;
  }

type TableProps = {
  columns:Column[],
  rows:UserType[]
}

const Table = ({columns,rows}: TableProps) =>{
  const [queryName, setQueryName] = useState('')

  function handleSearch(e:React.ChangeEvent<HTMLInputElement>){
   setQueryName(e.target.value)
  }
  
  const filteredUsers = rows.filter(row => 
    [row.name, row.email].some((f) => 
      f.toLocaleLowerCase().includes(queryName.toLocaleLowerCase())
      ))

  return(
    <div className="d-flex direction-col">
      <table  style={{border:" solid black"}}>
        <thead style={{backgroundColor:"black"}}>
          <tr>
            {columns.map((col) =>
            <th key={col.id}>{col.title}</th>
            )}
          </tr>
      </thead>
      <tbody>
          {filteredUsers.map((user) =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.newsletter ? '✅' : '❌'}</td>
            </tr>
          )}
      </tbody>
      </table>
      <div className="d-flex direction-col al-it-center">
        <input type="search"value={queryName} onChange={handleSearch}/>
      </div>
    </div>
  )
}

export default Table