import React from 'react';
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../redux/store";
import logo30 from "../../../images/logo-30.png";

function HeaderComponent(props) {
  return(
    <React.Fragment>
      <Navbar expand="md" fixed="top" variant="dark" className="bg-fogo pt-1 pb-1">
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-white m-0">
            <img alt="Brand" src={logo30} />
            <span className="ml-2 mr-5">FOGO</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" >
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/" active={window.location.pathname === "/"}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" active={window.location.pathname === "/about"}>About me</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              {props.isAuthenticated ?
                <NavDropdown id="me" title={props?.userInfo?.fullName}>
                  <NavDropdown.Item as={Link} to="#">Trang cá nhân</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#">Phòng của tôi</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#">Phòng quan tâm</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/rooms/add">Đăng phòng</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/auth/logout">Đăng xuất</NavDropdown.Item>
                </NavDropdown> :
                <Nav.Link as={Link} to="/auth/login">
                  Đăng nhập/Đăng kí
                </Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(HeaderComponent);
