import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks";

//Styles
import "./style.scss";

const EditEmployee = ({ employeeNumber, visible, setVisible }) => {
  const employeeBoxRef = useRef(null);
  useOnClickOutside(employeeBoxRef, () => setVisible(false));

  return (
    visible && (
      <div className="edit-employee-container">
        <div className="box-details" ref={employeeBoxRef}>
          <div className="closing" onClick={() => setVisible(false)}>
            <span></span>
            <span></span>
          </div>
          <h4>تعديل الموظف {employeeNumber}</h4>
          <form>
            <div className="name">
              <input type="text" placeholder="الاسم ثلاثي" />
            </div>
            <div className="administration">
              <input type="text" placeholder="الإدارة" />
            </div>
            <div className="confirmation-button">
              <button type="submit">اضافة</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditEmployee;
