import React from "react";
import { Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-notifications-component/dist/theme.css";
import "./App.scss";
import "jquery";
import "popper.js";
import ReactNotification from "react-notifications-component";
import AuthRoute from "./utils/authRoute";
import AuthPage from "./pages/auth/AuthPage";
import AdminPage from "./pages/admin/AdminPage";
import MainPage from "./pages/main/MainPage";
import NotFoundPage from "./pages/error/NotFoundPage";

class App extends React.Component {
  render() {
    return(
      <React.Fragment>
        <ReactNotification />
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <AuthRoute path="/admin" requiredRole={1} component={AdminPage} />
          <Route exact path="/404" component={NotFoundPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default App;
