import React from "react";
import { Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-notifications-component/dist/theme.css";
import "./App.scss";
import "popper.js";
import "jquery";
import routes from "./routes";
import ReactNotification from "react-notifications-component";

class App extends React.Component {
  render() {
    return(
      <div>
        <ReactNotification />
        <Switch>
          {
            routes.map(route =>
              <Route exact={route.exact} component={route.component} path={route.path} />
            )
          }
        </Switch>
      </div>
    );
  }
}

export default App;
