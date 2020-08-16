import React from "react";
import { connect } from "react-redux";
import "./AuthPage.scss";
import LoginComponent from "./components/LoginComponent";
import {Link, Switch, Route, Redirect} from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent";
import { logoutUser } from "../../redux/actions/authAction";


class AuthPage extends React.Component {

  render() {
    const { from } = this.props.location.state || {from: {pathname: '/'}}
    return (
      <div>
        {this.props.location.pathname === "/auth/logout" ?
          <div>{this.props.logoutUser()}<Redirect to={from.pathname}/></div> :
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
              <p className="text-secondary">@powered by Fogo</p>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated
  }
}
export default connect(mapStateToProps, { logoutUser })(AuthPage);