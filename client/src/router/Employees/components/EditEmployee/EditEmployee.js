import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../../../../hooks";
import useEmployees from "../../hooks";
//Styles
import "./style.scss";

const EditEmployee = ({
  visible,
  setVisible,
  setActiveEmployee,
  activeEmployee,
  onEdit,
}) => {
  const employeeBoxRef = useRef(null);
  useOnClickOutside(employeeBoxRef, () => setVisible(false));
  const { editEmployee } = useEmployees();
  return (
    visible && (
      <div className="edit-employee-container">
        <div className="box-details" ref={employeeBoxRef}>
          <div className="closing" onClick={() => setVisible(false)}>
            <span></span>
            <span></span>
          </div>
          <h4>تعديل الموظف {activeEmployee.employeeId}</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editEmployee({
                _id: activeEmployee._id,
                employeeId: activeEmployee.employeeId,
                name: activeEmployee.name,
                department: activeEmployee.department,
                password: activeEmployee.password,
              });
              setVisible(false);
              onEdit();
            }}
          >
            <div className="name">
              <input
                type="text"
                placeholder="الاسم ثلاثي"
                value={activeEmployee.name}
                onChange={(e) =>
                  setActiveEmployee({ ...activeEmployee, name: e.target.value })
                }
              />
            </div>
            <div className="administration">
              <input
                type="text"
                placeholder="الإدارة"
                value={activeEmployee.department}
                onChange={(e) =>
                  setActiveEmployee({
                    ...activeEmployee,
                    department: e.target.value,
                  })
                }
              />
            </div>
            <div className="password">
              <input
                type="password"
                placeholder="كلمة المرور"
                value={activeEmployee.password}
                onChange={(e) =>
                  setActiveEmployee({
                    ...activeEmployee,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div className="employee-id">
              <input
                type="text"
                placeholder="الرقم الوظيفي"
                value={activeEmployee.employeeId}
                onChange={(e) =>
                  setActiveEmployee({
                    ...activeEmployee,
                    employeeId: e.target.value,
                  })
                }
              />
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
