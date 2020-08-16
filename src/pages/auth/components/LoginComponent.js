import React from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../../redux/actions/authAction";
import { connect } from "react-redux";
import {Spinner} from "react-bootstrap";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });
  }
  onKeyUp
  handleLogin = () => {
    const userData = this.state;
    this.props.loginUser(userData);
  }
  render() {
    const { ui } = this.props;
    const {username, password} = this.state;
    return (
      <div className="col-12 col-md-5">
        <div className="container border-left text-center">
          <div className="h3 pl-2 text-left text-secondary">Sign in</div>
          <button className="btn btn-light btn-google text-left box-border-radius p-2 mt-3">
            <img alt="Google Login" src="https://img.icons8.com/color/48/000000/google-logo.png"/>
            Sign in with Google
          </button>
          <div className="col-md-12 ">
            <div className="login-or mt-4 mb-2 pt-2 pb-2">
              <hr className="mt-0 mb-0" />
              <span className="span-or">or</span>
            </div>
          </div>
          <div className="login-form"
               onKeyPress={e => e.key==="Enter" && !(username&&password) && this.handleLogin()}>
            <div className="form-group text-left">
              <label className="text-icon">Username or Email address</label>
              <input type="text" id="username" className="form-control box-border-radius p-4"
                     placeholder="example@email.com" value={username}
                     onChange={this.handleChange}
              />
            </div>
            <div className="form-group text-left">
              <label className="text-icon">Password</label>
              <input type="password" id="password" className="form-control box-border-radius p-4"
                     placeholder="Enter password..." value={password}
                     onChange={this.handleChange}
              />
            </div>
            <div className="col-md-12 text-right">
              <button type="submit" disabled={!(username&&password)}
                      className="btn btn-light box-border-radius text-icon"
                      onClick={this.handleLogin}>
                {ui.loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                Sign in
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
    ui: state.ui
  }
}
export default connect(mapStateToProps, {loginUser})(LoginComponent);