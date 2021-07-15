import axios from "axios";
import { useAppContext } from "../../../Providers";

const useEmployees = () => {
  const { createNotification, setIsLoading } = useAppContext();

  const getEmployees = async ({ department = "", employeeId = "", paginationToken = "" }) => {
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
        createNotification(data.message, "error");
        return [];
      }

      // createNotification(data.message, "success");
      return data.data.employees;
    } catch (e) {
      alert(e.message);
    }
  };

  return { getEmployees };
};

export default useEmployees;
