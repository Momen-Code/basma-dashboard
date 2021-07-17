import axios from "axios";
import { useAppContext } from "../../../Providers";

const useAttendanceRecord = () => {
  const { createNotification, setIsLoading } = useAppContext();

  const getData = async ({ paginationToken = "", ...searchObject }) => {
    try {
      console.log(searchObject);
      let response = await axios.post("/api/history/get", {
        paginationToken,
        limit: 10,
        ...searchObject,
      });
      let data = await response.data;

      console.log(data);

      if (!data.status) {
        createNotification(data.message, "error");
        return [];
      }

      createNotification(data.message, "success");

      return data.data.history;
    } catch (e) {
      alert(e.message);
      return [];
    }
  };

  return { getData };
};

export default useAttendanceRecord;
