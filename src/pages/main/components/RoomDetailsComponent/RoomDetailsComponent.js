import React, {useEffect, useState} from "react";
import { Breadcrumb, Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../../../services/api";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps} from "../../../../redux/store";
import pushNotify from "../../../../utils/pushNotify";

function RoomDetailsComponent(props) {
  const roomId = props.match.params.id;
  const { setLoading, clearUi, history } = props;
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [room, setRoom] = useState(null);
  const [isFollowed, setIsFollowed] = useState(null);
  const [followers, setFollowers] = useState(null);

  useEffect(() => {
    setLoading();
    document.title = "Fogo - Loading...";
    api.get(`/rooms/${roomId}`)
    .then(data => {
      setRoom(data);
    }).catch((err) => {
      pushNotify({title: "Lỗi", message: err.messages, type: "danger"});
      history.push("/404");
    }).finally(() => {
      clearUi();
    })
  }, [roomId, setLoading, clearUi, history]);
  useEffect(() => {
    if(room) {
      document.title = "Fogo - " + room.details.name;
      setFollowers(room.followers);
      setIsFollowed(room.isFollowed);
    }
  }, [room])
  const openLightBox = (e) => {
    const id = e.target.id.split("-")[1];
    setPhotoIndex(id);
    setLightBoxOpen(true);
  }
  const handleFollow = (e) => {
    e.preventDefault();
    api.post("/rooms/"+room._id+"/follow")
      .then(() => {
        if(isFollowed) {
          pushNotify({title: "Success", message: "Đã huỷ quan tâm phòng"});
        } else {
          pushNotify({title: "Success", message: "Đã thêm phòng vào danh sách quan tâm"});
        }
        setIsFollowed(!isFollowed);
        setFollowers(isFollowed ? followers-1 : followers+1);
      }).catch(e => {
      pushNotify({title: "Error", message: "Lỗi khi thêm phòng vào danh sách quan tâm", type: "danger"});
    });
  }
  return (
    <React.Fragment>
      <Container fluid={true}>
        {props.ui.loading && <Skeleton/>}
        {room &&
        <Breadcrumb className="pt-5">
          <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}} >Home</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{to: "#"}}>{room.address.district.text}</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{to: "#"}}>{room.address.ward.text}</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{to: "#"}}>
            {room.details.name}
            {room.disabled &&
              <span className="small"> (Phòng chưa được duyệt)</span>
            }
          </Breadcrumb.Item>
        </Breadcrumb>
        }

        <Row className="mt-3">
          <Col md={8}>
            <Card>
              <Card.Header>
                <span>
                  <i className="fas fa-edit text-fogo"/>
                  Thông tin phòng
                </span>
                {room &&
                  <span className={`float-right`}
                        onClick={handleFollow}>
                    <i className={`fas fa-eye mr-2 ${isFollowed ? "text-fogo" : "text-secondary"}`}/>
                    <sub>{followers}</sub>
                  </span>
                }
              </Card.Header>
              <Card.Body>
                {props.ui.loading && <Skeleton/>}
                {room &&
                <Row xs={2} md={4}>
                  <Col>
                    <div className="lead text-muted">Giá phòng</div>
                    {room.details.price.value.toLocaleString("en-US")}
                    {` tr/${room.details.price.unit}`}
                  </Col>
                  <Col>
                    <div className="lead text-muted">Diện tích</div>
                    {room.details.area} m²
                  </Col>
                  <Col>
                    <div className="lead text-muted">Đặt cọc</div>
                    {room.details.deposit}
                  </Col>
                  <Col>
                    <div className="lead text-muted">Sức chứa</div>
                    <span>{room.details?.capacity}
                    {" " + (room.details.gender === "any" ? "nam hoặc nữ" :
                      room.details.gender === "male" ? "nam" : "nữ")}</span>
                  </Col>
                  <Col>
                    <div className="lead text-muted">Điện</div>
                    {room.details.additionalFee.electric.value}
                    {" k/" + room.details.additionalFee.electric.unit}
                  </Col>
                  <Col>
                    <div className="lead text-muted">Nước</div>
                    {room.details.additionalFee.water.value}
                    {" k/" + room.details.additionalFee.water.unit}
                  </Col>
                  <Col>
                    <div className="lead text-muted">Phí khác</div>
                    {room.details.additionalFee.other || "Không có"}
                  </Col>
                  <Col>
                    <div className="lead text-muted">Trạng thái</div>
                    <div className="text-success">{room.status}</div>
                  </Col>
                  <Col xs={12} md={12}>
                    <div className="lead text-muted">Địa chỉ</div>
                    {room.address.houseNumber + " " +
                    room.address.street + ", " +
                    room.address.ward.text + ", " +
                    room.address.district.text + ", " +
                    room.address.city.text}
                  </Col>
                </Row>
                }
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <Card.Header>
                <span><i className="fas fa-star text-fogo"/> Tiện ích</span>
              </Card.Header>
              <Card.Body>
                {props.ui.loading && <Skeleton/>}
                {room &&
                  <Row md={4} xs={2}>
                    {room.utils?.airConditioner &&
                    <Col>
                      <i className="fas fa-fan text-icon lead mr-2"/>
                      <span className="text-muted">Điều hòa</span>
                    </Col>
                    }
                    {room.utils?.balcony &&
                    <Col>
                      <i className="fas fa-kaaba text-icon lead mr-2"/>
                      <span className="text-muted">Ban công</span>
                    </Col>
                    }
                    {room.utils?.closet &&
                    <Col>
                      <i className="fas fa-box text-icon lead mr-2"/>
                      <span className="text-muted">Tủ đồ</span>
                    </Col>
                    }
                    {room.utils?.bed &&
                    <Col>
                      <i className="fas fa-bed text-icon lead mr-2"/>
                      <span className="text-muted">Giường</span>
                    </Col>
                    }
                    {room.utils?.bathroom &&
                    <Col>
                      <i className="fas fa-shower text-icon lead mr-2"/>
                      <span className="text-muted">Phòng tắm</span>
                    </Col>
                    }
                    {room.utils?.cookingAllowed &&
                    <Col>
                      <i className="fas fa-utensils text-icon lead mr-2"/>
                      <span className="text-muted">Nấu ăn</span>
                    </Col>
                    }
                    {room.utils?.fridge &&
                    <Col>
                      <i className="fas fa-door-open text-icon lead mr-2"/>
                      <span className="text-muted">Tủ lạnh</span>
                    </Col>
                    }
                    {room.utils?.garret &&
                    <Col>
                      <i className="fas fa-warehouse text-icon lead mr-2"/>
                      <span className="text-muted">Gác xép</span>
                    </Col>
                    }
                    {room.utils?.parkingArea &&
                    <Col>
                      <i className="fas fa-bicycle text-icon lead mr-2"/>
                      <span className="text-muted">Gửi xe</span>
                    </Col>
                    }
                    {!room.utils?.liveWithOwner &&
                    <Col>
                      <i className="fas fa-key text-icon lead mr-2"/>
                      <span className="text-muted">Tự do</span>
                    </Col>
                    }
                    {room.utils?.petsAllowed &&
                    <Col>
                      <i className="fas fa-paw text-icon lead mr-2"/>
                      <span className="text-muted">Thú cưng</span>
                    </Col>
                    }
                    {room.utils?.television &&
                    <Col>
                      <i className="fas fa-tv text-icon lead mr-2"/>
                      <span className="text-muted">Tivi</span>
                    </Col>
                    }
                    {room.utils?.washingMachine &&
                    <Col>
                      <i className="fas fa-dumpster text-icon lead mr-2"/>
                      <span className="text-muted">Máy giặt</span>
                    </Col>
                    }
                    {room.utils?.waterHeater &&
                    <Col>
                      <i className="fas fa-dumpster-fire text-icon lead mr-2"/>
                      <span className="text-muted">Máy nóng lạnh</span>
                    </Col>
                    }
                    {room.utils?.wifi &&
                    <Col>
                      <i className="fas fa-wifi text-icon lead mr-2"/>
                      <span className="text-muted">Wifi</span>
                    </Col>
                    }
                    {room.utils?.window &&
                    <Col>
                      <i className="fas fa-columns text-icon lead mr-2"/>
                      <span className="text-muted">Cửa sổ</span>
                    </Col>
                    }
                  </Row>
                }
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <Card.Header>
                <span><i className="fas fa-info-circle text-fogo"/> Mô tả chi tiết</span>
              </Card.Header>
              <Card.Body>
                {props.ui.loading && <Skeleton />}
                {room &&
                  <p id="details-note">{room.details.note}</p>
                }
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="mt-3 mt-md-0">
              <Card.Header>
                <span><i className="fas fa-images text-fogo"/> Hình ảnh</span>
              </Card.Header>
              <Card.Body>
                {room&&<Row>
                  {room.images.map((url, i) =>
                    <Link key={i} to="#" title={"Image " + i}>
                      <img className="thumbnail p-1" alt="" id={"image-" + i}
                           src={url} onClick={openLightBox}/>
                    </Link>
                  )}
                </Row>}
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <Card.Header>
                <span><i className="fas fa-user text-fogo"/> Thông tin chủ phòng</span>
              </Card.Header>
              <Card.Body>
                {props.ui.loading && <Skeleton/>}
                {room &&
                  <Row>
                    <Col>
                      {props.isAuthenticated ?
                      <React.Fragment>
                        Chủ phòng: <br />
                        {room.owner.name}<br/>
                        SĐT: <br/>
                        {room.owner.phoneNumber}
                      </React.Fragment> :
                      <React.Fragment>
                        Bạn vui lòng <Link to="/auth">đăng nhập</Link> để xem thông tin chủ phòng
                      </React.Fragment>
                      }

                    </Col>
                    <div className="border-right my-1"/>
                    <Col>
                      Ngày đăng phòng: {new Date(room.createdAt).toLocaleDateString("vi-VN")}
                    </Col>
                  </Row>
                }
              </Card.Body>
            </Card>
            {props?.userInfo?.role > 0 &&
            <Card className="mt-3">
              <Card.Header>
                <span><i className="fas fa-cog text-fogo"/> Quản lý phòng</span>
              </Card.Header>
              <Card.Body>
                {props.ui.loading && <Skeleton/>}
              </Card.Body>
            </Card>
            }

          </Col>
        </Row>
      </Container>
      {
        lightBoxOpen &&
        <Lightbox
          mainSrc={room.images[photoIndex]}
          nextSrc={room.images[(photoIndex + 1) % room.images.length]}
          prevSrc={room.images[(photoIndex + room.images.length - 1) % room.images.length]}
          onCloseRequest={() => setLightBoxOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + room.images.length - 1) % room.images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + room.images.length + 1) % room.images.length)}
          enableZoom={false}
        />
      }
    </React.Fragment>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomDetailsComponent);