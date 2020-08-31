import React, {useEffect} from "react";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "../../../redux/store";
import pushNotify from "../../../utils/pushNotify";
import {Redirect} from "react-router";

function LogoutComponent(props) {
  const handleLogout = () => {
    localStorage.clear();
    pushNotify({title: "Đăng xuất thành công", message: "Bạn được chuyển đến trang đăng nhập"});
    props.setUnauthenticated();
  }
  useEffect(() => {
    handleLogout();
  })
  return (
    <React.Fragment>
      <Redirect to="login" />
    </React.Fragment>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);