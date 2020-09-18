import React from "react";
import { Route, Switch } from "react-router-dom"
import "./assets/css/mdb.min.css";
import "./app.css";
import "./assets/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-notifications-component/dist/theme.css";
import "./assets/scss/mdb-pro.scss";
import "react-image-lightbox/style.css";



import ReactNotification from "react-notifications-component";
import AuthPage from "./pages/auth/AuthPage";
import MainPage from "./pages/main/MainPage";
import NotFoundPage from "./pages/error/NotFoundPage";
import Preloader from "./pages/main/layouts/Preloader";

class App extends React.Component {
  render() {
    return(
      <React.Fragment>
        <ReactNotification />
        <Preloader />
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <Route exact path="/404" component={NotFoundPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default App;
