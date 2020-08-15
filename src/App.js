import React from "react";
import { Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.scss";
import "popper.js";
import "jquery";
import routes from "./routes";

class App extends React.Component {
  render() {
    return(
      <Switch>
        {
          routes.map(route =>
            <Route exact={route.exact} component={route.component} path={route.path} />
          )
        }
      </Switch>
    );
  }
}

export default App;
