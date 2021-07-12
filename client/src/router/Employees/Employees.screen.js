import React, { useState, useEffect } from "react";
import { TableRow } from "./components";
import { EditEmployee, AddEmployee, DeleteEmployee } from "../../components";

//Styles
import "./style.scss";

//hooks
// import useStatistics from "./hooks";

const Employees = () => {
  // const { getData } = useStatistics();
  const [employeesData, setEmployeesData] = useState({});
  const [searchId, setSearchId] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  // useEffect(() => {
  //   (async () => {
  //     setStatisticsData(
  //       await getData({ day: dateSelected, employeeId: employeeSelected })
  //     );
  //   })();
  // }, [dateSelected, employeeSelected]);

  return (
    <div className="attendance-record-container">
      <h2>الموظفين</h2>
      <div className="selection">
        <div className="select-item">
          <div>
            <label>اختر الادارة</label>
          </div>
          <select
          // onChange={async (e) => {
          //   setEmployeeSelected(e.target.value);
          // }}
          >
            <option value="">الكل</option>
            {employeesData.employees &&
              employeesData.employees.map((employee, index) => (
                <option value={employee._id}>{employee.name}</option>
              ))}
          </select>
          <span></span>
        </div>
        <div className="search-item">
          <div>
            <label>ابحث برقم الموظف</label>
          </div>
          <input
            type="text"
            placeholder="#"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>الموظف</th>
              <th>الرقم الوظيفي</th>
              <th>الادارة</th>
              <th>وقت الاضافة</th>
              <th>الاجراء</th>
            </tr>
          </thead>
          <tbody>
            {/* {attendanceData.transactions &&
              attendanceData.transactions.map((item, index) => (
                <TableRow index={index} {...item} />
              ))} */}
            {[1, 2, 3, 4].map((item, index) => (
              <TableRow
                index={index}
                attendance="حضور"
                // onEdit={(id)=>setActiveUser(users.find((user) => user.id == id) )}
              />
            ))}
          </tbody>
        </table>
      </div>
      <EditEmployee
        visible={visible}
        setVisible={setVisible}
        employeeNumber={activeUser.employeeNumber}
      />
      <AddEmployee visible={visible} setVisible={setVisible} />
      <DeleteEmployee
        visible={visible}
        setVisible={setVisible}
        name={activeUser.employeeNumber}
      />
    </div>
  );
};

export default Employees;
