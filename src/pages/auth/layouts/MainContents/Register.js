import React from "react";
import { useForm,  } from "react-hook-form";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "../../../../redux/store";
import api from "../../../../services/api";
import pushNotify from "../../../../utils/pushNotify";
import { isMobilePhone } from "validator";
import {MDBProgress} from "mdbreact";
import {Helmet} from "react-helmet";

const validateVietnameseName = (name) => {
  const regex = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
  return regex.test(name);
}
function Register(props) {
  const {register, handleSubmit, errors, getValues} = useForm();

  const handleRegister = (data) => {
    props.setLoading();
    api.post("/users/register", data)
    .then(() => {
      pushNotify({title: "Đăng kí thành công", message: "Bạn được chuyển đến trang đăng nhập"});
      props.history.push("login");
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
          Đăng ký - Fogo Viet Nam
        </title>
      </Helmet>
      {props.loading && <MDBProgress material preloader />}
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="md-form">
          <i className="fas fa-user prefix"/>
          <input type="text" name="fullName" id="fullName"
                 className={"form-control "+ (errors.fullName ? "is-invalid" : "")}
                 ref={register({
                   validate: value => validateVietnameseName(value)
                 })}
          />
          <div className="invalid-feedback">Tên chỉ được bao gồm chữ cái, không được bỏ trống</div>
          <label htmlFor="fullName">Tên của bạn</label>
        </div>
        <div className="md-form">
          <i className="fas fa-phone-alt prefix"/>
          <input type="text" name="phoneNumber" id="phoneNumber"
                 className={"form-control "+ (errors.phoneNumber ? "is-invalid" : "")}
                 ref={register({
                   validate: value => isMobilePhone(value, "vi-VN")
                 })}
          />
          <div className="invalid-feedback">Số điện thoại không hợp lệ</div>
          <label htmlFor="phoneNumber">Số điện thoại</label>
        </div>
        <div className="md-form">
          <i className="fas fa-lock prefix"/>
          <input type="password" name="password" id="password"
                 className={"form-control "+ (errors.password ? "is-invalid" : "")}
                 ref={register({
                   minLength: 6
                 })}
          />
          <div className="invalid-feedback">Mật khẩu cần có ít nhất 6 kí tự</div>
          <label htmlFor="password">Mật khẩu</label>
        </div>
        <div className="md-form">
          <i className="fas fa-lock prefix"/>
          <input type="password" name="repeatPassword" id="repeatPassword"
                 className={"form-control "+ (errors.repeatPassword ? "is-invalid" : "")}
                 ref={register({
                   validate: value => value === getValues("password")
                 })}
          />
          <div className="invalid-feedback">Mật khẩu nhập lại không đúng</div>
          <label htmlFor="repeatPassword">Nhập lại mật khẩu</label>
        </div>
        <div className="text-center">
          <button className="btn btn-secondary btn-rounded waves-effect waves-light" disabled={props.loading}>
            Đăng ký
          </button>
        </div>
      </form>
      <hr/>
      <div className="text-right">Đã có tài khoản? <Link to="login">Đăng nhập</Link></div>
    </React.Fragment>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);