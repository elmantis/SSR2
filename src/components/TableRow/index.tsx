import React from "react";
import TableCell from "../TableCell";

type TableRowProps = {
  id: string;
  latitude: string;
  longitude: string;
  zipCode: number;
  name: string;
};

const TableRow: React.FC<TableRowProps> = ({
  id,
  latitude,
  longitude,
  name,
  zipCode,
}) => {
  return (
    <tr>
      <td>
        <TableCell text={name} _id={id} />
      </td>
      <td>
        <TableCell text={zipCode.toString()} />
      </td>
      <td>
        <TableCell text={latitude} />
      </td>
      <td>
        <TableCell text={longitude} />
      </td>
    </tr>
  );
};

export default TableRow;
