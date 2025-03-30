import React from "react";
import { Link } from "react-router-dom";

type TableCellProps = {
  text: string;
  _id?: string;
};

const TableCell: React.FC<TableCellProps> = ({ text, _id }) => {
  console.log(_id);
  return _id ? (
    <Link to={`/users/${_id}`}>
      <h2 className="subtitle">{text}</h2>
    </Link>
  ) : (
    <h2 className="subtitle">{text}</h2>
  );
};

export default TableCell;
