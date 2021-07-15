import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

//Styles
import "./style.scss";

//Assets

const TableRow = ({
  index,
  _id,
  name,
  employeeId,
  department,
  createTime,
  onEdit,
  onDelete,
}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{employeeId}</td>
      <td>{department}</td>
      <td className="time">{createTime}</td>
      <td className="actions">
        <span className="edit" onClick={() => onEdit(_id)}>
          <div>
            <MdEdit />
          </div>
        </span>
        <span className="delete" onClick={() => onDelete(_id)}>
          <div>
            <MdDelete />
          </div>
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
