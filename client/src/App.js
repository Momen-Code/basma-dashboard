import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Loader, Navbar } from "./components";
import { useAuthContext } from "./Providers";

import { AttendanceRecord, Employees, Login, Settings } from "./router";

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="app-container">
      <Loader />
      <Router>
        {isLoggedIn ? (
          <>
            <Navbar />
            <Switch>
              <Route
                exact
                path="/attendance-record"
                component={AttendanceRecord}
              />
              <Route exact path="/employees" component={Employees} />
              <Route exact path="/settings" component={Settings} />
              <Redirect to="/attendance-record" />
            </Switch>
          </>
        ) : (
          <Switch>
            <Route exact path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
