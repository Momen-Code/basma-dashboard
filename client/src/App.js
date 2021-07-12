import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import {Navbar} from './components';

import {AttendanceRecord, Employees, Login, Settings} from './router'


function App() {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <div>
            <Navbar />
          <Route exact path="/attendance-record" component={AttendanceRecord} />
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/settings" component={Settings} />

          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
