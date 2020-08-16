import React  from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { registerUser } from "../../../redux/actions/authAction";
import {isEmail, isLength, isAlphanumeric} from "validator";

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        isValid: false,
        value: "",
        error: ""
      },
      username: {
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

  handleRegister = () => {
    const { email, username, password } = this.state;
    this.props.registerUser({
      username: username.value,
      email: email.value,
      password: password.value
    }, this.props.history);
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
      case "email":
        isEmail(value) ?
          this.setState({...this.state, email: {...this.state.email,isValid: true, error: ""}}) :
          this.setState({...this.state, email: {...this.state.email,isValid: false, error: "Invalid email"}});
        break;
      case "username":
        isLength(value, {min: 3, max: 20}) && isAlphanumeric(value) ?
          this.setState({...this.state, username: {...this.state.username, isValid: true, error: ""}}) :
          this.setState({...this.state, username: {...this.state.username, isValid: false, error: "Username must contain only character and number, more than 3 and less than 20"}});
        break;
      case "password":
        isLength(value, {min: 6}) ?
          this.setState({...this.state, password: {...this.state.password, isValid: true, error: ""}}) :
          this.setState({...this.state, password: {...this.state.password, isValid: false, error: "Password must be more than 6"}});
        break;
      case "rePassword":
        this.state.password.value === this.state.rePassword.value ?
          this.setState({...this.state, rePassword: {...this.state.rePassword, isValid: true, error: ""}}) :
          this.setState({...this.state, rePassword: {...this.state.rePassword, isValid: false, error: "Password not match"}});
        break;
      default:
    }
  }
  render() {
    const { email, username, password, rePassword } = this.state;
    const { ui } = this.props;
    return  (
      <div className="col-12 col-md-5">
        <div className="container border-left text-center">
          <div className="h3 pl-2 text-left text-secondary">Register</div>
          <div className="login-form">
            <div className="form-group text-left">
              <label className="text-icon">Email</label>
              <p className="text-danger text-left small">{}</p>
              <input type="email" id="email" className="form-control box-border-radius p-4"
                     placeholder="example@email.com" value={email.value}
                     onChange={this.handleChange} onBlur={this.validateInput}
              />
              <span className="help-block small text-danger">{email.error}</span>
            </div>
            <div className="form-group text-left">
              <label className="text-icon">Username</label>
              <input type="text" id="username" className="form-control box-border-radius p-4"
                     placeholder="Enter your username" value={username.value}
                     onBlur={this.validateInput} onChange={this.handleChange}
              />
              <span className="help-block small text-danger">{username.error}</span>
            </div>
            <div className="form-group text-left">
              <label className="text-icon">Password</label>
              <input type="password" id="password"  className="form-control box-border-radius p-4"
                     placeholder="Enter Password" value={password.value}
                     onChange={this.handleChange} onBlur={this.validateInput}
              />
              <span className="help-block small text-danger">{password.error}</span>
            </div>
            {password.value &&
            <FadeIn>
              <div className="form-group text-left animated">
                <label className="text-icon">Confirm password</label>
                <input type="password" id="rePassword"  className="form-control box-border-radius p-4"
                       placeholder="Re-enter your password" value={rePassword.value}
                       onChange={this.handleChange} onBlur={this.validateInput}
                />
                <span className="help-block small text-danger">{rePassword.error}</span>
              </div>
            </FadeIn>
            }

            <div className="col-md-12 text-right">
              <button type="submit" className="btn btn-light box-border-radius text-icon"
                      disabled={!(email.isValid&&username.isValid&&password.isValid&&rePassword.isValid)}
                      onClick={this.handleRegister} >
                {ui.loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                Register
              </button>
            </div>
            <div className="form-group">
              <p className="text-secondary text-left small">
                Have an account? <Link to="login" id="signup">Sign in here</Link>
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
export default connect(mapStateToProps, { registerUser })(RegisterComponent);