import React from "react";
import {Link} from "react-router-dom";
import {MDBCol, MDBIcon, MDBRow, MDBView} from "mdbreact";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../../../../redux/store";

function RoomCommonInfo(props) {
  const {data} = props;
  return (
    <MDBRow className="mb-5">
      <MDBCol size="12" className="mb-3">
        <span className="float-left"><Link to="/">← Về trang chủ</Link></span>
      </MDBCol>

      <MDBCol sm="6" lg="4">
        <MDBView hover zoom>
          <img src={data?.images?.[0]}
               alt="Room" className="room-card-img"/>
        </MDBView>
      </MDBCol>
      <MDBCol sm="6" lg="8" className="mt-3 mt-sm-0">
        <h2 className="h2-responsive text-muted">
          {data?.details?.name}
        </h2>
        <MDBRow>
          <MDBCol md="6" lg="8">
            <h5 className="h5-responsive">
              <MDBIcon icon="user-circle" className="mr-3 mt-3" />
              <span className="text-muted">
                {data?.owner?.name}
              </span>
              <br/>
              <MDBIcon icon="phone-alt" className="mr-3 mt-3" />
              <span className="text-muted">
                {props.isAuthenticated ?
                  data?.owner?.phoneNumber :
                  <React.Fragment>
                    Bạn cần <Link to="/auth/login">đăng nhập</Link> để xem SĐT
                  </React.Fragment>

                }
              </span>
              <br/>
              <MDBIcon icon="map-marker-alt" className="mr-3 mt-3" />
              <span className="text-muted">
                {data?.address?.street + ", " +
                data?.address?.ward?.text + ", " +
                data?.address?.district?.text + ", " +
                data?.address?.city?.text}
              </span>
              <br/>
            </h5>
          </MDBCol>
          <MDBCol md="6" lg="4" className="d-flex justify-content-center align-items-center">
            <h2 className="text-primary text-center">{data?.details?.price?.value?.toLocaleString("vi-VN")}
              {` tr/${data?.details?.price?.unit}`}</h2>
          </MDBCol>
        </MDBRow>
      </MDBCol>
    </MDBRow>
  );
}
export default connect(mapStateToProps)(RoomCommonInfo);