import React from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../../redux/store";
import { Link } from "react-router-dom";
import { isMobilePhone, isLength } from "validator";
import api from "../../../services/api";
import pushNotify from "../../../utils/pushNotify";

const validVietnameseName = (name) => {
  const regex = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
  return regex.test(name);
}
function RegisterComponent(props) {
  const { register, handleSubmit, errors, getValues } = useForm();
  const doRegister = (data) => {
    props.setLoading();
    api.post("/users/register", data)
    .then(() => {
      pushNotify({title: "Đăng kí thành công", message: "Bạn được chuyển đến trang đăng nhập"});
      props.history.push("login");
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
          <div className="h3 pl-2 text-left text-secondary">Đăng kí</div>
          <Form onSubmit={handleSubmit(doRegister)} className="pl-3 pt-4" >
            <Form.Group>
              <Form.Label className="text-icon">Tên của bạn</Form.Label>
              <Form.Control name="fullName" className="rounded-pill p-4"
                            placeholder="Nguyễn Văn A"
                            ref={register({
                              validate: value => validVietnameseName(value)
                            })} required />
              {errors.fullName &&
              <Form.Text className="text-danger">* Tên không được bao gồm kí tự đặc biệt</Form.Text>
              }
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-icon">Số điện thoại</Form.Label>
              <Form.Control name="phoneNumber" className="rounded-pill p-4"
                            placeholder="09xxxxxx"
                            ref={register({
                              validate: value => isMobilePhone(value, "vi-VN")
                            })} required />
              {errors.phoneNumber &&
              <Form.Text className="text-danger">* Số điện thoại không hợp lệ</Form.Text>
              }
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-icon">Mật khẩu</Form.Label>
              <Form.Control type="password" name="password" className="rounded-pill p-4"
                            placeholder="******"
                            ref={register({
                              validate: value => isLength(value, { min: 6 })
                            })} required />
              {errors.password &&
              <Form.Text className="text-danger">* Mật khẩu phải có ít nhất 6 kí tự</Form.Text>
              }
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-icon">Nhập lại mật khẩu</Form.Label>
              <Form.Control type="password" name="rePassword" className="rounded-pill p-4"
                            placeholder="******"
                            ref={register({
                              validate: value => value === getValues().password
                            })} required />
              {errors.rePassword &&
              <Form.Text className="text-danger">* Mật khẩu nhập lại không đúng</Form.Text>
              }
            </Form.Group>
            <Form.Group className="clearfix">
              <Button type="submit" className="rounded-pill btn-light btn-outline-primary float-right">
                {props.ui.loading && <Spinner animation="border" size="sm" role="status" className="mr-1"/>}
                Đăng kí
              </Button>
            </Form.Group>
            <Form.Group>
              <p className="text-secondary text-left small">
                Đã có tài khoản? <Link to="login">Đăng nhập...</Link>
              </p>
            </Form.Group>
          </Form>
        </Container>
      </Col>
    </React.Fragment>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)