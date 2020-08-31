import React from 'react';
import { Row, Col, Container } from "react-bootstrap";
import logo70 from "../../../images/logo-70.png";

function FooterComponent() {
  return(
    <React.Fragment>
      <Row className="mt-5 bg-dark text-white pt-5 pb-5" md={3}>
          <Col md={4} className="text-center">
            <Container fluid={true}>
              <div className="h2">
                <img src={logo70} alt="Fogo logo" />
                <span className="ml-3">FOGO</span>
              </div>
              <div>
                Ứng dụng tìm phòng trọ miễn phí!
              </div>
            </Container>
          </Col>
          <Col>
            <Container fluid={true}>
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
            </Container>
          </Col>
          <Col>
            <Container fluid={true}>
              <h4>Fogo Team</h4>
            </Container>
          </Col>
        </Row>
    </React.Fragment>
  );
}
export default FooterComponent;