import React from "react";
import { useForm } from "react-hook-form";
import {Button, Col, Container, Form, Spinner} from "react-bootstrap";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../../redux/store";
import {Link} from "react-router-dom";
import api from "../../../services/api";
import pushNotify from "../../../utils/pushNotify";

function LoginComponent(props) {
  const { register, handleSubmit } = useForm();
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
      <Col xs={12} md={5}>
        <Container className="border-left">
          <div className="h3 pl-2 text-left text-secondary">Đăng nhập</div>
          <Form onSubmit={handleSubmit(doLogin)} className="pl-3 pt-4" >
            <Form.Group>
              <Form.Label className="text-icon">Số điện thoại</Form.Label>
              <Form.Control name="phoneNumber" placeholder="09xxxx" className="rounded-pill p-4"
                            ref={register} required />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-icon">Mật khẩu</Form.Label>
              <Form.Control type="password" name="password" placeholder="Type password here" className="rounded-pill p-4"
                            ref={register} required />
            </Form.Group>
            <Form.Group className="clearfix">
              <Button type="submit" className="rounded-pill btn-light btn-outline-primary float-right">
                {props.ui.loading && <Spinner animation="border" size="sm" role="status" className="mr-1"/>}
                Đăng nhập
              </Button>
            </Form.Group>
            <Form.Group>
              <p className="text-secondary text-left small">
                Chưa có tài khoản ? <Link to="register"> Đăng kí ngay</Link>
              </p>
            </Form.Group>
          </Form>
        </Container>
      </Col>
    </React.Fragment>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)