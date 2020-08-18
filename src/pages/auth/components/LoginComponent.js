import React from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../../redux/actions/authAction";
import { connect } from "react-redux";
import {Spinner} from "react-bootstrap";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: ""
    }
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });
  }
  handleLogin = () => {
    const userData = this.state;
    this.props.loginUser(userData, this.props.history);
  }
  render() {
    const { ui } = this.props;
    const {phoneNumber, password} = this.state;
    return (
      <div className="col-12 col-md-5">
        <div className="container border-left text-center">
          <div className="h3 pl-2 text-left text-secondary">Đăng nhập</div>
          <div className="login-form"
               onKeyPress={e => e.key==="Enter" && !(phoneNumber&&password) && this.handleLogin()}>
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
              <button type="submit" disabled={!(phoneNumber&&password)}
                      className="btn btn-light box-border-radius text-icon"
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
const mapStateToProps = (state) => {
  return {
    user: state.user,
    ui: state.ui
  }
}
export default connect(mapStateToProps, {loginUser})(LoginComponent);