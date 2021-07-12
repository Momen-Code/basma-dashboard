import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

//Styles
import "./style.scss";

//Assets

const TableRow = ({
  index,
  // employee,
  // jobNumber,
  // administration,
  // attendance,
  // time,
  onEdit,
}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>momen</td>
      <td>532121</td>
      <td>515562</td>
      <td class="time">2:00 pm 8/7/2021</td>
      <td className="actions">
        <span className="edit" 
        // onClick={()=>onEdit(employee.id)}
        >
          <div>
            <MdEdit />
          </div>
        </span>
        <span className="delete">
          <div>
            <MdDelete />
          </div>
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
