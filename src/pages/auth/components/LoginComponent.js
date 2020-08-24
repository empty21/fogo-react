import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {Spinner} from "react-bootstrap";
import { mapStateToProps, mapDispatchToProps } from "../../../redux/store";
import api from "../../../services/api";
import pushNotify from "../../../utils/pushNotify";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: ""
    }
  }
  handleChange = (e) => {
    const {id, value} = e.target;
    this.setState({
      ...this.state,
      [id]: value
    });
  }
  handleLogin = () => {
    if(this.state.phoneNumber && this.state.password){
      const userData = this.state;
      this.props.setLoading();
      api.post("/users/login", userData)
        .then(async data => {
          localStorage.setItem("r_token", data.refreshToken);
          localStorage.setItem("c_token", data.accessToken);
          const user = await api.get("/users/me");
          localStorage.setItem("userInfo", JSON.stringify(user));
          pushNotify({title: "Success", message: "Logged successful"})
          this.props.setAuthenticated();
          this.props.clearUi();
        }).catch(err => {
        console.log(err);
        pushNotify({title: "Error", message: err.messages, type: "danger"});
        this.props.clearUi();
      });
    } else {
      pushNotify({title: "Lỗi", message: "Bạn vui lòng điền đầy đủ các trường", type: "danger"});
    }

  }
  render() {
    const { ui } = this.props;
    const { phoneNumber, password } = this.state;
    return (
      <div className="col-12 col-md-5">
        <div className="container border-left text-center">
          <div className="h3 pl-2 text-left text-secondary">Đăng nhập</div>
          <div className="login-form" onKeyPress={e => {
                 if(e.key === "Enter") this.handleLogin();
               }}>
            <div className="form-group text-left">
              <label className="text-icon">Số điện thoại</label>
              <input type="text" id="phoneNumber" className="form-control box-border-radius p-4"
                     placeholder="Enter your phone number" value={phoneNumber}
                     onChange={this.handleChange}
              />
            </div>
            <div className="form-group text-left">
              <label className="text-icon">Mật khẩu</label>
              <input type="password" id="password" className="form-control box-border-radius p-4"
                     placeholder="Enter password..." value={password}
                     onChange={this.handleChange}
              />
            </div>
            <div className="col-md-12 text-right">
              <button type="submit" className="btn btn-light box-border-radius text-icon"
                      onClick={this.handleLogin}>
                {ui.loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                Đăng nhập
              </button>
            </div>
            <div className="form-group">
              <p className="text-secondary text-left small">
                Don't have account? <Link to="register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);