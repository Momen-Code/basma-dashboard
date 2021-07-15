import React, { useContext, createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

const AppContext = createContext(null);
const AuthContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
export const useAuthContext = () => useContext(AuthContext);

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("access_token") ? true : false
  );
  const [userData, setUserData] = useState(
    Cookies.get("user_data") ? JSON.parse(Cookies.get("user_data")) : {}
  );
  const [isLoading, setIsLoading] = useState(false);

  const createNotification = (message = "", type = "error") => {
    switch (type) {
      case "info":
        NotificationManager.info(message);
        break;
      case "success":
        NotificationManager.success(message);
        break;
      case "warning":
        NotificationManager.warning(message);
        break;
      case "error":
        NotificationManager.error(message);
        break;
    }
  };

  useEffect(() => {
    if (!Cookies.get("access_token") || !Cookies.get("user_data")) {
      setIsLoggedIn(false);
    } else {
      setUserData(JSON.parse(Cookies.get("user_data")));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      Cookies.remove("access_token");
      Cookies.remove("user_data");
    } else {
      setUserData(
        Cookies.get("user_data") ? JSON.parse(Cookies.get("user_data")) : {}
      );
    }
  }, [isLoggedIn]);

  return (
    <AppContext.Provider
      value={{ createNotification, isLoading, setIsLoading, userData }}
    >
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <NotificationContainer />
        {children}
      </AuthContext.Provider>
    </AppContext.Provider>
  );
};
