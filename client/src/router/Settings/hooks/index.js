import axios from "axios";
import { useAppContext } from "../../../Providers";

const useSettings = () => {
  const { createNotification, setIsLoading } = useAppContext();

  const getSettings = async () => {
    setIsLoading(true);
    try {
      let response = await axios.post("/api/settings/get");

      let data = await response.data;
      
      console.log(data.data.settings.location.coordinates);


      if (!data.status) {
        createNotification(data.message, "error");
        return {};
      }
      return data.data.settings.location.coordinates;
    } catch (e) {
      alert(e.message);
      return {};
    } finally {
      setIsLoading(false);
    }
  };
  const updateSettings = async ({ lat, lng }) => {
    try {
      setIsLoading(true);
      if (!lat) {
        return createNotification(
          "يجب التاكد من ارسال البيانات المطلوبة ",
          "warning"
        );
      }
      if (!lng) {
        return createNotification(
          "يجب التاكد من ارسال البيانات المطلوبة",
          "warning"
        );
      }

      let response = await axios.post("/api/settings/update", {
        lat,
        lng,
      });

      console.log(response);

      let data = await response.data;

      console.log(data.message);
      console.log(data.status);

      if (!data.status) {
        createNotification(data.message, "error");
        return [];
      }

      createNotification(data.message, "success");

      return data.data;
    } catch (e) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateSettings, getSettings };
};

export default useSettings;
