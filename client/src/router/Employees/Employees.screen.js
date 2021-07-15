import React, { useState, useEffect } from "react";
import { TableRow } from "./components";
import { EditEmployee, AddEmployee, DeleteEmployee } from "./components";
import { useInfiniteQuery } from "react-query";
import InfinitScroll from "react-infinite-scroll-component";
import PropagateLoader from "react-spinners/PropagateLoader";

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

  useEffect(() => {
    refetch();
  }, [searchObject]);
  const employees = data?.pages.reduce((acc, curr) => [...acc, ...curr]);

  return (
    <div className="attendance-record-container">
      <h2>الموظفين</h2>
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
            disabled={isLoading || isFetching}
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
            disabled={isLoading || isFetching}
          />
        </div>
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
                      onEdit={(_id) =>
                        setActiveEmployee(
                          employees.find((item) => item._id == _id)
                        )
                      }
                      onDelete={(_id) =>
                        setActiveEmployee(
                          data.pages.find((item) => item._id == _id)
                        )
                      }
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </InfinitScroll>
      )}
      {/* <EditEmployee
        visible={visible}
        setVisible={setVisible}
        employeeNumber={activeEmployee.employeeNumber}
      />
      <AddEmployee visible={visible} setVisible={setVisible} />
      <DeleteEmployee
        visible={visible}
        setVisible={setVisible}
        name={activeEmployee.employeeNumber}
      /> */}
    </div>
  );
};

export default Employees;
