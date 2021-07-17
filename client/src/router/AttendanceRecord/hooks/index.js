import axios from "axios";
import { useAppContext } from "../../../Providers";

const useAttendanceRecord = () => {
  const { createNotification, setIsLoading } = useAppContext();

  const getData = async ({ paginationToken = "", ...searchObject }) => {
    try {
<<<<<<< HEAD
      console.log(searchObject);
=======
>>>>>>> c1819e8f08e42eafa432110907ca0e62fa53d276
      let response = await axios.post("/api/history/get", {
        paginationToken,
        limit: 10,
        ...searchObject,
      });
      let data = await response.data;

<<<<<<< HEAD
      console.log(data);

=======
>>>>>>> c1819e8f08e42eafa432110907ca0e62fa53d276
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
