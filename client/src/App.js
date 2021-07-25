import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Loader, Navbar } from "./components";
import { useAuthContext } from "./Providers";

import { AttendanceRecord, Employees, Login, Settings } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, //5mins
    },
  },
});

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
