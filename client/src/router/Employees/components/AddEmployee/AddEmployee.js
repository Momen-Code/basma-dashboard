import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../../../../hooks";
import useEmployees from "../../hooks";
//Styles
import "./style.scss";

const AddEmployee = ({ visible, setVisible,onAdd }) => {
  const addBoxRef = useRef(null);
  const [employeeData, setEmployeeData] = useState({
    employeeId: "",
    password: "",
    name: "",
    department: "",
  });
  useOnClickOutside(addBoxRef, () => setVisible(false));
  const { addEmployee } = useEmployees();

  return (
    visible && (
      <div className="add-employee-container">
        <div className="box-details" ref={addBoxRef}>
          <div className="closing" onClick={() => setVisible(false)}>
            <span></span>
            <span></span>
          </div>
          <h4>اضافة موظف</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addEmployee({ ...employeeData });
              setVisible(false);
              onAdd();
            }}
          >
            <div className="name">
              <input
                type="text"
                placeholder="الاسم ثلاثي"
                value={employeeData.name}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, name: e.target.value })
                }
              />
            </div>
            <div className="password">
              <input
                type="password"
                placeholder="كلمة المرور"
                value={employeeData.password}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, password: e.target.value })
                }
              />
            </div>
            <div className="joNumber">
              <input
                type="text"
                placeholder="الرقم الوظيفي"
                value={employeeData.employeeId}
                onChange={(e) =>
                  setEmployeeData({
                    ...employeeData,
                    employeeId: e.target.value,
                  })
                }
              />
            </div>
            <div className="administration">
              <input
                type="text"
                placeholder="الإدارة"
                value={employeeData.department}
                onChange={(e) =>
                  setEmployeeData({
                    ...employeeData,
                    department: e.target.value,
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

export default AddEmployee;
