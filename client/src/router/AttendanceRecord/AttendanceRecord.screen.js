import React, { useState, useEffect } from "react";
import { TableRow } from "./components";
import { DatePicker } from "@y0c/react-datepicker";
import { useInfiniteQuery } from "react-query";
import InfinitScroll from "react-infinite-scroll-component";
import PropagateLoader from "react-spinners/PropagateLoader";

//Styles
import "./style.scss";
import "@y0c/react-datepicker/assets/styles/calendar.scss";

//hooks
import useAttendanceRecord from "./hooks";

const AttendanceRecord = () => {
  const { getData } = useAttendanceRecord();
  const [searchObject, setSearchObject] = useState({
    _id: "",
    department: "",
    day: "",
    employeeId: "",
  });
  const [employees, setEmployees] = useState([]);

  const { isLoading, isFetching, data, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery(
      "history",
      ({ pageParam }) =>
        getData({ ...searchObject, paginationToken: pageParam }),
      {
        getNextPageParam: (lastPage) =>
          lastPage && lastPage.length < 10
            ? false
            : lastPage[lastPage.length - 1]._id,
      }
    );
  const history = data?.pages.reduce((acc, curr) => [...acc, ...curr]);

  useEffect(() => {
    if (history && employees.length == 0) {
      history.map((item) => {
        setEmployees([item.employee, ...employees]);
      });
      console.log(employees);
      var resArr = [];
      employees.forEach(function (item) {
        var i = resArr.findIndex((x) => x.name == item.name);
        console.log("item", item)
        if (i <= -1) {
          resArr.push({ id: item.id, name: item.name });
        }
      });
      console.log("resArr", resArr);
      setEmployees(resArr);
    }
  }, [history]);
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
              setSearchObject({ ...searchObject, _id: e.target.value });
            }}
          >
            <option value="">الكل</option>
            {employees &&
              employees.map((item, index) => (
                <option value={item._id}>{item.name}</option>
              ))}
          </select>
          <span></span>
        </div>
        <div className="search-item">
          <div>
            <label>اختر الادارة</label>
          </div>
          <input
            type="text"
            placeholder="اختر الادارة"
            value={searchObject.department}
            onChange={(e) =>
              setSearchObject({ ...searchObject, department: e.target.value })
            }
          />
        </div>
        <div className="date-picker-container">
          <div>
            <label>اختر اليوم</label>
          </div>
          <DatePicker
            initialDate={new Date().getTime()}
            onChange={async (value) => {
              console.log(value);
              setSearchObject({ ...searchObject, day: value });
            }}
            dateFormat="DD-MM-YYYY"
            value={searchObject.day}
          />
        </div>
        <div className="search-item">
          <div>
            <label>ابحث برقم الموظف</label>
          </div>
          <input
            type="text"
            placeholder="#"
            value={searchObject.employeeId}
            onChange={(e) =>
              setSearchObject({ ...searchObject, employeeId: e.target.value })
            }
          />
        </div>
      </div>
      <div className="search-button">
        <button onClick={() => refetch()}>بحث</button>
      </div>
      {isLoading || isFetching ? (
        <div className="loading-container">
          <PropagateLoader size={16} color="#8c7ae6" />
        </div>
      ) : (
        <InfinitScroll
          dataLength={history.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<PropagateLoader size={16} color="#8c7ae6" />}
          endMessage={
            history.length != 0 ? (
              <div className="loading-container">انتهي الجدول</div>
            ) : (
              <div className="loading-container">لا يوجد سجلات</div>
            )
          }
        >
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
                {history.length != 0 &&
                  history.map((item, index) => (
                    <TableRow index={index} {...item} />
                  ))}
              </tbody>
            </table>
          </div>
        </InfinitScroll>
      )}
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
