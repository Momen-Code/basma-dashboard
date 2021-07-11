import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import {Navbar} from './components';

import {AttendanceRecord, Login} from './router'


function App() {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <div>
            <Navbar />
          <Route exact path="/attendance-record" component={AttendanceRecord} />

          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
