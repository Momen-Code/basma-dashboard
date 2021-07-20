import axios from "axios";
import { useAppContext } from "../../../Providers";

const useSettings = () => {
  const { createNotification, setIsLoading } = useAppContext();

  const getSettings = async () => {
    setIsLoading(true);
    try {
      let response = await axios.post("/api/settings/get");

      let data = await response.data;

      if (!data.status) {
        createNotification(data.message, "error");
        return [];
      }
      return {
        ...data.data.settings,
        lng: data.data.settings.location.coordinates[0],
        lat: data.data.settings.location.coordinates[1],
      };
    } catch (e) {
      alert(e.message);
      return {};
    } finally {
      setIsLoading(false);
    }
  };
  const updateSettings = async ({
    lat,
    lng,
    allowedDistance,
    attendanceTime,
    allowedAttendanceTime,
    leavingTime,
    allowedLeavingTime,
  }) => {
    try {
      if (
        !lat ||
        !lng ||
        !allowedDistance ||
        !attendanceTime ||
        !attendanceTime ||
        !allowedAttendanceTime ||
        !leavingTime ||
        !allowedLeavingTime
      ) {
        return createNotification(
          "يجب التأكد من ملء جميع الاعدادات",
          "warning"
        );
      }

      let response = await axios.post("/api/settings/update", {
        lat,
        lng,
        allowedDistance,
        attendanceTime,
        allowedAttendanceTime,
        leavingTime,
        allowedLeavingTime,
      });

      let data = await response.data;

      console.log(data);

      if (!data.status) {
        createNotification(data.message, "error");
        return [];
      }

      createNotification(data.message, "success");

      return data.data;
    } catch (e) {
      alert(e.message);
    }
  };

  return { updateSettings, getSettings };
};

export default useSettings;
