import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ar";
//Styles
import "./style.scss";

//Assets

const TableRow = ({ index, employee, type, day, createTime }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{employee.name}</td>
      <td>{employee.employeeId}</td>
      <td>{employee.department}</td>
      <td
        className={`attendance  ${
          type == "attending" ? "purpleBg" : "blackBg"
        }`}
      >
        <span>
          {type == "attending" ? "حضور" : type == "leaving" ? "انصراف" : ""}
        </span>
      </td>
      <td>{dayjs(createTime).locale("ar").format("LLLL")}</td>
    </tr>
  );
};

export default TableRow;
