import React from "react";

//Styles
import "./style.scss";

//Assets

const TableRow = ({
  index,
  // employee,
  // jobNumber,
  // administration,
  attendance,
  // time,
}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>momen</td>
      <td>532121</td>
      <td>515562</td>
      <td className="attendance">{attendance}</td>
      {/* <td>
        {new Intl.DateTimeFormat("ar-EG", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(Date.parse(time))}
      </td> */}
    </tr>
  );
};

export default TableRow;
