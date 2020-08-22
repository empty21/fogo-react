import React from "react";
import { connect } from "react-redux";
import "./AuthPage.scss";
import LoginComponent from "./components/LoginComponent";
import {Link, Switch, Route, Redirect} from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent";
import store, { mapStateToProps } from "../../redux/store";
import pushNotify from "../../utils/pushNotify";
import { setUnauthenticated } from "../../redux/actions/authAction";

class AuthPage extends React.Component {
  handleLogout() {
    pushNotify({title: "Success", message: "Logged out"});
    localStorage.clear();
    store.dispatch(setUnauthenticated());
    this.props.history.push("/");
  }
  render() {
    const { from } = this.props.location.state || {from: {pathname: '/'}}
    return (
      <div>
        {this.props.location.pathname === "/auth/logout" ?
          this.handleLogout() :
          this.props.isAuthenticated ? <Redirect to={from.pathname}/> :
          <div className="container pt-5">
            <div className="d-none d-md-block text-secondary text-left border-left pl-1">Ứng dụng tìm phòng trọ</div>
            <div className="row">
              <div className="d-none d-md-block col-md-7 fogo-img">
                <img alt="" src={require("../../images/fogo-auth-banner.png")} className="img-fluid float-left"/>
              </div>
              <Switch>
                <Route exact={true} component={LoginComponent} path="/auth/login"/>
                <Route exact={true} component={RegisterComponent} path="/auth/register"/>
                <Route path="/"><Redirect to="/auth/login"/></Route>
              </Switch>
            </div>
            <div>
              <Link to="#" className="text-left">Điều khoản sử dụng</Link>
              <p className="text-secondary" style={{opacity: "80%"}} >@powered by Fogo</p>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(AuthPage);
