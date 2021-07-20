import React, { useState, useEffect } from "react";
import { TableRow } from "./components";
import { EditEmployee, AddEmployee, DeleteEmployee } from "./components";
import { useInfiniteQuery } from "react-query";
import InfinitScroll from "react-infinite-scroll-component";
import PropagateLoader from "react-spinners/PropagateLoader";

import { GoPlusSmall } from "react-icons/go";

//Styles
import "./style.scss";

//hooks
import useEmployees from "./hooks";

const Employees = () => {
  const { getEmployees } = useEmployees();
  const [searchObject, setSearchObject] = useState({
    department: "",
    employeeId: "",
  });
  const [activeEmployee, setActiveEmployee] = useState({});
  const [visible, setVisible] = useState(false);
  const [boxType, setBoxType] = useState("");
  const { isLoading, isFetching, data, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery(
      "employees",
      ({ pageParam }) =>
        getEmployees({ ...searchObject, paginationToken: pageParam }),
      {
        getNextPageParam: (lastPage) =>
          lastPage.length < 5 ? false : lastPage[lastPage.length - 1]._id,
      }
    );

  const employees = data?.pages.reduce((acc, curr) => [...acc, ...curr]);

  return (
    <div className="employees-container">
      <h2>الموظفين</h2>
      <div
        className="add-employee-button"
        onClick={() => {
          setBoxType("add");
          setVisible(true);
        }}
      >
        <button>
          <div>إضافة موظف</div>
          <div>
            <GoPlusSmall />
          </div>
        </button>
      </div>
      <div className="selection">
        <div className="search-item">
          <div>
            <label>الإدارة</label>
          </div>
          <input
            type="text"
            placeholder="الإدارة"
            value={searchObject.department}
            onChange={(e) =>
              setSearchObject({ ...searchObject, department: e.target.value })
            }
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
      <div className="search-button" >
        <button onClick={() => refetch()}>بحث</button>
      </div>
      {isLoading || isFetching ? (
        <div className="loading-container">
          <PropagateLoader size={16} color="#8c7ae6" />
        </div>
      ) : (
        <InfinitScroll
          dataLength={5}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<PropagateLoader size={16} color="#8c7ae6" />}
          endMessage={
            employees.length != 0 ? (
              <div className="loading-container">انتهي الجدول</div>
            ) : (
              <div className="loading-container">لا يوجد موظفين</div>
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
                  <th>وقت الاضافة</th>
                  <th>الاجراء</th>
                </tr>
              </thead>
              <tbody>
                {employees.length != 0 &&
                  employees.map((item, index) => (
                    <TableRow
                      index={index}
                      {...item}
                      onEdit={(_id) => {
                        setActiveEmployee(
                          employees.find((item) => _id == item._id)
                        );
                        setBoxType("edit");
                        setVisible(true);
                      }}
                      onDelete={(_id) => {
                        setActiveEmployee(
                          employees.find((item) => _id == item._id)
                        );
                        setBoxType("delete");
                        setVisible(true);
                      }}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </InfinitScroll>
      )}

      {boxType == "delete" ? (
        <DeleteEmployee
          visible={visible}
          setVisible={setVisible}
          activeEmployee={activeEmployee}
          onDelete={refetch}
        />
      ) : boxType == "edit" ? (
        <EditEmployee
          visible={visible}
          setVisible={setVisible}
          setActiveEmployee={setActiveEmployee}
          activeEmployee={activeEmployee}
          onEdit={refetch}
        />
      ) : (
        <AddEmployee
          visible={visible}
          setVisible={setVisible}
          onAdd={refetch}
        />
      )}
    </div>
  );
};

export default Employees;
