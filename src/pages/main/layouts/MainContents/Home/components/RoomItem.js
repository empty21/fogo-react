import React, {useEffect, useState} from "react";
import {MDBCard, MDBCardBody, MDBCardFooter, MDBCardImage, MDBIcon, MDBView, MDBCardText} from "mdbreact";
import {connect} from "react-redux";
import {mapStateToProps} from "../../../../../../redux/store";
import Skeleton from "react-loading-skeleton";
import {doFollow} from "../../../../../../services/api";
import pushNotify from "../../../../../../utils/pushNotify";
import {Link} from "react-router-dom";

function RoomItem(props) {
  const {data, isLoading} = props;
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState(false);
  useEffect(() => {
    setFollowed(data?.isFollowed);
    setFollowers(data?.followers)
  }, [data]);
  const handleFollow = () => {
    doFollow(data?._id)
      .then(() => {
        if(followed) {
          pushNotify({title: "Thành công", message: "Đã huỷ quan tâm phòng"});
        } else {
          pushNotify({title: "Thành công", message: "Đã thêm phòng vào danh sách quan tâm"});
        }
        setFollowed(!followed);
        setFollowers(followed ? followers-1 : followers+1);
      }).catch(() => pushNotify({title: "Lỗi", message: "Không thể thêm phòng vào danh sách quan tâm", type: "danger"}))
  }

  return (
      <MDBCard narrow ecommerce className="hoverable" style={{width: "100%"}}>
        <MDBView hover zoom>
          {data && !isLoading ?
            <Link to={"/rooms/"+data._id}>
              <MDBCardImage
                cascade
                src={[data?.images?.[0]?.slice(0,47),"q_auto:low",data?.images?.[0]?.slice(48)].join("/")}
                className="room-card-img"
                top
              />
            </Link> :
            <Skeleton height={200} />
          }
        </MDBView>
        <MDBCardBody className="text-left" cascade>
          {data && !isLoading ?
            <Link to={"/rooms/"+data._id}>
              <MDBView waves>
                <h5>{data?.details?.name}</h5>
                <MDBCardText className="font-weight-normal">
                  <MDBIcon icon="house-user" className="text-secondary mr-2"/>
                  {
                    data?.details?.type === "Dormitory" ? "Kí túc xá":
                      data?.details?.type === "Apartment" ? "Căn hộ":
                        data?.details?.type === "Shared" ? "Phòng ở ghép" :
                          "Phòng cho thuê"
                  }
                  <br/>
                  <MDBIcon icon="ruler" className="text-secondary mr-2"/>
                  {data?.details?.area+" m²"}
                  <br/>
                  <MDBIcon icon="venus-mars" className="text-secondary mr-2"/>
                  {
                    data?.details?.gender === "male" ? "Nam":
                      data?.details?.gender === "female" ? "Nữ" : "Nam hoặc nữ"
                  }
                </MDBCardText>
              </MDBView>
            </Link> :
          <Skeleton count={4} />
          }
        </MDBCardBody>
        <MDBCardFooter>
          {data && !isLoading ?
            <div>
              <span className="float-left h5 my-0 text-primary">
                {data?.details?.price?.value+"tr/"+data?.details?.price?.unit}
              </span>
              <span className="float-right">
                <a href={"https://www.facebook.com/sharer/sharer.php?u=https://fogovietnam.me/rooms/"+data?._id}
                   rel="noopener noreferrer" target="_blank">
                  <MDBIcon icon="share-alt" className="ml-3"/>
                </a>
                {props.isAuthenticated &&
                <React.Fragment>
                  <MDBIcon icon="heart" className={followed ? "active ml-3" : "ml-3"} onClick={handleFollow}/>
                  <sub>{followers}</sub>
                </React.Fragment>
                }
              </span>
            </div> :
            <Skeleton/>
          }
        </MDBCardFooter>
    </MDBCard>

  );
}
export default connect(mapStateToProps)(RoomItem)