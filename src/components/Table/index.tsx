import React from "react";
import TableRow from "../TableRow";

type User = {
  id: string;
  latitude: string;
  longitude: string;
  zipCode: number;
  name: string;
};

type TableProps = {
  users: User[];
};
const Table: React.FC<TableProps> = ({ users }) => {
  console.log(users);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <abbr title="Name">Name</abbr>
          </th>
          <th>
            <abbr title="ZipCode">Zip Code</abbr>
          </th>
          <th>
            <abbr title="Latitude">Latitude</abbr>
          </th>
          <th>
            <abbr title="Longitude">Longitude</abbr>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User) => (
          <TableRow {...user} key={user.id} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
