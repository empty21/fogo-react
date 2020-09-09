import React from 'react';
import logo from "../../../assets/images/logo.svg";
import {MDBContainer, MDBFooter, MDBRow, MDBCol} from "mdbreact";

function Footer() {
  return(
    <MDBFooter className="bg-dark font-small pt-5" id="footer">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol className="text-center" md="4">
            <div className="h2">
              <img src={logo} width={70} alt="Fogo logo" />
              <span className="ml-3">FOGO</span>
            </div>
            <div>
              Ứng dụng tìm phòng trọ miễn phí!
            </div>
          </MDBCol>
          <MDBCol md="4">
            <h4>Contact us</h4>
            <p className="small">
              Hỗ trợ chăm sóc khách hàng: 091195195 - 0868967660 <br/>
              Thiết kế website: 0865510025 <br/>
              Bộ phận kĩ thuật website: 0836968705 - 0376486030 <br/>
              Văn phòng: 62/131 Trần Phú - Hà Đông - Hà Nội <br/>
            </p>
            <a href="https://fb.me/" rel="noopener noreferrer" target="_blank">
              <i className="fab fa-facebook text-white h2"/>
            </a>
          </MDBCol>
          <MDBCol md="4">
              <h4>Fogo Team</h4>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}
export default Footer;