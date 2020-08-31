import { connect } from "react-redux";
import React from "react";
import { Route, Redirect } from "react-router";
import pushNotify from "./pushNotify";
import { mapStateToProps } from "../redux/store";

const AuthRoute = ({ component: Component, isAuthenticated, requiredRole = 0, userInfo,...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? userInfo.role >= requiredRole ?
      <Component {...props} />
      :
        <div>
          {pushNotify({title: "Lỗi truy cập", message: "Bạn không có quyền xem trang này", type: "danger"})}
          <Redirect to="/" />
        </div>
      :
        <div>
          {pushNotify({title: "Error", message: "Bạn cần đăng nhập để tiếp tục", type: "danger"})}
          <Redirect to="/auth/login" />
        </div>
    )} />
)


export default connect(mapStateToProps)(AuthRoute);