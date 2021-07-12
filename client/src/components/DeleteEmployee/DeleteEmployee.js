import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks";

//Styles
import "./style.scss";

const AddEmployee = ({ name, visible, setVisible }) => {
  const deleteBoxRef = useRef(null);
  useOnClickOutside(deleteBoxRef, () => setVisible(false));

  return (
    visible && (
      <div className="add-employee-container">
        <div className="box-details" ref={deleteBoxRef}>
          <div className="closing" onClick={() => setVisible(false)}>
            <span></span>
            <span></span>
          </div>
          <h3>حذف الموظف</h3>
          <h1>{name}</h1>
          <div className="action">
            <div class="confirm">
              <button type="submit">حذف</button>
            </div>
            <div class="cancel">
              <button type="submit">إلغاء</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddEmployee;
