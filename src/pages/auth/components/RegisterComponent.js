import React  from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { isMobilePhone, isLength, isAlpha } from "validator";
import { mapStateToProps, mapDispatchToProps } from "../../../redux/store";
import api from "../../../services/api";
import pushNotify from "../../../utils/pushNotify";

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: {
        isValid: false,
        value: "",
        error: ""
      },
      fullName: {
        isValid: false,
        value: "",
        error: ""
      },
      password: {
        isValid: false,
        value: "",
        error: ""
      },
      rePassword: {
        isValid: false,
        value: "",
        error: ""
      }
    }
  }
  componentDidMount() {
    document.title = "Fogo - Register"
  }

  handleRegister = () => {
    const { phoneNumber, fullName, password, rePassword } = this.state;
    if(phoneNumber.isValid && fullName.isValid && password.isValid && rePassword.isValid) {
      const userData = {
        phoneNumber: this.state.phoneNumber.value,
        fullName: this.state.fullName.value,
        password: this.state.password.value
      };
      this.props.setLoading();
      api.post("/users/register", userData)
        .then((res) => {
          pushNotify({title: "Success", message: "Registered successful"});
          this.props.history.push("/auth/login");
          this.props.clearUi();
        }).catch(err => {
        pushNotify({title: "Error", message: err.messages, type: "danger"});
      });
    } else {
      pushNotify({title: "Lỗi", message: "Bạn vui lòng điền đầy đủ các trường", type: "danger"});
    }

  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: {
        ...this.state[e.target.id],
        value: e.target.value
      }
    });
  }
  validateInput = (e) => {
    const { value, id } = e.target;
    switch (id) {
      case "phoneNumber":
        isMobilePhone(value) ?
          this.setState({...this.state, phoneNumber: {...this.state.phoneNumber,isValid: true, error: ""}}) :
          this.setState({...this.state, phoneNumber: {...this.state.phoneNumber,isValid: false, error: "Số điện thoại không hợp lệ"}});
        break;
      case "fullName":
        isLength(value, {min: 2, max: 20}) && isAlpha(value.replace(/\s/g, "")) ?
          this.setState({...this.state, fullName: {...this.state.fullName, isValid: true, error: ""}}) :
          this.setState({...this.state, fullName: {...this.state.fullName, isValid: false, error: "Tên của bạn chỉ bao gồm kí tự không dấu"}});
        break;
      case "password":
        isLength(value, {min: 6}) ?
          this.setState({...this.state, password: {...this.state.password, isValid: true, error: ""}}) :
          this.setState({...this.state, password: {...this.state.password, isValid: false, error: "Mật khẩu phải lớn hơn 6 kí tự"}});
        break;
      case "rePassword":
        this.state.password.value === this.state.rePassword.value ?
          this.setState({...this.state, rePassword: {...this.state.rePassword, isValid: true, error: ""}}) :
          this.setState({...this.state, rePassword: {...this.state.rePassword, isValid: false, error: "Mật khẩu nhập lại sai"}});
        break;
      default:
    }
  }
  render() {
    const { phoneNumber, fullName, password, rePassword } = this.state;
    const { ui } = this.props;
    return  (
      <div className="col-12 col-md-5">
        <div className="container border-left text-center">
          <div className="h3 pl-2 text-left text-secondary">Đăng kí</div>
          <div className="login-form">
            <div className="form-group text-left" onKeyPress={e => {
              if(e.key === "Enter") this.handleRegister();
            }}>
              <label className="text-icon">Tên của bạn</label>
              <input type="text" id="fullName" className="form-control box-border-radius p-4"
                     placeholder="Tên đầy đủ" value={fullName.value}
                     onBlur={this.validateInput} onChange={this.handleChange}
              />
              <span className="help-block small text-danger">{fullName.error}</span>
            </div>
            <div className="form-group text-left">
              <label className="text-icon">Số điện thoại</label>
              <p className="text-danger text-left small">{}</p>
              <input type="text" id="phoneNumber" className="form-control box-border-radius p-4"
                     placeholder="Số điện thoại " value={phoneNumber.value}
                     onChange={this.handleChange} onBlur={this.validateInput}
              />
              <span className="help-block small text-danger">{phoneNumber.error}</span>
            </div>
            <div className="form-group text-left">
              <label className="text-icon">Mật khẩu</label>
              <input type="password" id="password"  className="form-control box-border-radius p-4"
                     placeholder="Mật khẩu" value={password.value}
                     onChange={this.handleChange} onBlur={this.validateInput}
              />
              <span className="help-block small text-danger">{password.error}</span>
            </div>
            {password.value &&
            <FadeIn>
              <div className="form-group text-left animated">
                <label className="text-icon">Nhập lại mật khẩu</label>
                <input type="password" id="rePassword"  className="form-control box-border-radius p-4"
                       placeholder="Xác nhận mật khẩu" value={rePassword.value}
                       onChange={this.handleChange} onBlur={this.validateInput}
                />
                <span className="help-block small text-danger">{rePassword.error}</span>
              </div>
            </FadeIn>
            }

            <div className="col-md-12 text-right">
              <button type="submit" className="btn btn-light box-border-radius text-icon"
                      onClick={this.handleRegister} >
                {ui.loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                Đăng kí
              </button>
            </div>
            <div className="form-group">
              <p className="text-secondary text-left small">
                Đã có tài khoản? <Link to="login" id="signup">Đăng nhập...</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
