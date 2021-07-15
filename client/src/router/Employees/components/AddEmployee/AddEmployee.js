import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../../../../hooks";

//Styles
import "./style.scss";

const AddEmployee = ({ visible, setVisible }) => {
  const addBoxRef = useRef(null);
  useOnClickOutside(addBoxRef, () => setVisible(false));

  return (
    visible && (
      <div className="add-employee-container">
        <div className="box-details" ref={addBoxRef}>
          <div className="closing" onClick={() => setVisible(false)}>
            <span></span>
            <span></span>
          </div>
          <h4>اضافة موظف</h4>
          <form>
            <div className="name">
              <input type="text" placeholder="الاسم ثلاثي" />
            </div>
            <div className="joNumber">
              <input type="text" placeholder="الرقم الوظيفيس" />
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

export default AddEmployee;
