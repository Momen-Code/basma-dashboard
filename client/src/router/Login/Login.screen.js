import React, { useState, useEffect } from "react";
// import useLogin from "./hooks";

//Styles
import "./style.scss";

//Assets
import { ReactComponent as Logo } from "../../assets/images/logo.svg";

const Login = () => {
  // const { login } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <div className="container">
        <div className="form-container">
          <div className="logo-container">
            <Logo />
          </div>
          <form >
            <div className="username-container">
              <input
                type="text"
                placeholder="اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="password-container">
              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="button-container">
              <button type="submit" >تسجيل الدخول</button>
            </div>
          </form>
        </div>
        <div className="background-container">
          <div className="layer">
            <h2>You're only as good as your last haircut</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
