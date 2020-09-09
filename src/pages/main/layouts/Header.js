import React, { useState} from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse,
  MDBNavLink, MDBFormInline,
  MDBNavbarNav, MDBNavItem, MDBDropdown, MDBDropdownToggle, MDBIcon, MDBDropdownMenu, MDBDropdownItem,
} from "mdbreact";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../redux/store";
import logo from "../../../assets/images/logo.svg";
import {withRouter} from "react-router";

function Header(props) {
  const [searchQuery, setSearchQuery] = useState(new URLSearchParams(props.location.search).get("q")||"");
  const [isOpen, setIsOpen] = useState(false);

  return(
    <React.Fragment>
      <MDBNavbar expand="md" fixed="top" dark scrolling style={{background: "rgb(242, 92, 5, 0.9)"}} >
        <MDBNavbarBrand href="/" className="m-0">
          <img alt="Brand" src={logo} width={32} height={32} />
          <span className="ml-2 mr-5">FOGO</span>
        </MDBNavbarBrand>
        <MDBNavbarToggler aria-controls="navbar"  onClick={() => {setIsOpen(!isOpen)}}/>
        <MDBCollapse id="navbarCollapse" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <div style={{position: "relative"}}>
                <MDBFormInline onSubmit={(e)=>{
                  e.preventDefault();
                  if(searchQuery !== new URLSearchParams(props.location.search).get("q")){
                    props.history.push("/search?q="+searchQuery);
                  }
                }}>
                  <div className="md-form my-0">
                    <input className="form-control mdb-autocomplete mr-sm-2 font-small" type="search" autoComplete="off"
                           id="search-box"
                           value={searchQuery}
                           onChange={e => setSearchQuery(e.target.value)}
                           placeholder="Tìm kiếm phòng..."
                    />
                  </div>
                  <button className="btn btn-outline-white btn-sm my-0" type="submit">Search</button>
                </MDBFormInline>
              </div>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/rooms/add"><MDBIcon icon="upload" /> Đăng phòng </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              {props.isAuthenticated ?
                <MDBDropdown className="nav-item">
                  <MDBDropdownToggle nav caret>
                    <span className="mr-2">
                      <MDBIcon icon="user" />{" "+props?.userInfo?.fullName+" "}
                    </span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem href="#">Trang cá nhân</MDBDropdownItem>
                    <MDBDropdownItem href="#">Phòng của tôi</MDBDropdownItem>
                    <MDBDropdownItem href="#">Phòng quan tâm</MDBDropdownItem>
                    <MDBDropdownItem href="/rooms/add">Đăng phòng</MDBDropdownItem>
                    <MDBDropdownItem href="/auth/logout">Đăng xuất</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown> :
                <MDBNavLink to="/auth/login">
                  Đăng nhập/Đăng kí
                </MDBNavLink>
              }
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </React.Fragment>
  );
}

export default withRouter(connect(mapStateToProps)(Header));
