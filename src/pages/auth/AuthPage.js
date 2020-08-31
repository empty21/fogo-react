import React from "react";
import "./AuthPage.scss";
import {Link, Switch, Route, Redirect} from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import LogoutComponent from "./components/LogoutComponent";
import RegisterComponent from "./components/RegisterComponent";
import { Container, Row, Col } from "react-bootstrap";

function AuthPage() {
  return (
    <div>
      <Container className="pt-5">
        <div className="d-none d-md-block text-secondary text-left border-left pl-1">Ứng dụng tìm phòng trọ</div>
        <Row>
          <Col md={7} className="d-none d-md-block fogo-img">
            <img alt="" src={require("../../images/fogo-auth-banner.png")} className="img-fluid float-left"/>
          </Col>
          <Switch>
            <Route exact={true} component={LoginComponent} path="/auth/login" />
            <Route exact={true} component={RegisterComponent} path="/auth/register" />
            <Route exact={true} component={LogoutComponent} path="/auth/logout" />
            <Route path="*"><Redirect to="/404"/></Route>
          </Switch>
        </Row>
        <div>
          <Link to="#" className="text-left">Điều khoản sử dụng</Link>
          <p className="text-secondary" style={{opacity: 0.8}} >@powered by Fogo</p>
        </div>
      </Container>
    </div>
  )
}

export default AuthPage;
