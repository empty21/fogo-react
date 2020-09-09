import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import {MDBBtn, MDBCol, MDBContainer} from "mdbreact";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../../redux/store";
import {Link} from "react-router-dom";
import api from "../../../services/api";
import pushNotify from "../../../utils/pushNotify";

function LoginComponent(props) {
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    document.title = "Fogo - Đăng nhập";
  }, [])
  const doLogin = (data) => {
    props.setLoading();
    api.post("/users/login", data)
    .then(async data => {
      localStorage.setItem("r_token", data.refreshToken);
      localStorage.setItem("c_token", data.accessToken);
      const user = await api.get("/users/me");
      localStorage.setItem("userInfo", JSON.stringify(user));
      pushNotify({title: "Đăng nhập thành công", message: "Bạn được chuyển đến trang chủ"})
      props.history.push("/");
      props.setAuthenticated();
    }).catch(err => {
      pushNotify({title: "Error", message: err.messages, type: "danger"});
    }).finally(() => {
      props.clearUi();
    })
  }
  return (
    <React.Fragment>
      <MDBCol xs={12} md={5}>
        <MDBContainer className="border-left">
          <div className="h3 pl-2 text-left text-secondary">Đăng nhập</div>
          <form onSubmit={handleSubmit(doLogin)} className="pl-3 pt-4" >

          </form>
        </MDBContainer>
      </MDBCol>
    </React.Fragment>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)