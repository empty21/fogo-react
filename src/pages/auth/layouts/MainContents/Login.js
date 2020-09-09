import React from "react";
import { useForm,  } from "react-hook-form";
import {Link} from "react-router-dom";
import {MDBIcon, MDBProgress} from "mdbreact";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "../../../../redux/store";
import api from "../../../../services/api";
import pushNotify from "../../../../utils/pushNotify";
import {Helmet} from "react-helmet";

function Login(props) {
  const {register, handleSubmit, errors} = useForm();
  const handleLogin = (data) => {
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
      pushNotify({title: "Lỗi", message: err.messages, type: "danger"});
    }).finally(() => {
      props.clearUi();
    })
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>
          Đăng nhập - Fogo Viet Nam
        </title>
      </Helmet>
      {props.loading && <MDBProgress material preloader />}
      <form onSubmit={handleSubmit(handleLogin)} className="needs-validation">
        <div className="md-form md-outline">
          <MDBIcon icon="phone-alt" className="prefix"/>
          <input type="text" name="phoneNumber" id="phoneNumber"
                 className={"form-control "+ (errors.phoneNumber ? "is-invalid" : "")}
                 ref={register({
                   required: true
                 })}
          />
          <div className="invalid-feedback">Số điện thoại không được bỏ trống</div>
          <label htmlFor="phoneNumber">Số điện thoại</label>
        </div>
        <div className="md-form md-outline">
          <MDBIcon icon="lock" className="prefix"/>
          <input type="password" name="password" id="password"
                 className={"form-control "+ (errors.password ? "is-invalid" : "")}
                 ref={register({
                   required: true
                 })}
          />
          <div className="invalid-feedback">Mật khẩu không được bỏ trống</div>
          <label htmlFor="password">Mật khẩu</label>
        </div>


        <div className="font-small d-flex justify-content-end">
          <Link to="#!" className="ml-1">
            Quên mật khẩu?
          </Link>
        </div>
        <div className="text-center">
          <button className="btn btn-secondary btn-rounded waves-effect waves-light" disabled={props.loading}>
            Đăng nhập
          </button>
        </div>
      </form>
      <hr/>
      <div>
        <span className="float-left"><Link to="/">← Về trang chủ</Link></span>
        <span className="float-right"> Chưa có tài khoản? <Link to="register">Đăng kí</Link></span>
      </div>
    </React.Fragment>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);