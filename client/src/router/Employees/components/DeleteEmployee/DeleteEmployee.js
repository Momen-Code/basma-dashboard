import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../../../../hooks";
import useEmployees from "../../hooks";

//Styles
import "./style.scss";

const AddEmployee = ({ visible, setVisible, activeEmployee, onDelete }) => {
  const deleteBoxRef = useRef(null);
  useOnClickOutside(deleteBoxRef, () => setVisible(false));
  const { deleteEmployee } = useEmployees();
  return (
    visible && (
      <div className="add-employee-container">
        <div className="box-details" ref={deleteBoxRef}>
          <div className="closing" onClick={() => setVisible(false)}>
            <span></span>
            <span></span>
          </div>
          <h3>حذف الموظف</h3>
          <h1>{activeEmployee.name}</h1>
          <div className="action">
            <div className="confirm">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(activeEmployee._id);
                  deleteEmployee({ _id: activeEmployee._id });
                  setVisible(false);
                  onDelete();
                }}
              >
                حذف
              </button>
            </div>
            <div className="cancel">
              <button type="button" onClick={() => setVisible(false)}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddEmployee;
