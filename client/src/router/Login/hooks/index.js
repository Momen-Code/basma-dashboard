import axios from "axios";
import { useAppContext, useAuthContext } from "../../../Providers";

const useLogin = () => {
  const { createNotification, setIsLoading } = useAppContext();
  const { setIsLoggedIn } = useAuthContext();

  const login = async ({ username, password }) => {
    try {
      setIsLoading(true);
      if (!username) {
        return createNotification("يجب كتابة اسم المستخدم ", "warning");
      }
      if (!password) {
        return createNotification("يجب كتابة كلمة المرور", "warning");
      }

      let response = await axios.post("/api/auth/login", {
        username,
        password,
        type: "admin",
      });

      let data = await response.data;

      console.log(data);
      if (!data.status) {
        createNotification(data.message, "error");
        return;
      }

      setIsLoggedIn(true);

      createNotification(data.message, "success");

      return;
    } catch (e) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login };
};

export default useLogin;
