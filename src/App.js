import React from "react";
import {Route, Switch} from "react-router-dom"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-image-lightbox/style.css';
import "popper.js";
import "jquery";
import {Home} from "./pages";

class App extends React.Component {
  render() {
    return(<Switch>
      <Route path="/" component={Home} />
    </Switch>);
  }
}

export default App;
