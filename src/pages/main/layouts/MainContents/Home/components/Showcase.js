import React from "react";
import showcaseImg from "../../../../../../assets/images/showcase-image.png"
import {MDBRow, MDBCol, MDBBtn} from "mdbreact";
function Showcase() {
  return (
    <section id="showcase" className="mask clearfix pt-5 mt-5 d-flex justify-content-center align-items-center">
      <MDBRow>
        <MDBCol md="6" xl="7" className="mt-xl-5 mb-5 fadeInLeft">
          <div id="showcase-slogan" className="text-primary">
            <h1>FOGO</h1>
            <h5>Giải pháp tìm phòng trọ tiện lợi nhất</h5>
            <hr className="hr-primary"/>
            <h6 className="mb-4"></h6>
          </div>
          <div className="smooth-scroll">
            <MDBBtn color="primary" href="#unshared-room" className="btn-outline-primary waves-ripple">Phòng cho thuê</MDBBtn>
            <MDBBtn color="primary" href="#shared-room" className="btn-outline-primary waves-ripple">Phòng ở ghép</MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md="6" xl="5" className="fadeInRight">
          <img src={showcaseImg} className="img-fluid" alt="Showcase"/>
        </MDBCol>

        <MDBCol xs="12" md="6" className="offset-md-3 mt-3">
          <h2 className="text-center ">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook text-primary" />
            </a>
          </h2>
          <hr className="hr-primary" />
        </MDBCol>
      </MDBRow>
    </section>
  );
}
export default Showcase;
