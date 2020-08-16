import { connect } from "react-redux";
import React from "react";
import { Route, Redirect } from "react-router";
import pushNotify from "./pushNotify";

const AuthRoute = ({ component: Component, isAuthenticated, errMessage,...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <div>
          {pushNotify({title: "Error", message: errMessage, type: "danger"})}
          <Redirect to='/auth/login' />
        </div>
    )} />
)

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(AuthRoute);