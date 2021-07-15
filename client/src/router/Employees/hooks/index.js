import axios from "axios";
import { useAppContext } from "../../../Providers";

const useEmployees = () => {
  const { createNotification, setIsLoading } = useAppContext();

  const getEmployees = async ({
    department = "",
    employeeId = "",
    paginationToken = "",
  }) => {
    try {
      let response = await axios.post("/api/employees/get", {
        department,
        employeeId,
        paginationToken,
        limit: 10,
      });
      let data = await response.data;

      console.log(data);

      if (!data.status) {
        // createNotification(data.message, "error");
        return [];
      }

      // createNotification(data.message, "success");
      return data.data.employees;
    } catch (e) {
      alert(e.message);
    }
  };

  const editEmployee = async ({
    _id,
    employeeId,
    password,
    name,
    department,
  }) => {
    setIsLoading(true);
    try {
      if (!_id) {
        return createNotification("خطأ في ارسال رقم الموظف", "warning");
      }
      if (!employeeId) {
        return createNotification("يجب ادخال رقم الموظف", "warning");
      }
      if (!password) {
        return createNotification("يجب ادخال كلمة المرور", "warning");
      }
      if (!name) {
        return createNotification("يجب ادخال اسم الموظف", "warning");
      }
      if (!department) {
        return createNotification("يجب ادخال اسم الادارة", "warning");
      }

      let response = await axios.post("/api/employees/edit", {
        _id,
        employeeId,
        password,
        name,
        department,
      });

      let data = await response.data;

      console.log(data);

      if (!data.status) {
        createNotification(data.message, "error");
        return {};
      }
      createNotification(data.message, "success");

      return data.data;
    } catch (e) {
      alert(e.message);
      return {};
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEmployee = async ({ _id }) => {
    setIsLoading(true);
    try {
      if (!_id) {
        return createNotification("خطأ في ارسال رقم الموظف", "warning");
      }

      let response = await axios.post("/api/employees/delete", {
        _id,
      });

      let data = await response.data;

      console.log(data);

      if (!data.status) {
        createNotification(data.message, "error");
        return {};
      }
      createNotification(data.message, "success");

      return data.data;
    } catch (e) {
      alert(e.message);
      return {};
    } finally {
      setIsLoading(false);
    }
  };

  const addEmployee = async ({ employeeId, password, name, department }) => {
    setIsLoading(true);
    try {
      if (!employeeId) {
        return createNotification("يجب ادخال الرقم الوظيفي", "warning");
      }
      if (!password) {
        return createNotification("يجب ادخال كلمة المرور ", "warning");
      }
      if (!name) {
        return createNotification("يجب ادخال اسم الموظف ", "warning");
      }
      if (!department) {
        return createNotification(
          "يجب ادخال الادارة التابع لها الموظف",
          "warning"
        );
      }

      let response = await axios.post("/api/employees/add", {
        employeeId,
        password,
        name,
        department,
      });

      console.log(response);

      let data = await response.data;

      console.log(data.message);
      console.log(data.status);

      if (!data.status) {
        createNotification(data.message, "error");
        return {};
      }
      createNotification(data.message, "success");

      return data.data;
    } catch (e) {
      alert(e.message);
      return {};
    } finally {
      setIsLoading(false);
    }
  };
  return { getEmployees, editEmployee, deleteEmployee, addEmployee };
};

export default useEmployees;
