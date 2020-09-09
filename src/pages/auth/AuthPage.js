import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Login from "./layouts/MainContents/Login";
import {MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody} from "mdbreact";
import Register from "./layouts/MainContents/Register";
import Logout from "./layouts/MainContents/Logout";

function AuthPage(props) {
  return (
    <section id="content" className="view py-5" style={{minHeight: "100vh"}}>
      <MDBContainer className="h-100 d-flex justify-content-center align-items-center">
          <MDBRow style={{width: "100%"}}>
            <MDBCol md="12">
              <MDBCard style={{background: "rgba(255, 255, 255, 0.2)"}}>
                <MDBCardBody>
                  <h2 className="font-weight-bold my-4 text-center font-weight-bold">
                    <strong>
                      {props?.location?.pathname === "/auth/login" ? "Đăng nhập" : "Đăng ký"}
                    </strong>
                  </h2>
                  <hr/>
                  <MDBRow className="mt-5">
                    <MDBCol md="6" className="ml-lg-5 ml-md-3 d-none d-md-block">
                      <div className="row pb-4">
                        <div className="col-2 col-lg-1">
                          <i className="fas fa-university indigo-text fa-lg"/>
                        </div>
                        <div className="col-10">
                          <h4 className="font-weight-bold mb-4">
                            <strong>Safety</strong>
                          </h4>
                          <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores
                            nam, aperiam
                            minima assumenda deleniti hic.</p>
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol md="5">
                      <Switch>
                        <Route exact path="/auth/login" component={Login} />
                        <Route exact path="/auth/register" component={Register} />
                        <Route exact path="/auth/logout" component={Logout} />
                        <Route path="*"><Redirect to="/404" /></Route>
                      </Switch>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

            </MDBCol>

          </MDBRow>

        </MDBContainer>
    </section>
  )
}

export default AuthPage;
