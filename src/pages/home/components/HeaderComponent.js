import React from 'react';
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";

export class HeaderComponent extends React.Component {
  render() {
    return(
      <header>
        <Nav className="navbar navbar-expand-md navbar-dark fixed-top bg-fogo pt-0 pb-0">
          <div className="container">
            <Link to='/' className="navbar-brand mb-0">
              <img alt="Brand" src="/img/logo.png" width="30px" height="30px" />
              <span className="navbar-brand mb-0 h1 text-white ml-1">FOGO</span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">About me</Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                {this.props.isAuthenticated ?
                  <li class="nav-item dropdown">
                    <Link class="nav-link dropdown-toggle" data-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">
                      {localStorage.getItem("username")}
                    </Link>
                    <div class="dropdown-menu">
                      <Link className="dropdown-item" to="#">Profile</Link>
                      <div className="dropdown-divider" />
                      <Link className="dropdown-item" to="/auth/logout">Log out</Link>
                    </div>
                  </li> :
                  <li className="nav-item">
                    <Link className="nav-link active" to="/auth">Login/Register</Link>
                  </li>
                }
              </ul>
            </div>
          </div>
        </Nav>
      </header>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    isAuthenticated: state.user.isAuthenticated
  }
}
export default connect(mapStateToProps)(HeaderComponent);