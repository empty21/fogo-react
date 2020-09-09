import React, {useEffect} from "react";
import {connect} from "react-redux";
import {mapDispatchToProps} from "../../../../redux/store";
import pushNotify from "../../../../utils/pushNotify";
import {Redirect} from "react-router";

function Logout(props) {
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
export default connect(null, mapDispatchToProps)(Logout);