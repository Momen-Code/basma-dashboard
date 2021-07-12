import React, { useState, useEffect } from "react";
import { TableRow } from "./components";
import { DatePicker } from "@y0c/react-datepicker";

//Styles
import "./style.scss";
import "@y0c/react-datepicker/assets/styles/calendar.scss";

//hooks
// import useStatistics from "./hooks";

const AttendanceRecord = () => {
  // const { getData } = useStatistics();
  const [attendanceData, setAttendanceData] = useState({});
  const [dateSelected, setDateSelected] = useState(formatDate(new Date()));
  const [employeeSelected, setEmployeeSelected] = useState("");
  const [searchId, setSearchId] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     setStatisticsData(
  //       await getData({ day: dateSelected, employeeId: employeeSelected })
  //     );
  //   })();
  // }, [dateSelected, employeeSelected]);

  return (
    <div className="attendance-record-container">
      <h2>سجل الحضور والانصراف</h2>
      <div className="selection">
        <div className="select-item">
          <div>
            <label>اختر موظف</label>
          </div>
          <select
            onChange={async (e) => {
              setEmployeeSelected(e.target.value);
            }}
          >
            <option value="">الكل</option>
            {attendanceData.employees &&
              attendanceData.employees.map((employee, index) => (
                <option value={employee._id}>{employee.name}</option>
              ))}
          </select>
          <span></span>
        </div>
        <div className="select-item">
          <div>
            <label>اختر موظف</label>
          </div>
          <select
            onChange={async (e) => {
              setEmployeeSelected(e.target.value);
            }}
          >
            <option value="">الكل</option>
            {attendanceData.employees &&
              attendanceData.employees.map((employee, index) => (
                <option value={employee._id}>{employee.name}</option>
              ))}
          </select>
          <span></span>
        </div>
        <div className="date-picker-container">
          <div>
            <label>اختر اليوم</label>
          </div>
          <DatePicker
            initialDate={new Date().getTime()}
            onChange={async (value) => {
              console.log(value);
              setDateSelected(formatDate(value));
            }}
            dateFormat="DD-MM-YYYY"
            value={dateSelected}
          />
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
              <th>التسجيل</th>
              <th>الوقت</th>
            </tr>
          </thead>
          <tbody>
            {/* {attendanceData.transactions &&
              attendanceData.transactions.map((item, index) => (
                <TableRow index={index} {...item} />
              ))} */}
              {[1,2,3,4].map((item, index)=>(
                  <TableRow index={index}  attendance="حضور"/>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const formatDate = (value) => {
  //Get the day string --> mm-dd-yyyy
  const date = new Date(Date.parse(value));
  return [
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
    date.getFullYear(),
  ].join("-");
};

export default AttendanceRecord;
